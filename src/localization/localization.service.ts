import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localization } from './entities/localization.entity';

@Injectable()
export class LocalizationService {

    constructor(
        @InjectRepository(Localization)
        private readonly localizationRepository: Repository<Localization>
    ) { }

    async getAllLocalizations(): Promise<Localization[]> {
        var dataLocalizations = await this.localizationRepository.find();

        return dataLocalizations;
    }

    async getLocalizationById(id: string): Promise<Localization> {
        var dataLocalization = await this.localizationRepository.findOne({
            where: {
                id
            }
        })

        if (!dataLocalization) throw new NotFoundException('Localization not found');

        return dataLocalization;
    }

    // async createLocalization()
}
