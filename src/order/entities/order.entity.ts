import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Store } from "src/store/entities/store.entity";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";
import { Payment } from "../../payment/entities/payment.entity";

@ObjectType()
@Entity("orders")
export class Order {
  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @Column()
  userId: number;

  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @Column()
  storeId: number;

  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @Column()
  dermantinId: number;

  @ApiProperty({ example: 100.0 })
  @Field(() => Float)
  @Column({ type: "decimal" })
  totalPrice: number;

  @ApiProperty({ example: 50.0 })
  @Field(() => Float)
  @Column({ type: "decimal" })
  remainingPrice: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  @Field(() => User)
  user: User;

  @ManyToOne(() => Store, (store) => store.orders, { onDelete: "CASCADE" })
  @JoinColumn({ name: "storeId" })
  @Field(() => Store)
  store: Store;

  @ManyToOne(() => Dermantin, (dermantin) => dermantin.orders, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "dermantinId" })
  @Field(() => Dermantin)
  dermantin: Dermantin;

  @OneToMany(() => Payment, (payment) => payment.order)
  @Field(() => [Payment], { nullable: true })
  payments: Payment[];
}
