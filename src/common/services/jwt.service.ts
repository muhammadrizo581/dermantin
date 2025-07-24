import * as jwt from "jsonwebtoken";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  sign(payload: any, isAdmin: boolean): string {
    const secret = isAdmin
      ? this.configService.get<string>("ACCESS_TOKEN_KEY")
      : this.configService.get<string>("ACCESS_TOKEN_KEY_USER");

    const expiresIn = isAdmin
      ? this.configService.get<string>("ACCESS_TOKEN_TIME")
      : this.configService.get<string>("ACCESS_TOKEN_TIME_USER");

    return jwt.sign(payload, secret!, { expiresIn });
  }

  verify(token: string, isAdmin: boolean): any {
    const secret = isAdmin
      ? this.configService.get<string>("ACCESS_TOKEN_KEY")
      : this.configService.get<string>("ACCESS_TOKEN_KEY_USER");

    return jwt.verify(token, secret!);
  }

  signRefresh(payload: any, isAdmin: boolean): string {
    const secret = isAdmin
      ? this.configService.get<string>("REFRESH_TOKEN_KEY")
      : this.configService.get<string>("REFRESH_TOKEN_KEY_USER");

    const expiresIn = isAdmin
      ? this.configService.get<string>("REFRESH_TOKEN_TIME")
      : this.configService.get<string>("REFRESH_TOKEN_TIME_USER");

    return jwt.sign(payload, secret!, { expiresIn });
  }

  verifyRefresh(token: string, isAdmin: boolean): any {
    const secret = isAdmin
      ? this.configService.get<string>("REFRESH_TOKEN_KEY")
      : this.configService.get<string>("REFRESH_TOKEN_KEY_USER");

    return jwt.verify(token, secret!);
  }
}
