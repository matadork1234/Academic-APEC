import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { IResponseSelect } from 'src/type-document/interfaces/response-select.interface';
import { CreateLocalizationDto } from './dto/create-localization.dto';
import { UpdateLocalizationDto } from './dto/update-localization.dto';
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
        return await this.localizationService.getLocalizationById(id);
    }

    @Post()
    async createLocalization(@Body() createLocalizationDto: CreateLocalizationDto): Promise<Localization> {
        return await this.localizationService.createLocalization(createLocalizationDto);
    }

    @Put(':id')
    async updateLocalization(@Param('id', ParseUUIDPipe) id: string, @Body() updateLocalizationDto: UpdateLocalizationDto): Promise<Localization> {
        return await this.localizationService.updateLocalization(id, updateLocalizationDto);
    }

    @Delete(':id')
    async deleteLocalization(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
        return await this.localizationService.deleteLocalization(id);
    }
}
