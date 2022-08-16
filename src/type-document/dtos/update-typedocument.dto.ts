import { PartialType } from "@nestjs/mapped-types";
import { CreateTypeDocumentDto } from "./create-typedocument.dto";

export class UpdateTypeDocumentDto extends PartialType(CreateTypeDocumentDto) {
}