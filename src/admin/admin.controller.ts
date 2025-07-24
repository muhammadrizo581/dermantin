import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Admin } from "./entities/admin.entity";

@ApiTags("Admins")
@Controller("admins")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({ summary: "Create new admin" })
  @ApiResponse({ status: 201, type: Admin })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({ status: 200, type: [Admin] })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one admin by ID" })
  @ApiResponse({ status: 200, type: Admin })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.adminService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update admin by ID" })
  @ApiResponse({ status: 200, type: Admin })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete admin by ID" })
  @ApiResponse({ status: 200, type: Boolean })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.adminService.remove(id);
  }
}
