import { Module } from "@nestjs/common";
import { AdvertisementService } from "./adverstmen.service";
import { AdvertisementResolver } from "./adverstmen.resolver";
import { AdvertisementController } from "./adverstmen.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Advertisement } from "./entities/adverstman.entity";
import { Dermantin } from "../dermantin/entities/dermantin.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement, Dermantin])],
  providers: [AdvertisementService, AdvertisementResolver],
  controllers: [AdvertisementController],
})
export class AdvertisementModule {}
