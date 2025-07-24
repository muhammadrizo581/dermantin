import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const existing = await this.categoryRepo.findOne({
      where: {
        name: createCategoryDto.name,
      },
    });
    if (existing) {
      throw new ConflictException("Bunday category allaqachon mavjud");
    }

    return await this.categoryRepo.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const existing = await this.categoryRepo.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException(`Bunday ID - ${id} topilmadi`);
    }

    return existing;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const existing = await this.categoryRepo.preload({
      id,
      ...updateCategoryDto,
    });

    if (!existing) {
      throw new NotFoundException(`Bunday ${id} - Category topilmadi`);
    }
    return this.categoryRepo.save(existing);
  }

  async remove(id: number): Promise<Category> {
    const existing = await this.categoryRepo.findOneBy({ id });

    if (!existing) {
      throw new NotFoundException(`Category with ID (${id}) not found`);
    }

    const result = { ...existing };

    await this.categoryRepo.remove(existing);
    return result; 
  }
}
