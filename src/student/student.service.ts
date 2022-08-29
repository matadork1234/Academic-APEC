import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync } from 'fs';
import { join } from 'path';
import { User } from 'src/auth/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { RegisterStudentDto } from './dto/register-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
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
                    'dstu': 'stu.detailStudent',
                    'loc': 'dstu.localization'
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
                    'dstu': 'stu.detailStudent',
                    'loc': 'dstu.localization'
                }
            }
        });

        if (!dataStudent) throw new NotFoundException(`Student not exists`);

        return dataStudent;
    }


    async registerStudent(registerStudentDto: RegisterStudentDto, user: User): Promise<any> {

        var { institution, jobPosition, description, localization, ...dataStudent } = registerStudentDto;

        var queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {

            var student = queryRunner.manager.create(Student, dataStudent);
            student.user = user;
            var studentRegister = await queryRunner.manager.save(Student, student);

            var detailStudent: Partial<DetailStudent> = {
                institution,
                jobPosition,
                description,
                localization,
                student: studentRegister
            }

            await queryRunner.manager.save(DetailStudent, detailStudent);

            await queryRunner.commitTransaction();
            await queryRunner.release();

            return student;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw new BadRequestException(error);
        }
    }

    async updateStudent(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
        var { institution, jobPosition, description, localization, ...dataStudent } = updateStudentDto;

        var queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            var studentData: Partial<Student> = {
                id,
                ...dataStudent,
            };

            var student = await queryRunner.manager.preload(Student, studentData);
            var studentSave = await queryRunner.manager.save(Student, student);

            var detailStudent = await queryRunner.manager.findOne(DetailStudent, {
                where: {
                    student: {
                        id: studentSave.id
                    }
                }
            });

            detailStudent.description = description;
            detailStudent.institution = institution;
            detailStudent.jobPosition = jobPosition;
            detailStudent.localization = localization;

            await queryRunner.manager.save(DetailStudent, detailStudent);

            await queryRunner.commitTransaction();
            await queryRunner.release();

            return studentSave;
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw new BadRequestException(error);
        }
    }

    async uploadPhotoStudent(id: string, file: Express.Multer.File): Promise<Student> {

        var urlPhotoImage = this.getStaticStudentImage(file.filename);
        
        var studentData = await this.studentRepository.findOne({
            where: {
                user: {
                    id: id
                }
            }
        });

        if (studentData) {
            studentData.photoUrl = urlPhotoImage;
            return await this.studentRepository.save(studentData);
        }
        
        throw new NotFoundException(`Student not exist`);

    }

    getStaticStudentImage(imageStudent: string): string {
        const path:string = `/static/students/${ imageStudent }`;

        return path;
    }

    getPathImageStudent(imageStudent: string): string {
        var url = join(__dirname, `../../static/students/${ imageStudent }`);

        if (!existsSync(url)) throw new BadRequestException(`Not found image with name ${ imageStudent }`)

        return url;
    }

}
