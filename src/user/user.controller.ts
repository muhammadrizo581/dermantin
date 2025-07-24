import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "Yangi user yaratish" })
  @ApiResponse({ status: 201, type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha userlar ro‘yxati" })
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID orqali userni olish" })
  @ApiResponse({ status: 200, type: User })
  findOne(@Param("id") id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Userni tahrirlash" })
  @ApiResponse({ status: 200, type: User })
  update(@Param("id") id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Userni o‘chirish" })
  @ApiResponse({ status: 200, type: User })
  remove(@Param("id") id: number) {
    return this.userService.remove(+id);
  }
}
