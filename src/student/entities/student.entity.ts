import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { TExpeditionDocument } from '../enum/expedition-document.enum';
import { TGender } from '../enum/gender.enum';
import { TNationality } from '../enum/nationality.enum';
import { DetailStudent } from './detail-student.entity';
import { TypeDocument } from '../../type-document/entities/type-document.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 75, nullable: false })
  firstName: string;

  @Column('varchar', { length: 75, nullable: false })
  lastName: string;

  @Column('enum', {
    enum: TNationality,
    nullable: false,
    default: TNationality.NONE,
  })
  nationality: TNationality;

  @Column('enum', {
    name: 'expedition_document',
    enum: TExpeditionDocument,
    default: TExpeditionDocument.OTHER,
    nullable: false,
  })
  expeditionDocument: TExpeditionDocument;

  @Column('varchar', {
    length: 25,
    name: 'document_identity',
    nullable: false,
    unique: true
  })
  documentIdentity: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  email: string;

  @Column('enum', {
    enum: TGender,
    nullable: false,
    default: TGender.NONE
  })
  gender: TGender;

  @Column('date', {
    nullable: false,
  })
  birthday: Date;

  @Column('varchar', {
    length: 25,
    nullable: true,
    name: 'phone_number'
  })
  phoneNumber: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
    name: 'photo_url'
  })
  photoUrl: string;

  @Column('bool', {
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
  updatedAt: Date;

  @ManyToOne(() => TypeDocument, (tdocument) => tdocument.students)
  @JoinColumn({ name: 'type_document_id', referencedColumnName: 'id' })
  typeDocument: TypeDocument;

  @OneToOne(() => DetailStudent, (dstudent) => dstudent.student, { eager: true })
  detailStudent: DetailStudent;
  
  @OneToOne(() => User, (user) =>user.student)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
  user: User;
}
