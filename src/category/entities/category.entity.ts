import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";

@ObjectType()
@Entity()
export class Category {
  @Field(() => ID)
  @ApiProperty({ example: 1, description: "Category ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @ApiProperty({
    example: "Ko'ja",
    description: "Category nomi",
  })
  @Column()
  name: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "koja.png",
    description: "Category logosi agar bo'lsa",
  })
  @Column({ nullable: true })
  logo: string;

  @Field(() => [Dermantin], { nullable: true })
  @OneToMany(() => Dermantin, (dermantin) => dermantin.category)
  dermantins: Dermantin[];
}
