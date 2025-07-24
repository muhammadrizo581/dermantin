import { ObjectType, Field, ID } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("admin")
export class Admin {
  @ApiProperty({ example: 1, description: "Unikal ID" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali Valiyev", description: "To‘liq ism" })
  @Field()
  @Column()
  full_name: string;

  @ApiProperty({ example: "ali@mail.com", description: "Email manzili" })
  @Field()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqam" })
  @Field()
  @Column({ unique: true })
  phone: string;

  @ApiProperty({
    example: "hashed_password",
    description: "Parol (hashlangan)",
  })
  @Field()
  @Column()
  password: string;

  @ApiProperty({ example: true, description: "Admin aktivmi" })
  @Field()
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: "Admin tizim yaratuvchisi (creator)mi",
  })
  @Field()
  @Column({ default: false })
  is_creator: boolean;
}
