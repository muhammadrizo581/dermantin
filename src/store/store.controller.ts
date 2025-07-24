import { Controller, Post, Body, Get, Param, Delete, Patch } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { StoreService } from "./store.service";
import { Store } from "./entities/store.entity";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";

@ApiTags("Stores")
@Controller("stores")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @ApiOperation({ summary: "Create a new store" })
  @ApiResponse({ status: 201, type: Store })
  create(@Body() dto: CreateStoreDto): Promise<Store> {
    return this.storeService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all stores" })
  @ApiResponse({ status: 200, type: [Store] })
  findAll(): Promise<Store[]> {
    return this.storeService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get store by ID" })
  @ApiResponse({ status: 200, type: Store })
  findOne(@Param("id") id: string): Promise<Store> {
    return this.storeService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a store by ID" })
  @ApiResponse({ status: 200, description: "Store updated", type: Store })
  update(
    @Param("id") id: string,
    @Body() updateStoreDto: UpdateStoreDto
  ): Promise<Store> {
    return this.storeService.update(+id, updateStoreDto);
  }
  @Delete(":id")
  @ApiOperation({ summary: "Delete store by ID" })
  @ApiResponse({ status: 200, description: "Store deleted" })
  remove(@Param("id") id: string): Promise<void> {
    return this.storeService.remove(+id);
  }
}
