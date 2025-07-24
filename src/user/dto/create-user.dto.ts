
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import {
  UserLang,
  UserRegion,
  UserRole,
} from "../../user/entities/user.entity";

@InputType() 
export class CreateUserDto {
  @Field()
  @ApiProperty({ example: "Ali Valiyev" })
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @Field()
  @ApiProperty({ example: "+998901234567" })
  @IsNotEmpty()
  @IsPhoneNumber("UZ") 
  phone: string;

  @Field()
  @ApiProperty({ example: "StrongPassword123" })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field(() => UserLang)
  @ApiProperty({ enum: UserLang })
  @IsEnum(UserLang)
  lang: UserLang;

  @Field(() => UserRegion)
  @ApiProperty({ enum: UserRegion })
  @IsEnum(UserRegion)
  region: UserRegion;

  @Field(() => UserRole)
  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
