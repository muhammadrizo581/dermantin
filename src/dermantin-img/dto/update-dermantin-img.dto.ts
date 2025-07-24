import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CreateDermantinImageDto } from "./create-dermantin-img.dto";

@InputType()
export class UpdateDermantinImageDto extends PartialType(
  CreateDermantinImageDto
) {
  @Field(() => Int)
  @ApiProperty()
  id: number;
}
