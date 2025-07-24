import {
  ObjectType,
  Field,
  Float,
  ID,
  registerEnumType,
} from "@nestjs/graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Advertisement } from "../../adverstmen/entities/adverstman.entity";
import { Review } from "../../review/entities/review.entity";
import { Order } from "../../order/entities/order.entity";

export enum DermantinClass {
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
  LUX = "LUX",
}
registerEnumType(DermantinClass, {
  name: "DermantinClass",
});

@ObjectType()
@Entity()
export class Dermantin {
  @Field(() => ID)
  @ApiProperty({ example: 1, description: "Unikal dermantin ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ApiProperty({ example: "Black Lux", description: "Dermantin nomi" })
  @Column()
  name: string;

  @Field(() => Float)
  @ApiProperty()
  @Column("decimal")
  price: number;

  @Field(() => Float)
  @ApiProperty({ example: 95000, description: "Narxi (so‘m)" })
  @Column("float")
  rating: number;

  @Field(() => DermantinClass)
  @ApiProperty({ enum: DermantinClass })
  @Column({ type: "enum", enum: DermantinClass })
  class: DermantinClass;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.dermantins)
  category: Category;

  @ApiProperty({
    example: 3,
    description: "Tegishli category ID (foreign key)",
  })
  @Column()
  categoryId: number;

  @ApiProperty({ example: 1, description: "Store ID (bog‘lanmagan hozircha)" })
  @Column()
  store_id: number;

  @OneToMany(() => Advertisement, (ad) => ad.dermantin)
  @Field(() => [Advertisement], { nullable: true })
  advertisements?: Advertisement[];

  @OneToMany(() => Review, (review) => review.dermantin)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.dermantin)
  orders: Order[];
}
