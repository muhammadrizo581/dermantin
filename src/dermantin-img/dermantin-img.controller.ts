import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { DermantinImageService } from "./dermantin-img.service";
import { CreateDermantinImageDto } from "./dto/create-dermantin-img.dto";
import { UpdateDermantinImageDto } from "./dto/update-dermantin-img.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Dermanin Images")
@Controller("dermantin-images")
export class DermantinImageController {
  constructor(private readonly dermantinImageService: DermantinImageService) {}

  @Post()
  @ApiOperation({ summary: "Create new Dermantin image" })
  @ApiResponse({ status: 201, description: "Image successfully created" })
  async create(@Body() dto: CreateDermantinImageDto) {
    return this.dermantinImageService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all Dermantin images" })
  @ApiResponse({ status: 200, description: "List of all images returned" })
  async findAll() {
    return this.dermantinImageService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Dermantin image by ID" })
  @ApiResponse({ status: 200, description: "Image found by ID" })
  @ApiResponse({ status: 404, description: "Image not found" })
  async findOne(@Param("id") id: number) {
    return this.dermantinImageService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update Dermantin image by ID" })
  @ApiResponse({ status: 200, description: "Image updated successfully" })
  async update(@Param("id") id: number, @Body() dto: UpdateDermantinImageDto) {
    return this.dermantinImageService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete Dermantin image by ID" })
  @ApiResponse({ status: 200, description: "Image deleted successfully" })
  async remove(@Param("id") id: number) {
    return this.dermantinImageService.remove(+id);
  }
}
