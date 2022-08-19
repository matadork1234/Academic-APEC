import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { IResponseSelect } from 'src/type-document/interfaces/response-select.interface';
import { CreateLocalizationDto } from './dto/create-localization.dto';
import { Localization } from './entities/localization.entity';
import { LocalizationService } from './localization.service';

@Controller('localization')
export class LocalizationController {

    constructor(private readonly localizationService: LocalizationService) {}

    @Get()
    async getAllLocalizations(): Promise<Localization[]> {
        return await this.localizationService.getAllLocalizations();
    }

    @Get('getSelectLocalizations')
    async getSelectLocalizations(): Promise<IResponseSelect[]> {
        return await this.localizationService.getSelectLocalizations();
    }
    
    @Get(':id')
    async getLocalizationById(@Param('id', ParseUUIDPipe) id: string): Promise<Localization> {
        return this.localizationService.getLocalizationById(id);
    }

    @Post()
    async createLocalization(@Body() createLocalizationDto: CreateLocalizationDto): Promise<Localization> {
        return this.localizationService.createLocalization(createLocalizationDto);
    }
}
