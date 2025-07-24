import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DermantinService } from "./dermantin.service";
import { DermantinResolver } from "./dermantin.resolver";
import { Dermantin } from "./entities/dermantin.entity";
import { Category } from "../category/entities/category.entity";
import { DermantinController } from "./dermantin.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Dermantin, Category])],
  controllers: [DermantinController],
  providers: [DermantinService, DermantinResolver],
})
export class DermantinModule {}
