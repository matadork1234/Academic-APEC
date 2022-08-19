import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IResponseSelect } from 'src/type-document/interfaces/response-select.interface';
import { Repository } from 'typeorm';
import { CreateLocalizationDto } from './dto/create-localization.dto';
import { Localization } from './entities/localization.entity';

@Injectable()
export class LocalizationService {

    private readonly logger = new Logger(LocalizationService.name);

    constructor(
        @InjectRepository(Localization)
        private readonly localizationRepository: Repository<Localization>
    ) { }

    async getAllLocalizations(): Promise<Localization[]> {
        var dataLocalizations = await this.localizationRepository.find();

        return dataLocalizations;
    }

    async getSelectLocalizations(): Promise<IResponseSelect[]> {
        var dataLocalizations = await this.localizationRepository.find({
            where: {
                isActive: true
            }
        });

        return dataLocalizations.map(data => { return { id: data.id, name: data.name }});
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

    async createLocalization(createLocalizationDto: CreateLocalizationDto): Promise<Localization> {
        try {
            var dataLocalization = this.localizationRepository.create(createLocalizationDto);

            await this.localizationRepository.save(dataLocalization);

            return dataLocalization;
        } catch (error) {
            this.logger.error(error);
        }
    }


}
