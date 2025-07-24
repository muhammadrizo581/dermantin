import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "./entities/request.entity";
import { Repository } from "typeorm";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRepo: Repository<Request>
  ) {}

  create(dto: CreateRequestDto) {
    const request = this.requestRepo.create({
      ...dto,
      user: { id: dto.userId },
    });
    return this.requestRepo.save(request);
  }

  findAll() {
    return this.requestRepo.find({ relations: ["user"] });
  }

  findOne(id: number) {
    return this.requestRepo.findOne({ where: { id }, relations: ["user"] });
  }

  async update(id: number, dto: UpdateRequestDto) {
    const request = await this.requestRepo.findOne({ where: { id } });
    if (!request) throw new NotFoundException("Request not found");

    Object.assign(request, {
      ...dto,
      user: dto.userId ? { id: dto.userId } : request.user,
    });

    return this.requestRepo.save(request);
  }

  async remove(id: number) {
    const request = await this.requestRepo.findOneBy({ id });
    if (!request) throw new NotFoundException("Request not found");
    return this.requestRepo.remove(request);
  }
}
