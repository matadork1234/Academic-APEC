import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailStudent } from './entities/detail-student.entity';
import { Student } from './entities/student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      DetailStudent
    ])
  ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
