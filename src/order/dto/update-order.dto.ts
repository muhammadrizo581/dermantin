import { InputType, Field, Int, Float, PartialType } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNumber, Min, IsOptional } from "class-validator";
import { CreateOrderDto } from "./create-order.dto";

@InputType()
export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiPropertyOptional({ example: 150.0 })
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalPrice?: number;

  @ApiPropertyOptional({ example: 30.0 })
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  remainingPrice?: number;
}
