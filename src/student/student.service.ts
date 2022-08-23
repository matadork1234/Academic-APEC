import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { RegisterStudentDto } from './dto/register-student.dto';
import { DetailStudent } from './entities/detail-student.entity';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {

    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,

        @InjectRepository(DetailStudent)
        private readonly detailStudentRepository: Repository<DetailStudent>,
        
        private readonly dataSource: DataSource
    ){}

    async getAllStudents(): Promise<Student[]> {
        var dataStudent = await this.studentRepository.find({
            join: {
                alias: 'stu',
                leftJoinAndSelect: {
                    'dst': 'stu.detailStudent'
                }
            }
        });

        return dataStudent;
    }


    async getStudentById(id: string): Promise<Student> {
        var dataStudent = await this.studentRepository.findOne({
            where: {
                id
            },
            join: {
                alias: 'stu',
                leftJoinAndSelect: {
                    'dstu': 'stu.detailStudent'
                }
            }
        });

        if (!dataStudent) throw new NotFoundException(`Student not exists`);

        return dataStudent;
    }


    async registerStudent(registerStudentDto: RegisterStudentDto, user: User): Promise<any> {

        var { detailStudent, ...dataStudent } = registerStudentDto;

        var queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            var student = queryRunner.manager.create(Student, dataStudent);
            student.user = user;
            await queryRunner.manager.save(student);

            await queryRunner.manager.save(detailStudent);

            await queryRunner.commitTransaction();
            await queryRunner.release();

            return student;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw new BadRequestException(error);
        }
    }

}
