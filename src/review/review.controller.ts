import { Controller, Post, Body, Get, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { Review } from "./entities/review.entity";

@ApiTags("Reviews")
@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: "Create a new review" })
  @ApiResponse({ status: 201, description: "Review created", type: Review })
  create(@Body() dto: CreateReviewDto): Promise<Review> {
    return this.reviewService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all reviews" })
  @ApiResponse({ status: 200, type: [Review] })
  findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single review by ID" })
  @ApiResponse({ status: 200, type: Review })
  findOne(@Param("id") id: string): Promise<Review> {
    return this.reviewService.findOne(+id);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a review by ID" })
  @ApiResponse({ status: 200, description: "Review deleted" })
  remove(@Param("id") id: string): Promise<void> {
    return this.reviewService.remove(+id);
  }
}
