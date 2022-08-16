import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTypeDocumentDto, UpdateTypeDocumentDto } from './dtos';
import { TypeDocument } from './entities/type-document.entity';
import { IResponseSelect } from './interfaces/response-select.interface';
import { TypeDocumentService } from './type-document.service';

@Controller('type-document')
export class TypeDocumentController {

    constructor(private readonly typeDocumentService: TypeDocumentService) {}

    @Get()
    async getAllTypeDocuments(): Promise<TypeDocument[]> { 
        return await this.typeDocumentService.getAllTypeDocuments();
    }

    @Get('getSelectTypeDocument')
    async getSelectTypeDocument(): Promise<IResponseSelect[]> {
        return this.typeDocumentService.getSelectTypeDocument();
    }

    @Get(':id')
    async getTypeDocumetById(@Param('id') id: string): Promise<TypeDocument> {
        return await this.typeDocumentService.getTypeDocumetById(id);
    }

    @Post()
    async createTypeDocument(@Body() createTypeDocumentDto: CreateTypeDocumentDto): Promise<TypeDocument> {
        return await this.typeDocumentService.createTypeDocument(createTypeDocumentDto);
    }

    @Put(':id')
    async updateTypeDocument(@Param('id') id: string, @Body() updateTypeDocumentDto: UpdateTypeDocumentDto): Promise<TypeDocument> {
        return await this.typeDocumentService.updateTypeDocument(id, updateTypeDocumentDto)
    }

    @Delete(':id')
    async deleteTypeDocument(@Param('id') id: string): Promise<string> {
        return await this.typeDocumentService.deleteTypeDocument(id);
    }
}
