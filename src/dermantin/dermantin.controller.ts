import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DermantinService } from "./dermantin.service";
import { CreateDermantinDto } from "./dto/create-dermantin.dto";
import { UpdateDermantinDto } from "./dto/update-dermantin.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Dermantin } from "./entities/dermantin.entity";

@ApiTags("Dermantin")
@Controller("dermantin")
export class DermantinController {
  constructor(private readonly dermantinService: DermantinService) {}

  @Post()
  @ApiOperation({ summary: "Yangi dermantin yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yaratilgan dermantin",
    type: Dermantin,
  })
  create(@Body() createDermantinDto: CreateDermantinDto) {
    return this.dermantinService.create(createDermantinDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha dermantinlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Dermantinlar ro‘yxati",
    type: [Dermantin],
  })
  findAll() {
    return this.dermantinService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali bitta dermantinni olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan dermantin",
    type: Dermantin,
  })
  @ApiResponse({ status: 404, description: "Dermantin topilmadi" })
  findOne(@Param("id") id: string) {
    return this.dermantinService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Dermantinni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Yangilangan dermantin",
    type: Dermantin,
  })
  update(
    @Param("id") id: string,
    @Body() updateDermantinDto: UpdateDermantinDto
  ) {
    return this.dermantinService.update(+id, updateDermantinDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Dermantinni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "O‘chirish muvaffaqiyatli bo‘ldi (true yoki false)",
  })
  remove(@Param("id") id: string) {
    return this.dermantinService.remove(+id);
  }
}
