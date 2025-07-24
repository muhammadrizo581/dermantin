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
import { CreateStoreDto } from "./create-store.dto";
import { Region, Status } from "../entities/store.entity";

@InputType()
export class UpdateStoreDto extends PartialType(CreateStoreDto) {
  @ApiPropertyOptional({ example: "New Store Name" })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({ example: "https://example.com/logo.png" })
  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional({ enum: Region })
  @Field(() => Region, { nullable: true })
  @IsOptional()
  @IsEnum(Region)
  region?: Region;

  @ApiPropertyOptional({ example: "Updated description" })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiPropertyOptional({ enum: Status })
  @Field(() => Status, { nullable: true })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional({ example: 1 })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  managerId?: number;

  @ApiPropertyOptional({ example: 3 })
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  ratingId?: number;
}
