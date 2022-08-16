import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";

import { Localization } from "src/localization/entities/localization.entity";

@Entity('detail_students')
export class DetailStudent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 150, nullable: false})
    institution: string;

    @Column('varchar', { name: 'job_position', length: 150, nullable: false })
    jobPosition: string;

    @Column('varchar', { length: 1500, nullable: true})
    description: string;

    @OneToOne(() => Student, (student) => student.detailStudent)
    @JoinColumn({name: 'student_id', referencedColumnName: 'id'})
    student: Student;

    @ManyToOne(() => Localization, (loc) => loc.detailStudents )
    @JoinColumn({ name: 'localization_id', referencedColumnName: 'id'})
    localization: Localization;
    
}