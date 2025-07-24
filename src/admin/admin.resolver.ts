import { Resolver, Query, Mutation, Args, Int, ID } from "@nestjs/graphql";
import { AdminService } from "./admin.service";
import { Admin } from "./entities/admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Resolver(() => Admin)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Query(() => [Admin])
  findAllAdmin() {
    return this.adminService.findAll();
  }

  @Query(() => Admin)
  findOneAdmin(@Args("id", { type: () => ID }) id: number) {
    return this.adminService.findOne(id);
  }

  @Mutation(() => Admin)
  createAdmin(@Args("createAdminInput") createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
  @Mutation(() => Admin)
  updateAdmin(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateAdminInput") updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Mutation(() => Boolean)
  removeAdmin(@Args("id", { type: () => ID }) id: number) {
    return this.adminService.remove(id);
  }
}
