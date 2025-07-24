import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

export enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

registerEnumType(RequestStatus, {
  name: "RequestStatus",
});

@ObjectType()
@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  @ApiProperty()
  id: number;

  @Column()
  @Field()
  @ApiProperty()
  text: string;

  @Column({ type: "enum", enum: RequestStatus, default: RequestStatus.PENDING })
  @Field(() => RequestStatus)
  @ApiProperty({ enum: RequestStatus })
  status: RequestStatus;

  @Field(() => User)
  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.requests)
  user: User;
}
