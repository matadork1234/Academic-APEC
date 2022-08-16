import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTypeDocumentDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    description: string;
}