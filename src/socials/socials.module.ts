import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SocialService } from "./socials.service";
import { SocialController } from "./socials.controller";
import { SocialResolver } from "./socials.resolver";
import { Social } from "./entities/social.entity";
import { Store } from "src/store/entities/store.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Social, Store])],
  controllers: [SocialController],
  providers: [SocialService, SocialResolver],
})
export class SocialModule {}
