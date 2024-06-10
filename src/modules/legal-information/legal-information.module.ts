import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalInformationService } from './legal-information.service';
import { LegalInformation } from './entities/legal-information.entity';
import { LegalInformationController } from './legal-information.controller';

@Module({
  providers: [LegalInformationService],
  controllers: [LegalInformationController],
  imports: [TypeOrmModule.forFeature([LegalInformation])],
  exports: [LegalInformationService],
})
export class LegalInformationModule {}
