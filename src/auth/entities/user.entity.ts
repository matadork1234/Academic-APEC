import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Student } from "src/student/entities/student.entity";
import { Course } from "src/course/entities/course.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { unique: true, length: 150, nullable: false })
    email: string;

    @Column('varchar', { name: 'document_identity', length: 20, unique: true, nullable: false })
    documentIdentity: string;

    @Column('varchar', { length: 150, nullable: false })
    password: string;

    @Column('varchar',{ name: 'hash_reset_password', length: 255, nullable: true })
    hashResetPassword: string;
    
    @Column('simple-array', { array: true, default: ['user'], nullable: false })
    roles: string[];

    @Column('bool', { default: true, nullable: false })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @CreateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @OneToOne(() => Student, (student) => student.user)
    student: Student;

    @OneToMany(() => Course, cour => cour.user)
    Course: Course[];
}