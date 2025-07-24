import { PartialType } from "@nestjs/swagger";
import { CreatePaymentDto } from "./create-payment.dto";
import { InputType, Field, Int, Float } from "@nestjs/graphql";
import { PaymentMethod, PaymentStatus } from "../entities/payment.entity";

@InputType()
export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @Field(() => Int)
  id: number;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field(() => PaymentMethod, { nullable: true })
  method?: PaymentMethod;

  @Field(() => PaymentStatus, { nullable: true })
  status?: PaymentStatus;

  @Field(() => Int, { nullable: true })
  orderId?: number;

  @Field(() => Int, { nullable: true })
  userId?: number;
}
