import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { PaymentService } from "./payment.service";
import { Payment } from "./entities/payment.entity";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly service: PaymentService) {}

  @Query(() => [Payment])
  payments() {
    return this.service.findAll();
  }

  @Query(() => Payment)
  payment(@Args("id", { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Payment)
  createPayment(@Args("data") data: CreatePaymentDto) {
    return this.service.create(data);
  }

  @Mutation(() => Payment)
  updatePayment(
    @Args("id") id: string,
    @Args("updatePayment") updateDto: UpdatePaymentDto
  ) {
    return this.service.update(+id, updateDto); 
  }

  @Mutation(() => Payment)
  removePayment(@Args("id", { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
