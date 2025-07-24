import { ApiProperty } from "@nestjs/swagger";
import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsBoolean } from "class-validator";

@InputType() 
export class CreateAdminDto {
  @ApiProperty({ example: "Ali Valiyev" })
  @Field()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: "ali@mail.com" })
  @Field()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "+998901234567" })
  @Field()
  @IsPhoneNumber("UZ")
  phone: string;

  @ApiProperty({ example: "password123" })
  @Field()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: true })
  @Field()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ example: false })
  @Field()
  @IsBoolean()
  is_creator: boolean;
}
