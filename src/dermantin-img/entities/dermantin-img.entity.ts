import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity("dermantin_image")
export class DermantinImage {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Field()
  @Column()
  @ApiProperty()
  dermantin_id: number;

  @Field()
  @Column("text")
  @ApiProperty()
  image_url: string;

  @Field()
  @Column({ default: false })
  @ApiProperty()
  is_main: boolean;
}
