import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { Repository } from "typeorm";
import { JwtService } from "../common/services/jwt.service";
import { Admin } from "../admin/entities/admin.entity";
import { User } from "../user/entities/user.entity";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async registerUser(dto: CreateUserDto) {
    const exist = await this.userRepo.findOneBy({ phone: dto.phone });
    if (exist) throw new ForbiddenException("User already exists");

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashed });
    return this.userRepo.save(user);
  }

  async registerAdmin(dto: CreateAdminDto) {
    const exist = await this.adminRepo.findOneBy({ email: dto.email });
    if (exist) throw new ForbiddenException("Admin already exists");

    const hashed = await bcrypt.hash(dto.password, 10);
    const admin = this.adminRepo.create({ ...dto, password: hashed });
    return this.adminRepo.save(admin);
  }

  async loginUser(phone: string, password: string, res: Response) {
    const user = await this.userRepo.findOne({
      where: { phone },
      select: ["id", "fullname", "password", "phone", "role"],
    });
    if (!user) throw new UnauthorizedException("Foydalanuvchi topilmadi");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException("Parol noto'g'ri");

    const access_token = this.jwtService.sign(
      { sub: user.id, role: user.role },
      false
    );
    const refresh_token = this.jwtService.signRefresh(
      { sub: user.id, role: user.role },
      false
    );

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return { access_token, user };
  }

  async loginAdmin(identifier: string, password: string, res: Response) {
    const admin = await this.adminRepo.findOne({
      where: { email: identifier },
      select: ["id", "email", "password", "full_name"],
    });
    if (!admin) throw new UnauthorizedException("Admin not found");

    const match = await bcrypt.compare(password, admin.password);
    if (!match) throw new UnauthorizedException("Incorrect password");

    const access_token = this.jwtService.sign(
      { sub: admin.id, isAdmin: true },
      true
    );
    const refresh_token = this.jwtService.signRefresh(
      { sub: admin.id, isAdmin: true },
      true
    );

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return { access_token, admin };
  }

  async refreshToken(token: string, res: Response) {
    if (!token) throw new UnauthorizedException("No token provided");

    try {
      const payload = this.jwtService.verifyRefresh(token, false);

      const isAdmin = payload?.isAdmin === true;

      const newAccess = this.jwtService.sign(
        { sub: payload.sub, isAdmin },
        isAdmin
      );
      const newRefresh = this.jwtService.signRefresh(
        { sub: payload.sub, isAdmin },
        isAdmin
      );

      res.cookie("refresh_token", newRefresh, {
        httpOnly: true,
        sameSite: "strict",
      });

      return { access_token: newAccess };
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }

  async logout(res: Response) {
    res.clearCookie("refresh_token");
    return { message: "Logged out" };
  }
}
