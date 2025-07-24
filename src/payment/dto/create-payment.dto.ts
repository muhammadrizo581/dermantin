import { InputType, Field, Float, Int } from "@nestjs/graphql";
import { PaymentMethod, PaymentStatus } from "../entities/payment.entity";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class CreatePaymentDto {
  @Field(() => Float)
  @ApiProperty()
  amount: number;

  @Field(() => PaymentMethod)
  @ApiProperty({ enum: PaymentMethod })
  method: PaymentMethod;

  @Field(() => PaymentStatus)
  @ApiProperty({ enum: PaymentStatus })
  status: PaymentStatus;

  @Field(() => Int)
  @ApiProperty()
  orderId: number;

  @Field(() => Int)
  @ApiProperty()
  userId: number;
}
