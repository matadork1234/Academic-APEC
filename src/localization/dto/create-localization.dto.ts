import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsString, Min, MinLength } from 'class-validator';
import { TTypeLocation } from '../enum/type-location.enum';

export class CreateLocalizationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  name: string;

  @IsEnum(TTypeLocation)
  @IsNotEmpty()
  typeLocation: TTypeLocation;
  
  @IsNumber()
  @Min(0)
  order?: number;

  @IsDecimal()
  @Min(0)
  latitude?: number;

  @IsDecimal()
  @Min(0)
  longitude?: number;
}
