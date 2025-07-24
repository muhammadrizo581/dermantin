import { ObjectType, Field, Float, Int } from "@nestjs/graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";
import { User } from "src/user/entities/user.entity";
import { Store } from "../../store/entities/store.entity";

@ObjectType()
@Entity("reviews")
export class Review {
  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 4.5 })
  @Field(() => Float)
  @Column({ type: "float" })
  ranking: number;

  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @Column()
  dermantinId: number;

  @ApiProperty({ example: 3 })
  @Field(() => Int)
  @Column()
  userId: number;

  @ManyToOne(() => Dermantin, (dermantin) => dermantin.reviews, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "dermantinId" })
  @Field(() => Dermantin)
  dermantin: Dermantin;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  @Field(() => User)
  user: User;

  @OneToMany(() => Store, (store) => store.rating)
  stores: Store[];
}
