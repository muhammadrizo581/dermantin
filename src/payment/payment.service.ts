import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Repository } from "typeorm";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>
  ) {}

  findAll() {
    return this.paymentRepo.find();
  }

  findOne(id: number) {
    return this.paymentRepo.findOne({ where: { id } });
  }

  async create(data: CreatePaymentDto) {
    const payment = this.paymentRepo.create({
      amount: data.amount,
      method: data.method,
      status: data.status,
      order: { id: data.orderId },
      user: { id: data.userId },
    });
    return this.paymentRepo.save(payment);
  }

  async update(id: number, data: Partial<CreatePaymentDto>) {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment)
      throw new NotFoundException(`Payment with ID ${id} not found`);
    Object.assign(payment, {
      ...data,
      order: data.orderId ? { id: data.orderId } : payment.order,
      user: data.userId ? { id: data.userId } : payment.user,
    });
    return this.paymentRepo.save(payment);
  }

  async remove(id: number) {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment)
      throw new NotFoundException(`Payment with ID ${id} not found`);
    return this.paymentRepo.remove(payment);
  }
}
