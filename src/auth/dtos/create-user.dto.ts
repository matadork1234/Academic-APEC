import { IsEmail, isNotEmpty, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    documentIdentity: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}