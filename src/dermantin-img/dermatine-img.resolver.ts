import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { DermantinImageService } from "./dermantin-img.service";
import { DermantinImage } from "./entities/dermantin-img.entity";
import { CreateDermantinImageDto } from "./dto/create-dermantin-img.dto";
import { UpdateDermantinImageDto } from "./dto/update-dermantin-img.dto";

@Resolver(() => DermantinImage)
export class DermantinImageResolver {
  constructor(private readonly dermantinImageService: DermantinImageService) {}

  @Mutation(() => DermantinImage)
  createDermantinImage(
    @Args("createDermantinImageInput")
    createDermantinImageInput: CreateDermantinImageDto
  ) {
    return this.dermantinImageService.create(createDermantinImageInput);
  }

  @Query(() => [DermantinImage], { name: "findAllDermantinImages" })
  findAll() {
    return this.dermantinImageService.findAll();
  }

  @Query(() => DermantinImage, { name: "findOneDermantinImage" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.dermantinImageService.findOne(id);
  }

  @Mutation(() => DermantinImage)
  updateDermantinImage(
    @Args("updateDermantinImageInput")
    updateDermantinImageInput: UpdateDermantinImageDto
  ) {
    return this.dermantinImageService.update(
      updateDermantinImageInput.id,
      updateDermantinImageInput
    );
  }

  @Mutation(() => Boolean)
  removeDermantinImage(@Args("id", { type: () => Int }) id: number) {
    return this.dermantinImageService.remove(id);
  }
}
