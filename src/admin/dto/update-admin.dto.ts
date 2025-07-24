import { PartialType } from "@nestjs/swagger";
import { CreateAdminDto } from "./create-admin.dto";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @Field({ nullable: true })
  full_name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  is_active?: boolean;

  @Field({ nullable: true })
  is_creator?: boolean;
}
