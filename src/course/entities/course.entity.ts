import { TModalityCourse } from "../enum/modality-course.enum";
import { TTypeCourse } from "../enum/type-course.enum";

export class Course {
    id: string;
    codeCourse: string;
    titleCourse: string;
    descriptionCourse: string;
    dateInitialCourse: Date;
    dateFinalCourse: Date;
    dateInitialRegistration: Date;
    dateFinalRegistration: Date;
    modalityCourse: TModalityCourse;
    typeCourse: TTypeCourse;
    academicHours: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}