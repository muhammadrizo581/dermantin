import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Category } from "./entities/category.entity";

@ApiTags("Category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: "Yangi category yaratish" })
  @ApiResponse({
    status: 201,
    description: "Category yaratildi",
    type: Category,
  })
  @ApiResponse({ status: 400, description: "Validation xatolik" })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha categorylar ro‘yxati" })
  @ApiResponse({
    status: 200,
    description: "Barcha categorylar",
    type: [Category],
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha bitta category olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan category",
    type: Category,
  })
  @ApiResponse({ status: 404, description: "Category topilmadi" })
  findOne(@Param("id") id: number) {
    return this.categoryService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "ID bo‘yicha category yangilash" })
  @ApiResponse({
    status: 200,
    description: "Category yangilandi",
    type: Category,
  })
  @ApiResponse({ status: 404, description: "Category topilmadi" })
  update(
    @Param("id") id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "ID bo‘yicha category o‘chirish" })
  @ApiResponse({ status: 200, description: "Category o‘chirildi" })
  @ApiResponse({ status: 404, description: "Category topilmadi" })
  remove(@Param("id") id: number) {
    return this.categoryService.remove(+id);
  }
}
