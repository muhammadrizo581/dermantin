import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Dermantin } from "./entities/dermantin.entity";
import { CreateDermantinDto } from "./dto/create-dermantin.dto";
import { UpdateDermantinDto } from "./dto/update-dermantin.dto";

@Injectable()
export class DermantinService {
  constructor(
    @InjectRepository(Dermantin)
    private dermantinRepo: Repository<Dermantin>
  ) {}

  create(createDermantinInput: CreateDermantinDto): Promise<Dermantin> {
    const dermantin = this.dermantinRepo.create(createDermantinInput);
    return this.dermantinRepo.save(dermantin);
  }

  findAll(): Promise<Dermantin[]> {
    return this.dermantinRepo.find({ relations: ["category"] });
  }
  async findOne(id: number): Promise<Dermantin> {
    const dermantin = await this.dermantinRepo.findOne({
      where: { id },
      relations: ["category"],
    });
    if (!dermantin) {
      throw new NotFoundException(`Dermantin with ID ${id} not found`);
    }
    return dermantin;
  }

  async update(
    id: number,
    updateInput: UpdateDermantinDto
  ): Promise<Dermantin> {
    await this.dermantinRepo.update(id, updateInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    await this.dermantinRepo.delete(id);
    return true;
  }
}
