import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Store } from "./entities/store.entity";
import { Repository } from "typeorm";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>
  ) {}

  create(dto: CreateStoreDto): Promise<Store> {
    const store = this.storeRepository.create(dto);
    return this.storeRepository.save(store);
  }

  findAll(): Promise<Store[]> {
    return this.storeRepository.find({ relations: ["manager", "rating"] });
  }

  async findOne(id: number): Promise<Store> {
    const store = await this.storeRepository.findOne({
      where: { id },
      relations: ["manager", "rating"],
    });

    if (!store) {
      throw new Error(`Store with ID ${id} not found`);
    }

    return store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const store = await this.storeRepository.findOne({ where: { id } });

    if (!store) {
      throw new Error(`Store with ID ${id} not found`);
    }

    Object.assign(store, updateStoreDto);
    return this.storeRepository.save(store);
  }

  async remove(id: number): Promise<void> {
    await this.storeRepository.delete(id);
  }
}
