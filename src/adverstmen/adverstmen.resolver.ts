import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AdvertisementService } from "./adverstmen.service";
import { Advertisement } from "./entities/adverstman.entity";
import { CreateAdvertisementDto } from "./dto/create-adverstman.dto";

@Resolver(() => Advertisement)
export class AdvertisementResolver {
  constructor(private readonly service: AdvertisementService) {}

  @Mutation(() => Advertisement)
  createAdvertisement(@Args("input") input: CreateAdvertisementDto) {
    return this.service.create(input);
  }

  @Query(() => [Advertisement], { name: "advertisements" })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => Advertisement, { name: "advertisement" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }
}
