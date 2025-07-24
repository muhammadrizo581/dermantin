import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "./category/category.module";
import { AdminModule } from "./admin/admin.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { DermantinModule } from "./dermantin/dermantin.module";
import { DermantinImageModule } from "./dermantin-img/dermantin-img.module";
import { AdvertisementModule } from "./adverstmen/adverstmen.module";
import { SocialModule } from './socials/socials.module';
import { ReviewModule } from './review/review.module';
import { StoreModule } from './store/store.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"postgres">("DB_CONNECTION"),
        host: config.get<string>("DB_HOST"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        port: config.get<number>("DB_PORT"),
        database: config.get<string>("DB_NAME"),
        entities: [__dirname + "dist/**/*.entitiy{.ts,.js}"],
        autoLoadEntities: true,
        logging: true,
        synchronize: true,
      }),
    }),
    CategoryModule,
    AdminModule,
    UserModule,
    AuthModule,
    DermantinModule,
    DermantinImageModule,
    AdvertisementModule,
    SocialModule,
    ReviewModule,
    StoreModule,
    OrderModule,
    PaymentModule,
    RequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
