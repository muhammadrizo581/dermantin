import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Advertisement } from "./entities/adverstman.entity";
import { Repository } from "typeorm";
import { CreateAdvertisementDto } from "./dto/create-adverstman.dto";
import { Dermantin } from "../dermantin/entities/dermantin.entity";

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(Advertisement)
    private adRepo: Repository<Advertisement>,
    @InjectRepository(Dermantin)
    private dermantinRepo: Repository<Dermantin>
  ) {}

  async create(input: CreateAdvertisementDto): Promise<Advertisement> {
    const dermantin = await this.dermantinRepo.findOneByOrFail({
      id: input.dermantinId,
    });
    const ad = this.adRepo.create({ ...input, dermantin });
    return this.adRepo.save(ad);
  }

  async findAll(): Promise<Advertisement[]> {
    return this.adRepo.find();
  }

  async findOne(id: number): Promise<Advertisement> {
    return this.adRepo.findOneByOrFail({ id });
  }
}
