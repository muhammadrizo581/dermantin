import { InputType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
} from "class-validator";
import { SocialType } from "../entities/social.entity";

@InputType()
export class CreateSocialDto {
  @ApiProperty({ example: "Facebook Page" })
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ enum: SocialType })
  @Field(() => SocialType)
  @IsEnum(SocialType)
  type: SocialType;

  @ApiProperty({ example: "https://facebook.com/store" })
  @Field()
  @IsUrl()
  link: string;

  @ApiProperty({ example: 3 })
  @Field(() => Int)
  @IsInt()
  storeId: number;
}
