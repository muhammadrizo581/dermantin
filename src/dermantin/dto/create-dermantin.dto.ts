import { InputType, Field, Float } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { DermantinClass } from "../entities/dermantin.entity";

@InputType()
export class CreateDermantinDto {
  @ApiProperty({
    example: "Black Premium Leather",
    description: "Dermantin nomi",
  })
  @Field()
  name: string;

  @ApiProperty({ example: 120000.5, description: "Narxi (so‘mda)" })
  @Field(() => Float)
  price: number;

  @ApiProperty({ example: 4.7, description: "Foydalanuvchilar reytingi" })
  @Field(() => Float)
  rating: number;

  @ApiProperty({
    enum: DermantinClass,
    example: DermantinClass.PREMIUM,
    description: "Dermantin klassi",
  })
  @Field(() => DermantinClass)
  class: DermantinClass;

  @ApiProperty({ example: 2, description: "Category ID (tashqi kalit)" })
  @Field()
  categoryId: number;

  @ApiProperty({ example: 1, description: "Do‘kon ID (hozircha bog‘lanmagan)" })
  @Field()
  store_id: number;
}
