import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { LoginDto } from "../user/dto/login.dto";
import { Response } from "express";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async registerUser(@Args("dto") dto: CreateUserDto): Promise<string> {
    const user = await this.authService.registerUser(dto);
    return `User ${user.fullname} registered`;
  }

  @Mutation(() => String)
  async registerAdmin(@Args("dto") dto: CreateAdminDto): Promise<string> {
    const admin = await this.authService.registerAdmin(dto);
    return `Admin ${admin.full_name} registered`;
  }

  @Mutation(() => String)
  async loginUser(@Args("dto") dto: LoginDto, @Context("res") res: Response) {
    const result = await this.authService.loginUser(
      dto.phone,
      dto.password,
      res
    );
    return result.access_token;
  }

  @Mutation(() => String)
  async loginAdmin(@Args("dto") dto: LoginDto, @Context("res") res: Response) {
    const result = await this.authService.loginAdmin(
      dto.phone,
      dto.password,
      res
    );
    return result.access_token;
  }

  @Mutation(() => String)
  async refreshToken(@Context("res") res: Response): Promise<string> {
    const token = res.req.cookies["refresh_token"];
    const result = await this.authService.refreshToken(token, res);
    return result.access_token;
  }

  @Mutation(() => String)
  async logout(@Context("res") res: Response): Promise<string> {
    await this.authService.logout(res);
    return "Logged out";
  }
}
