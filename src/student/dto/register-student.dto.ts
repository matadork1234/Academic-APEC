import { TypeDocument } from "src/type-document/entities/type-document.entity";
import { DetailStudent } from "../entities/detail-student.entity";
import { TExpeditionDocument } from "../enum/expedition-document.enum";
import { TGender } from "../enum/gender.enum";
import { TNationality } from "../enum/nationality.enum";

export class RegisterStudentDto {
  firstName: string;
  lastName: string;
  nationality: TNationality;
  expeditionDocument: TExpeditionDocument;
  documentIdentity: string;
  email: string;
  gender: TGender;
  birthday: Date;
  phoneNumber: string;
  photoUrl: string;
  typeDocument: TypeDocument;
  detailStudent: DetailStudent;
}