import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Request } from "./entities/request.entity";
import { RequestService } from "./request.service";
import { RequestResolver } from "./request.resolver";
import { RequestController } from "./request.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  providers: [RequestService, RequestResolver],
  controllers: [RequestController],
})
export class RequestModule {}
