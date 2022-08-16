import { Controller, Get } from '@nestjs/common';
import { TypeDocument } from './entities/type-document.entity';
import { TypeDocumentService } from './type-document.service';

@Controller('type-document')
export class TypeDocumentController {

    constructor(private readonly typeDocumentService: TypeDocumentService) {}

    @Get()
    async getAllTypeDocuments(): Promise<TypeDocument[]> { 
        return await this.typeDocumentService.getAllTypeDocuments();
    }
}
