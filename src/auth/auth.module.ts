import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { AuthController } from "./auth.controller";
import { Admin } from "../admin/entities/admin.entity";
import { User } from "../user/entities/user.entity";
import { JwtService } from "../common/services/jwt.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([User, Admin]), ConfigModule],
  providers: [AuthService, AuthResolver, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
