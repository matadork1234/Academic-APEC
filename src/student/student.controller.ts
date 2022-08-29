import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

import { ExtFileImage } from 'src/common/filters/ext-file-image.filter';
import { filenameImage } from 'src/common/helpers/filename-image.helper';

import { Auth, GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import { RegisterStudentDto } from './dto/register-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

const MULTER_OPTIONS: MulterOptions = {
    storage: diskStorage({
        destination: './static/students',
        filename: filenameImage
    }),
    fileFilter: ExtFileImage
};

@Controller('student')
export class StudentController {

    constructor(
        private readonly studentService: StudentService,
        private readonly config: ConfigService
    ) { }

    @Get()
    async getAllStudents(): Promise<Student[]> {
        return await this.studentService.getAllStudents();
    }

    @Get('image/:nameFile')
    async getImageStudent(@Res() res,  @Param('nameFile') nameFile: string) {
        var url = this.studentService.getPathImageStudent(nameFile);

        res.sendFile(url);
    }

    @Get(':id')
    async getStudentById(@Param('id', ParseUUIDPipe) id: string): Promise<Student> {
        return await this.studentService.getStudentById(id);
    }

    

    @Auth()
    @Post()
    async registerStudent(@Body() registerStudentDto: RegisterStudentDto, @GetUser() user: User): Promise<any> {
        return this.studentService.registerStudent(registerStudentDto, user);
    }

    @Patch()
    @Auth()
    @UseInterceptors(FileInterceptor('file', MULTER_OPTIONS))
    async uploadImageStudent(@GetUser() { id }: User, @UploadedFile() file: Express.Multer.File): Promise<Student> {
        return await this.studentService.uploadPhotoStudent(id, file);
    }

    @Put(':id')
    @Auth()
    async updateStudent(@Param('id', ParseUUIDPipe) id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
        return await this.studentService.updateStudent(id, updateStudentDto);
    }

}
