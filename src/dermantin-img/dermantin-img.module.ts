import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DermantinImage } from "./entities/dermantin-img.entity";
import { DermantinImageService } from "./dermantin-img.service";
import { DermantinImageResolver } from "./dermatine-img.resolver";
import { DermantinImageController } from "./dermantin-img.controller";

@Module({
  imports: [TypeOrmModule.forFeature([DermantinImage])],
  providers: [DermantinImageService, DermantinImageResolver],
  controllers: [DermantinImageController],
})
export class DermantinImageModule {}
