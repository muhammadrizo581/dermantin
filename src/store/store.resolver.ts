import { Resolver, Mutation, Args, Int, Query } from "@nestjs/graphql";
import { StoreService } from "./store.service";
import { Store } from "./entities/store.entity";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";

@Resolver(() => Store)
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

  @Mutation(() => Store)
  createStore(
    @Args("createStoreDto") createStoreDto: CreateStoreDto
  ): Promise<Store> {
    return this.storeService.create(createStoreDto);
  }

  @Query(() => [Store], { name: "getAllStores" })
  findAll(): Promise<Store[]> {
    return this.storeService.findAll();
  }
  @Mutation(() => Store)
  updateStore(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateStoreDto") updateStoreDto: UpdateStoreDto
  ): Promise<Store> {
    return this.storeService.update(id, updateStoreDto);
  }

  @Query(() => Store, { name: "getStore" })
  findOne(@Args("id", { type: () => Int }) id: number): Promise<Store> {
    return this.storeService.findOne(id);
  }
}
