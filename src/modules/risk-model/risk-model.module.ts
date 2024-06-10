
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskModel } from './entities/risk-model.entity';
import { RiskModelService } from './risk-model.service';
import { RiskModelController } from './risk-model.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RiskModel])],
  controllers: [RiskModelController],
  providers: [RiskModelService],
  exports: [RiskModelService],
})
export class RiskModelModule {}
