import { PartialType } from '@nestjs/swagger';
import { CreateAdvertisementDto } from "./create-adverstman.dto";

export class UpdateAdverstmanDto extends PartialType(CreateAdvertisementDto) {}
