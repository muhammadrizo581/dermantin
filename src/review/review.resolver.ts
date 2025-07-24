import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ReviewService } from "./review.service";
import { Review } from "./entities/review.entity";
import { CreateReviewDto } from "./dto/create-review.dto";

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review)
  createReview(
    @Args("createReviewDto") createReviewDto: CreateReviewDto
  ): Promise<Review> {
    return this.reviewService.create(createReviewDto);
  }

  @Query(() => [Review], { name: "getAllReviews" })
  findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Query(() => Review, { name: "getReview" })
  findOne(@Args("id", { type: () => Int }) id: number): Promise<Review> {
    return this.reviewService.findOne(id);
  }
}
