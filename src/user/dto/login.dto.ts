import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";

@InputType()
export class LoginDto {
  @Field()
  @ApiProperty({ example: "+998901234567" })
  @IsNotEmpty({ message: "Telefon raqam bo'sh bo'lmasligi kerak" })
  @IsString({ message: "Telefon raqam string bo'lishi kerak" })
  phone: string;

  @Field()
  @ApiProperty({ example: "securePassword123" })
  @IsNotEmpty({ message: "Parol bo'sh bo'lmasligi kerak" })
  password: string;
}
