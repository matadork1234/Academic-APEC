import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTypeDocumentDto, UpdateTypeDocumentDto } from './dtos';
import { TypeDocument } from './entities/type-document.entity';

@Injectable()
export class TypeDocumentService {

    private readonly Logger = new Logger(TypeDocumentService.name);

    constructor(
        @InjectRepository(TypeDocument)
        private readonly typeDocumentRepository: Repository<TypeDocument>
    ) {}

    async getAllTypeDocuments(): Promise<TypeDocument[]> {
        var typeDocuments = await this.typeDocumentRepository.find();

        return typeDocuments;
    }

    async findByTypeDocumentId(id: string): Promise<TypeDocument> { 
        var typeDocument = await this.typeDocumentRepository.findOne({ 
            where: {
                id
            }
         });

         if (!typeDocument) throw new NotFoundException('Type Document not found');

         return typeDocument;
    }

    async createTypeDocument(createTypeDocumentDto: CreateTypeDocumentDto): Promise<TypeDocument> {
        try {
            var typeDocument = this.typeDocumentRepository.create(createTypeDocumentDto);
            await this.typeDocumentRepository.save(typeDocument);

            return typeDocument;
        } catch (error) {
            this.Logger.error(error);
        }
    }

    async updateTypeDocument(id: string, updateTypeDocumentDto: UpdateTypeDocumentDto): Promise<TypeDocument> {
        try {
            var typeDocument = this.findByTypeDocumentId(id);
            var editTypeDOcument = Object.assign(typeDocument, updateTypeDocumentDto);

            await this.typeDocumentRepository.save(editTypeDOcument);

            return editTypeDOcument;

        } catch (error) {
            this.Logger.error(error);
        }
    }

    async deleteTypeDocument(id: string): Promise<string> {
        try {
            var typeDocument = await this.findByTypeDocumentId(id);
            this.typeDocumentRepository.remove(typeDocument);
            return `Deleted ${ typeDocument.description } successfully`;
        } catch (errors) {
            this.Logger.error(errors);
            throw new BadRequestException(errors.message)
        }
    }
}