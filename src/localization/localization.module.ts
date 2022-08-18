import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localization } from './entities/localization.entity';
import { LocalizationController } from './localization.controller';
import { LocalizationService } from './localization.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Localization
    ])
  ],
  controllers: [LocalizationController],
  providers: [LocalizationService]
})
export class LocalizationModule {}
