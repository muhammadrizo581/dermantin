import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { User } from "../user/entities/user.entity";
import { Order } from "../order/entities/order.entity";

import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { PaymentResolver } from "./payment.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, Order])],
  providers: [PaymentService, PaymentResolver],
  controllers: [PaymentController],
})
export class PaymentModule {}
