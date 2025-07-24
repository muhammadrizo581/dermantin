import { InputType, Field, Int, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";

@InputType()
export class CreateOrderDto {
  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  storeId: number;

  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  dermantinId: number;

  @ApiProperty({ example: 100.0 })
  @Field(() => Float)
  @IsNumber()
  @Min(0)
  totalPrice: number;

  @ApiProperty({ example: 50.0 })
  @Field(() => Float)
  @IsNumber()
  @Min(0)
  remainingPrice: number;
}
