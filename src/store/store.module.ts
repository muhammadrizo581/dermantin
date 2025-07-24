import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreService } from "./store.service";
import { StoreController } from "./store.controller";
import { StoreResolver } from "./store.resolver";
import { Store } from "./entities/store.entity";
import { User } from "src/user/entities/user.entity";
import { Review } from "src/review/entities/review.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Store, User, Review])],
  controllers: [StoreController],
  providers: [StoreService, StoreResolver],
})
export class StoreModule {}
