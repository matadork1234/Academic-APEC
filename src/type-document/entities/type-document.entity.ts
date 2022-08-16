import { Student } from "src/student/entities/student.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('type_documents')
export class TypeDocument {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 50, nullable: false})
    description: string;

    @Column('bool', { default: true, nullable: false})
    isActive: boolean;

    @OneToMany(() => Student, (student) => student.typeDocument)
    students: Student[];
}