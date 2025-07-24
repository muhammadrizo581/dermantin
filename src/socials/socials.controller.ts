import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SocialService } from "./socials.service";
import { Social } from "./entities/social.entity";
import { CreateSocialDto } from "./dto/create-social.dto";
import { UpdateSocialDto } from "./dto/update-social.dto";

@ApiTags("Socials")
@Controller("socials")
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Post()
  @ApiOperation({ summary: "Create a new social link" })
  @ApiResponse({ status: 201, type: Social })
  create(@Body() dto: CreateSocialDto): Promise<Social> {
    return this.socialService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all socials" })
  @ApiResponse({ status: 200, type: [Social] })
  findAll(): Promise<Social[]> {
    return this.socialService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get social by ID" })
  @ApiResponse({ status: 200, type: Social })
  findOne(@Param("id") id: string): Promise<Social> {
    return this.socialService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a social link" })
  @ApiResponse({ status: 200, type: Social })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateSocialDto
  ): Promise<Social> {
    return this.socialService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a social link" })
  @ApiResponse({ status: 200, description: "Social deleted" })
  remove(@Param("id") id: string): Promise<void> {
    return this.socialService.remove(+id);
  }
}
