import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { DermantinService } from "./dermantin.service";
import { Dermantin } from "./entities/dermantin.entity";
import { CreateDermantinDto } from "./dto/create-dermantin.dto";
import { UpdateDermantinDto } from "./dto/update-dermantin.dto";

@Resolver(() => Dermantin)
export class DermantinResolver {
  constructor(private readonly dermantinService: DermantinService) {}

  @Mutation(() => Dermantin)
  createDermantin(@Args("createDermantinInput") input: CreateDermantinDto) {
    return this.dermantinService.create(input);
  }

  @Query(() => [Dermantin])
  findAllDermantin() {
    return this.dermantinService.findAll();
  }

  @Query(() => Dermantin)
  findOneDermantin(@Args("id", { type: () => Int }) id: number) {
    return this.dermantinService.findOne(id);
  }

  @Mutation(() => Dermantin)
  updateDermantin(@Args("updateDermantinInput") input: UpdateDermantinDto) {
    return this.dermantinService.update(input.id, input);
  }

  @Mutation(() => Boolean)
  removeDermantin(@Args("id", { type: () => Int }) id: number) {
    return this.dermantinService.remove(id);
  }
}
