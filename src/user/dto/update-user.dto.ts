import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field({ nullable: true })
  fullname?: string;

  @Field({ nullable: true })
  phone?: string;
}
