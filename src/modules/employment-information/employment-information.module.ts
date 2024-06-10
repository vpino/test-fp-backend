import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmploymentInformation } from './entities/employment-information.entity';
import { EmploymentInformationService } from './employment-information.service';
import { EmploymentInformationController } from './employment-information.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmploymentInformation])],
  controllers: [EmploymentInformationController],
  providers: [EmploymentInformationService],
  exports: [EmploymentInformationService],
})
export class EmploymentInformationModule {}
