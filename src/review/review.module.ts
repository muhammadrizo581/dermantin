import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";
import { ReviewResolver } from "./review.resolver";
import { Review } from "./entities/review.entity";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";
import { User } from "src/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Review, Dermantin, User])],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewResolver],
})
export class ReviewModule {}
