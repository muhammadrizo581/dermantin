import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DermantinImage } from "./entities/dermantin-img.entity";
import { CreateDermantinImageDto } from "./dto/create-dermantin-img.dto";
import { UpdateDermantinImageDto } from "./dto/update-dermantin-img.dto";

@Injectable()
export class DermantinImageService {
  constructor(
    @InjectRepository(DermantinImage)
    private readonly repo: Repository<DermantinImage>
  ) {}

  async create(input: CreateDermantinImageDto): Promise<DermantinImage> {
    const image = this.repo.create(input);
    return this.repo.save(image);
  }

  async findAll(): Promise<DermantinImage[]> {
    return this.repo.find();
  }

  async findByDermantinId(dermantin_id: number): Promise<DermantinImage[]> {
    return this.repo.find({ where: { dermantin_id } });
  }

  async findOne(id: number): Promise<DermantinImage> {
    const image = await this.repo.findOneBy({ id });
    if (!image) throw new NotFoundException("Image not found");
    return image;
  }

  async update(
    id: number,
    input: UpdateDermantinImageDto
  ): Promise<DermantinImage> {
    const image = await this.findOne(id);
    Object.assign(image, input);
    return this.repo.save(image);
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id);
    await this.repo.delete(id);
    return true;
  }
}
