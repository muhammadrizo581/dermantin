import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { RequestService } from "./request.service";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Request")
@Controller("request")
export class RequestController {
  constructor(private readonly service: RequestService) {}

  @Post()
  @ApiOperation({ summary: "Create request" })
  @ApiResponse({ status: 201, description: "Request created" })
  create(@Body() dto: CreateRequestDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all requests" })
  @ApiResponse({ status: 200, description: "List of requests" })
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one request" })
  @ApiResponse({ status: 200, description: "Single request" })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update request" })
  @ApiResponse({ status: 200, description: "Request updated" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateRequestDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete request" })
  @ApiResponse({ status: 200, description: "Request deleted" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
