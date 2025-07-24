import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Payment } from "./entities/payment.entity";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@ApiTags("Payments")
@Controller("payments")
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Get()
  @ApiOperation({ summary: "Get all payments" })
  @ApiResponse({ status: 200, type: [Payment] })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get payment by ID" })
  @ApiResponse({ status: 200, type: Payment })
  findOne(@Param("id") id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Create new payment" })
  @ApiResponse({ status: 201, type: Payment })
  create(@Body() body: CreatePaymentDto) {
    return this.service.create(body);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update payment" })
  @ApiResponse({ status: 200, type: Payment })
  update(@Param("id") id: number, @Body() body: Partial<CreatePaymentDto>) {
    return this.service.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete payment" })
  @ApiResponse({ status: 200 })
  remove(@Param("id") id: number) {
    return this.service.remove(id);
  }
}
