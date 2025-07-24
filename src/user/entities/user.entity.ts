import { ObjectType, Field, registerEnumType, ID } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "../../review/entities/review.entity";
import { Store } from "../../store/entities/store.entity";
import { Order } from "../../order/entities/order.entity";
import { Payment } from "../../payment/entities/payment.entity";
import { Request } from "../../request/entities/request.entity";
export enum UserRole {
  USER = "user",
  MANAGER = "manager",
}

export enum UserLang {
  UZ = "uz",
  RU = "ru",
}

export enum UserRegion {
  ANDIJON = "Andijon",
  BUXORO = "Buxoro",
  FARGONA = "Fargona",
  JIZZAX = "Jizzax",
  XORAZM = "Xorazm",
  NAMANGAN = "Namangan",
  NAVOIY = "Navoiy",
  QASHQADARYO = "Qashqadaryo",
  QORAQALPOGISTON = "Qoraqalpogiston",
  SAMARQAND = "Samarqand",
  SIRDARYO = "Sirdaryo",
  SURXONDARYO = "Surxondaryo",
  TOSHKENT = "Toshkent",
}

registerEnumType(UserRole, { name: "UserRole" });
registerEnumType(UserLang, { name: "UserLang" });
registerEnumType(UserRegion, { name: "UserRegion" });

@ObjectType()
@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty({ example: 1, description: "User ID raqami" })
  id: number;

  @Column()
  @Field()
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Foydalanuvchi to‘liq ismi",
  })
  fullname: string;

  @Column({ unique: true })
  @Field()
  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  phone: string;

  @Column({ type: "enum", enum: UserRole })
  @Field(() => UserRole)
  @ApiProperty({
    enum: UserRole,
    description: "Foydalanuvchi roli (user yoki manager)",
  })
  role: UserRole;

  @Column({ type: "bigint", default: 0 })
  @Field()
  @ApiProperty({
    example: 0,
    description: "Tasdiqlanganlik statusi (1 = tasdiqlangan)",
  })
  is_verified: number;

  @Column({ type: "enum", enum: UserRegion })
  @Field(() => UserRegion)
  @ApiProperty({ enum: UserRegion, description: "Hudud (viloyat)" })
  region: UserRegion;

  @Column({ select: false })
  @ApiProperty({ example: "StrongPassword123", writeOnly: true })
  password: string;

  @Column({ type: "enum", enum: UserLang })
  @Field(() => UserLang)
  @ApiProperty({ enum: UserLang, description: "Til (uz yoki ru)" })
  lang: UserLang;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Store, (store) => store.manager)
  stores: Store[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Payment, (payment) => payment.user)
  @Field(() => [Payment], { nullable: true })
  payments: Payment[];

  @OneToMany(() => Request, (request) => request.user)
  requests: Request[];
}
