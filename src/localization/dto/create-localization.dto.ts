import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { TTypeLocation } from '../enum/type-location.enum';

export class CreateLocalizationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  name: string;

  @IsEnum(TTypeLocation)
  @IsNotEmpty()
  typeLocation: TTypeLocation;
  order: number;
  latitude: number;
  longitude: number;
}
