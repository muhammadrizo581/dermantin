import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { SocialService } from "./socials.service";
import { Social } from "./entities/social.entity";
import { CreateSocialDto } from "./dto/create-social.dto";
import { UpdateSocialDto } from "./dto/update-social.dto";

@Resolver(() => Social)
export class SocialResolver {
  constructor(private readonly socialService: SocialService) {}

  @Mutation(() => Social)
  createSocial(
    @Args("createSocialDto") createSocialDto: CreateSocialDto
  ): Promise<Social> {
    return this.socialService.create(createSocialDto);
  }

  @Query(() => [Social], { name: "getAllSocials" })
  findAll(): Promise<Social[]> {
    return this.socialService.findAll();
  }

  @Query(() => Social, { name: "getSocial" })
  findOne(@Args("id", { type: () => Int }) id: number): Promise<Social> {
    return this.socialService.findOne(id);
  }

  @Mutation(() => Social)
  updateSocial(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateSocialDto") updateSocialDto: UpdateSocialDto
  ): Promise<Social> {
    return this.socialService.update(id, updateSocialDto);
  }

  @Mutation(() => Boolean)
  deleteSocial(@Args("id", { type: () => Int }) id: number): Promise<boolean> {
    return this.socialService.remove(id).then(() => true);
  }
}
