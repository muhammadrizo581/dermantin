import { ApiProperty } from "@nestjs/swagger";
import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { RequestStatus } from "../entities/request.entity";

@InputType()
export class CreateRequestDto {
  @ApiProperty()
  @Field()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ enum: RequestStatus, required: false })
  @Field(() => RequestStatus, { nullable: true })
  @IsEnum(RequestStatus)
  status?: RequestStatus;

  @ApiProperty()
  @Field()
  @IsNumber()
  userId: number;
}
