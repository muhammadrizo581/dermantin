import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Review } from "src/review/entities/review.entity";
import { Social } from "../../socials/entities/social.entity";
import { Order } from "../../order/entities/order.entity";

export enum Region {
  TASHKENT = "TASHKENT",
  SAMARKAND = "SAMARKAND",
  BUKHARA = "BUKHARA",
  FERGANA = "FERGANA",
}

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

registerEnumType(Region, { name: "Region" });
registerEnumType(Status, { name: "Status" });

@ObjectType()
@Entity("stores")
export class Store {
  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "My Store" })
  @Field()
  @Column({ length: 255 })
  name: string;

  @ApiProperty({ example: "https://example.com/logo.png" })
  @Field()
  @Column({ type: "text" })
  logoUrl: string;

  @ApiProperty({ enum: Region })
  @Field(() => Region)
  @Column({ type: "enum", enum: Region })
  region: Region;

  @ApiProperty({ example: "Best electronics in town" })
  @Field()
  @Column({ length: 255 })
  description: string;

  @ApiProperty({ enum: Status })
  @Field(() => Status)
  @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
  status: Status;

  @ApiProperty({ example: 3 })
  @Field(() => Int)
  @Column()
  managerId: number;

  @ApiProperty({ example: 2 })
  @Field(() => Int)
  @Column()
  ratingId: number;

  @ManyToOne(() => User, (user) => user.stores, { onDelete: "SET NULL" })
  @JoinColumn({ name: "managerId" })
  @Field(() => User)
  manager: User;

  @ManyToOne(() => Review, (review) => review.stores, { onDelete: "SET NULL" })
  @JoinColumn({ name: "ratingId" })
  @Field(() => Review)
  rating: Review;

  @OneToMany(() => Social, (social) => social.store)
  socials: Social[];

  @OneToMany(() => Order, (order) => order.store)
  orders: Order[];
}
