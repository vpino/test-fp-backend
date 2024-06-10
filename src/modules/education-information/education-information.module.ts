import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationInformationService } from './education-information.service';
import { EducationInformation } from './entities/education-information.entity';
import { EducationInformationController } from './education-information.controller';

@Module({
  providers: [EducationInformationService],
  controllers: [EducationInformationController],
  imports: [
    TypeOrmModule.forFeature([EducationInformation])
  ],
  exports: [EducationInformationService],

})
export class EducationInformationModule {}
