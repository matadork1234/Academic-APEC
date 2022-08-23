import { IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { TypeDocument } from '../../type-document/entities/type-document.entity';
import { DetailStudent } from '../entities/detail-student.entity';
import { TExpeditionDocument } from '../enum/expedition-document.enum';
import { TGender } from '../enum/gender.enum';
import { TNationality } from '../enum/nationality.enum';

export class RegisterStudentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEnum(TNationality)
  @IsOptional()
  nationality?: TNationality;

  @IsEnum(TExpeditionDocument)
  @IsOptional()
  expeditionDocument?: TExpeditionDocument;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  documentIdentity: string;

  @IsEmail()
  @MinLength(10)
  @IsNotEmpty()
  email: string;

  @IsEnum(TGender)
  @IsOptional()
  gender?: TGender;

  @IsDateString()
  @IsNotEmpty()
  birthday: Date;
  
  @IsOptional()
  @MaxLength(20)
  phoneNumber?: string;

  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @IsNotEmpty()
  typeDocument: TypeDocument;
  
  user: User;

  detailStudent: DetailStudent;

}
