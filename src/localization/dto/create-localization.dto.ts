import { IsDecimal, IsEmpty, IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Localization } from '../entities/localization.entity';
import { TTypeLocation } from '../enum/type-location.enum';

export class CreateLocalizationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @IsEnum(TTypeLocation)
  @IsOptional()
  typeLocation?: TTypeLocation;
  
  @IsNumber()
  @Min(0)
  order?: number;

  @IsLatitude()
  @Min(0)
  latitude?: number;

  @IsLongitude()
  @Min(0)
  longitude?: number;

  @IsOptional()
  localizationParent?: Localization;
}
