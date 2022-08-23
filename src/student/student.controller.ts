import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';
import { RegisterStudentDto } from './dto/register-student.dto';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService) { }

    @Get()
    async getAllStudents(): Promise<Student[]> {
        return await this.studentService.getAllStudents();
    }

    @Auth()
    @Post()
    async registerStudent(@Body() registerStudentDto: RegisterStudentDto, @GetUser() user: User): Promise<any> {
        return this.studentService.registerStudent(registerStudentDto, user);
    }
}
