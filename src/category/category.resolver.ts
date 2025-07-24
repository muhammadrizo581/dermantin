import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Query(() => [Category])
  findAllCategory() {
    return this.categoryService.findAll();
  }

  @Query(() => Category)
  findOneCategory(@Args("id", { type: () => ID }) id: string) {
    return this.categoryService.findOne(+id);
  }
  @Mutation(() => Category)
  createCategory(
    @Args("createCategoryInput") createCategoryDto: CreateCategoryDto
  ) {
    return this.categoryService.create(createCategoryDto);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateCategoryInput") updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }
  @Mutation(() => Category)
  removeCategory(@Args("id", { type: () => ID }) id: number) {
    return this.categoryService.remove(+id);
  }
}
