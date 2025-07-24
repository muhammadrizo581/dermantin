import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Store } from "src/store/entities/store.entity";

export enum SocialType {
  FACEBOOK = "FACEBOOK",
  INSTAGRAM = "INSTAGRAM",
  TELEGRAM = "TELEGRAM",
  TWITTER = "TWITTER",
}

registerEnumType(SocialType, { name: "SocialType" });

@ObjectType()
@Entity("socials")
export class Social {
  @ApiProperty({ example: 1 })
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Store Facebook Page" })
  @Field()
  @Column({ length: 255 })
  name: string;

  @ApiProperty({ enum: SocialType })
  @Field(() => SocialType)
  @Column({ type: "enum", enum: SocialType })
  type: SocialType;

  @ApiProperty({ example: "https://facebook.com/store" })
  @Field()
  @Column({ type: "text" })
  link: string;

  @ApiProperty({ example: 3 })
  @Field(() => Int)
  @Column()
  storeId: number;

  @ManyToOne(() => Store, (store) => store.socials, { onDelete: "CASCADE" })
  @JoinColumn({ name: "storeId" })
  @Field(() => Store)
  store: Store;
}
