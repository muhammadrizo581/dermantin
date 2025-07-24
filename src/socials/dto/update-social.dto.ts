import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from "class-validator";
import { CreateSocialDto } from "./create-social.dto";
import { SocialType } from "../entities/social.entity";

@InputType()
export class UpdateSocialDto extends PartialType(CreateSocialDto) {
  @ApiPropertyOptional({ example: "New Name" })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({ enum: SocialType })
  @Field(() => SocialType, { nullable: true })
  @IsOptional()
  @IsEnum(SocialType)
  type?: SocialType;

  @ApiPropertyOptional({ example: "https://new-link.com" })
  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  link?: string;

  @ApiPropertyOptional({ example: 4 })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  storeId?: number;
}
