import { InputType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  AdvertisementType,
  AdvertisementStatus,
} from "../entities/adverstman.entity";

@InputType()
export class CreateAdvertisementDto {
  @Field(() => Int)
  @ApiProperty({ example: 1 })
  dermantinId: number;

  @Field(() => Int)
  @ApiProperty({ example: 15 })
  discount_percent: number;

  @Field(() => AdvertisementType)
  @ApiProperty({ enum: AdvertisementType, example: AdvertisementType.SLIDER })
  type: AdvertisementType;

  @Field(() => AdvertisementStatus)
  @ApiProperty({
    enum: AdvertisementStatus,
    example: AdvertisementStatus.ACTIVE,
  })
  status: AdvertisementStatus;

  @Field()
  @ApiProperty({ example: "2025-07-21" })
  start_date: Date;

  @Field()
  @ApiProperty({ example: "2025-07-30" })
  end_date: Date;
}
