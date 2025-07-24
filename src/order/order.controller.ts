import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { Order } from "./entities/order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@ApiTags("Orders")
@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: "Create a new order" })
  @ApiResponse({ status: 201, type: Order })
  create(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({ status: 200, type: [Order] })
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get order by ID" })
  @ApiResponse({ status: 200, type: Order })
  findOne(@Param("id") id: string): Promise<Order> {
    return this.orderService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update order by ID" })
  @ApiResponse({ status: 200, type: Order })
  update(@Param("id") id: string, @Body() dto: UpdateOrderDto): Promise<Order> {
    return this.orderService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete order by ID" })
  @ApiResponse({ status: 200, description: "Order deleted" })
  remove(@Param("id") id: string): Promise<void> {
    return this.orderService.remove(+id);
  }
}
