import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User],)
  findAllUsers() {
    return this.userService.findAll();
  }

  @Query(() => User,)
  findOneUsers(@Args("id", { type: () => ID }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User, { name: "createUser" })
  create(@Args("input") input: CreateUserDto) {
    return this.userService.create(input);
  }

  @Mutation(() => User, { name: "updateUser" })
  update(
    @Args("id", { type: () => ID }) id: number,
    @Args("input") input: UpdateUserDto
  ) {
    return this.userService.update(id, input);
  }

  @Mutation(() => User, { name: "removeUser" })
  remove(@Args("id", { type: () => ID }) id: number) {
    return this.userService.remove(id);
  }
}
