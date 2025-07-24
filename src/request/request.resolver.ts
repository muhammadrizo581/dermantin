import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { RequestService } from "./request.service";
import { Request } from "./entities/request.entity";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";

@Resolver(() => Request)
export class RequestResolver {
  constructor(private readonly service: RequestService) {}

  @Query(() => [Request])
  getAllRequests() {
    return this.service.findAll();
  }

  @Query(() => Request)
  getRequest(@Args("id", { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Request)
  createRequest(@Args("data") dto: CreateRequestDto) {
    return this.service.create(dto);
  }

  @Mutation(() => Request)
  updateRequest(
    @Args("id", { type: () => Int }) id: number,
    @Args("data") dto: UpdateRequestDto
  ) {
    return this.service.update(id, dto);
  }

  @Mutation(() => Boolean)
  async deleteRequest(@Args("id", { type: () => Int }) id: number) {
    await this.service.remove(id);
    return true;
  }
}
