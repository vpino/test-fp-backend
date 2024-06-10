import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MortgageInformationService } from './mortgage-information.service';
import { MortgageInformationController } from './mortgage-information.controller';
import { MortgageInformation } from './entities/mortgage-information.entity';

@Module({
  providers: [MortgageInformationService],
  controllers: [MortgageInformationController],
  imports: [TypeOrmModule.forFeature([MortgageInformation])],
  exports: [MortgageInformationService],
})
export class MortgageInformationModule {}
