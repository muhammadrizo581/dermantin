import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateDermantinImageDto {
  @Field()
  @ApiProperty()
  @IsInt()
  dermantin_id: number;

  @Field()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image_url: string;

  @Field()
  @ApiProperty()
  @IsBoolean()
  is_main: boolean;
}
