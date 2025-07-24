import {
  ObjectType,
  Field,
  Float,
  Int,
  registerEnumType,
} from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Order } from "../../order/entities/order.entity";
import { User } from "../../user/entities/user.entity";

export enum PaymentMethod {
  CARD = "CARD",
  CASH = "CASH",
  TRANSFER = "TRANSFER",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

registerEnumType(PaymentMethod, { name: "PaymentMethod" });
registerEnumType(PaymentStatus, { name: "PaymentStatus" });

@ObjectType()
@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  @ApiProperty()
  id: number;

  @Column("decimal")
  @Field(() => Float)
  @ApiProperty()
  amount: number;

  @Column({ type: "enum", enum: PaymentMethod })
  @Field(() => PaymentMethod)
  @ApiProperty({ enum: PaymentMethod })
  method: PaymentMethod;

  @Column({ type: "enum", enum: PaymentStatus })
  @Field(() => PaymentStatus)
  @ApiProperty({ enum: PaymentStatus })
  status: PaymentStatus;

  @ManyToOne(() => Order, (order) => order.payments, { eager: true })
  @Field(() => Order)
  order: Order;

  @ManyToOne(() => User, (user) => user.payments, { eager: true })
  @Field(() => User)
  user: User;
}
