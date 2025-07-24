import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { OrderService } from "./order.service";
import { Order } from "./entities/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(
    @Args("createOrderDto") createOrderDto: CreateOrderDto
  ): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Query(() => [Order], { name: "getAllOrders" })
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: "getOrder" })
  findOne(@Args("id", { type: () => Int }) id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateOrderDto") updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Mutation(() => Boolean)
  deleteOrder(@Args("id", { type: () => Int }) id: number): Promise<boolean> {
    return this.orderService.remove(id).then(() => true);
  }
}
