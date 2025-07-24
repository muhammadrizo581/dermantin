import { InputType, Field, Float, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, Min, Max } from "class-validator";

@InputType()
export class CreateReviewDto {
  @ApiProperty({ example: 4.7 })
  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @Max(5)
  ranking: number;

  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @IsInt()
  dermantinId: number;

  @ApiProperty({ example: 3 })
  @Field(() => Int)
  @IsInt()
  userId: number;
}
