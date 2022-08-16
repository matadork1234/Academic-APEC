import { DetailStudent } from 'src/student/entities/detail-student.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TTypeLocation } from '../enum/type-location.enum';

@Entity('localizations')
export class Localization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 150, nullable: false })
  name: string;

  @Column('enum', {
    name: 'type_location',
    enum: TTypeLocation,
    nullable: false,
    default: TTypeLocation.COUNTRY,
  })
  typeLocation: TTypeLocation;

  @Column('integer', { default: 0, nullable: false })
  order: number;

  @Column('numeric', { default: 0, nullable: true, precision: 8 })
  latitude: number;

  @Column('numeric', { default: 0, nullable: true, precision: 8 })
  longitude: number;

  @Column('bool', { name: 'is_active', default: true, nullable: false })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Localization, (loc) => loc.localizationParent)
  localizations: Localization[];

  @ManyToOne(() => Localization, (loc) => loc.localizations)
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  localizationParent?: Localization;

  @OneToMany(() => DetailStudent, (dStudent) => dStudent.localization)
  detailStudents: DetailStudent[];
}
