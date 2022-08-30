import { User } from "src/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TModalityCourse } from "../enum/modality-course.enum";
import { TTypeCourse } from "../enum/type-course.enum";
import { TTypeParticipants } from "../enum/type-participants.enum";
import { CourseInstitution } from "./course-institution.entity";

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column('varchar', { name:'code_course', length: 25, nullable: false, unique: true })
    codeCourse: string;

    @Column('varchar', { name:'title_course' ,length: 255, nullable: false })
    titleCourse: string;

    @Column('varchar', { name:'description_course', length: 2500, nullable: true  })
    descriptionCourse: string;

    @Column('date', { name: 'date_initial_course', nullable: false })
    dateInitialCourse: Date;

    @Column('date', { name: 'date_final_course', nullable: false })
    dateFinalCourse: Date;

    @Column('timestamp', { name: 'date_initial_registration', nullable: false })
    dateInitialRegistration: Date;

    @Column('timestamp', { name: 'date_final_registration', nullable: false })
    dateFinalRegistration: Date;

    @Column('enum', { name: 'modality_course', enum: TModalityCourse, nullable: false, default: TModalityCourse.PRESENTIAL })
    modalityCourse: TModalityCourse;

    @Column('enum', { name: 'type_course', enum: TTypeCourse, nullable: false, default: TTypeCourse.NONE})
    typeCourse: TTypeCourse;

    @Column('integer', { name: 'total_participants', default: 0})
    totalParticipants: number;

    @Column('enum', { name: 'type_partipants', enum: TTypeParticipants, nullable: false, default: TTypeParticipants.NONE})
    typeParticipants: TTypeParticipants;

    @Column('float', { name: 'academic_hours', default: 0, nullable: false })
    academicHours: number;

    @Column('varchar', { name: 'image_course', nullable: true, length: 255 })
    imageCourse: string;

    @Column('bool', { name: 'is_active', default: false, nullable: false })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => CourseInstitution, (courseInst) => courseInst.course)
    courseInstitutions: CourseInstitution[];

    @ManyToOne(() => User, u => u.Course)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
}