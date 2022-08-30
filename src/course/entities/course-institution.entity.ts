import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity('course_institutions')
export class CourseInstitution {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 150, nullable: false })
    institution: string;

    @Column('date', { name: 'date_initial_registration', nullable: false})
    dateInitialRegistration: Date;

    @Column('date', { name: 'date_final_registration', nullable: false})
    dateFinalRegistration: Date;

    @Column('timestamp', { name: 'date_initial_institution', nullable: false})
    dateInitialInstitution: Date;

    @Column('integer', { name: 'number_participants', nullable: false, default: 0})
    numberParticipants: number;

    @Column('timestamp', { name: 'date_final_institution', nullable: false})
    dateFinalInstitution: Date;

    @Column('bool', { name: 'is_active', default: false, nullable: false })
    isActive: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

    @ManyToMany(() => Course, cour => cour.courseInstitutions)
    @JoinColumn({ name: 'course_id', referencedColumnName: 'id' })
    course: Course;
}