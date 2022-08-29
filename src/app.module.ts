import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './common/config/database.config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from './common/constant/constant';
import { StudentModule } from './student/student.module';
import { TypeDocumentModule } from './type-document/type-document.module';
import { LocalizationModule } from './localization/localization.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => 
        config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG)
    }),
    CommonModule,
    AuthModule,
    StudentModule,
    TypeDocumentModule,
    LocalizationModule,
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
