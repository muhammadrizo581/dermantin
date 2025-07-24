import { PartialType } from "@nestjs/swagger";
import { CreateRequestDto } from "./create-request.dto";
import { InputType, PartialType as GraphPartialType } from "@nestjs/graphql";

@InputType()
export class UpdateRequestDto extends GraphPartialType(CreateRequestDto) {}
