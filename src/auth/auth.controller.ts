import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { LoginDto } from "../user/dto/login.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register/user")
  @ApiOperation({ summary: "Register user (USER/MANAGER)" })
  @ApiResponse({ status: 201, description: "User registered" })
  async registerUser(@Body() dto: CreateUserDto) {
    return this.authService.registerUser(dto);
  }

  @Post("register/admin")
  @ApiOperation({ summary: "Register admin" })
  @ApiResponse({ status: 201, description: "Admin registered" })
  async registerAdmin(@Body() dto: CreateAdminDto) {
    return this.authService.registerAdmin(dto);
  }

  @Post("login/user")
  @ApiOperation({ summary: "User/Manager login" })
  async loginUser(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginUser(dto.phone, dto.password, res);
  }

  @Post("logout")
  @ApiOperation({ summary: "Logout user/admin" })
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Post("refresh-token")
  @ApiOperation({ summary: "Refresh token" })
  async refresh(@Res({ passthrough: true }) res: Response) {
    const token = res.req.cookies?.refresh_token;
    return this.authService.refreshToken(token, res);
  }
}
