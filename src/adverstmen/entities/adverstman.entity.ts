import { ObjectType, Field, ID, registerEnumType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";

export enum AdvertisementType {
  SLIDER = "SLIDER",
  BANNER = "BANNER",
}

export enum AdvertisementStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

registerEnumType(AdvertisementType, {
  name: "AdvertisementType",
});

registerEnumType(AdvertisementStatus, {
  name: "AdvertisementStatus",
});

@ObjectType()
@Entity()
export class Advertisement {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Field(() => Dermantin)
  @ManyToOne(() => Dermantin, (dermantin) => dermantin.advertisements, {
    eager: true,
  })
  @ApiProperty({ type: () => Dermantin })
  dermantin: Dermantin;

  @Field()
  @Column({ type: "smallint" })
  @ApiProperty({ example: 15 })
  discount_percent: number;

  @Field(() => AdvertisementType)
  @Column({ type: "enum", enum: AdvertisementType })
  @ApiProperty({ enum: AdvertisementType, example: AdvertisementType.SLIDER })
  type: AdvertisementType;

  @Field(() => AdvertisementStatus)
  @Column({ type: "enum", enum: AdvertisementStatus })
  @ApiProperty({
    enum: AdvertisementStatus,
    example: AdvertisementStatus.ACTIVE,
  })
  status: AdvertisementStatus;

  @Field()
  @Column({ type: "date" })
  @ApiProperty({ example: "2025-07-21" })
  start_date: Date;

  @Field()
  @Column({ type: "date" })
  @ApiProperty({ example: "2025-07-30" })
  end_date: Date;
}
