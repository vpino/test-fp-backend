import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditInformationService } from './credit-information.service';
import { CreditInformation } from './entities/credit-information.entity';
import { CreditInformationController } from './credit-information.controller';

@Module({
  providers: [CreditInformationService],
  controllers: [CreditInformationController],
  imports: [
    TypeOrmModule.forFeature([CreditInformation])
  ],
  exports: [CreditInformationService],

})
export class CreditInformationModule {}
