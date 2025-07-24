import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { AdvertisementService } from "./adverstmen.service";
import { CreateAdvertisementDto } from "./dto/create-adverstman.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Advertisement } from "./entities/adverstman.entity";

@ApiTags("Advertisement")
@Controller("advertisement")
export class AdvertisementController {
  constructor(private readonly service: AdvertisementService) {}

  @Post()
  @ApiOperation({ summary: "Create Advertisement" })
  @ApiResponse({ status: 201, type: Advertisement })
  create(@Body() input: CreateAdvertisementDto) {
    return this.service.create(input);
  }

  @Get()
  @ApiOperation({ summary: "Get all advertisements" })
  @ApiResponse({ status: 200, type: [Advertisement] })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get advertisement by id" })
  @ApiResponse({ status: 200, type: Advertisement })
  findOne(@Param("id") id: number) {
    return this.service.findOne(+id);
  }
}
