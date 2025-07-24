import { PartialType } from "@nestjs/swagger";
import { CreateCategoryDto } from "./create-category.dto";
import { Field, InputType } from "@nestjs/graphql";
@InputType()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  logo?: string;
}
