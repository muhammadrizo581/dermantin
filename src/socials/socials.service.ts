import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Social } from "./entities/social.entity";
import { CreateSocialDto } from "./dto/create-social.dto";
import { UpdateSocialDto } from "./dto/update-social.dto";

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(Social)
    private readonly socialRepository: Repository<Social>
  ) {}

  create(dto: CreateSocialDto): Promise<Social> {
    const social = this.socialRepository.create(dto);
    return this.socialRepository.save(social);
  }

  findAll(): Promise<Social[]> {
    return this.socialRepository.find({ relations: ["store"] });
  }

  async findOne(id: number): Promise<Social> {
    const social = await this.socialRepository.findOne({
      where: { id },
      relations: ["store"],
    });
    if (!social) throw new Error(`Social with ID ${id} not found`);
    return social;
  }

  async update(id: number, dto: UpdateSocialDto): Promise<Social> {
    const social = await this.findOne(id);
    Object.assign(social, dto);
    return this.socialRepository.save(social);
  }

  async remove(id: number): Promise<void> {
    await this.socialRepository.delete(id);
  }
}
