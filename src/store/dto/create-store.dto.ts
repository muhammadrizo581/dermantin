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
import { Region, Status } from "../entities/store.entity";

@InputType()
export class CreateStoreDto {
  @ApiProperty({ example: "ElectroShop" })
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: "https://example.com/logo.png" })
  @Field()
  @IsUrl()
  logoUrl: string;

  @ApiProperty({ enum: Region })
  @Field(() => Region)
  @IsEnum(Region)
  region: Region;

  @ApiProperty({ example: "Best electronics in town" })
  @Field()
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiProperty({ enum: Status, default: Status.ACTIVE })
  @Field(() => Status, { defaultValue: Status.ACTIVE })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @IsInt()
  managerId: number;

  @ApiProperty({ example: 2 })
  @Field(() => Int)
  @IsInt()
  ratingId: number;
}
