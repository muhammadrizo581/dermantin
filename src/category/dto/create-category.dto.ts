import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
@InputType()
export class CreateCategoryDto {
  @Field()
  @ApiProperty({
    example: "Ko'ja",
    description: "Category nomi",
  })
  name: string;

  @Field({ nullable: true })
  @ApiProperty({
    example: "koja.png",
    description: "Category logosi agar bo'lsa",
  })
  logo?: string;
}
