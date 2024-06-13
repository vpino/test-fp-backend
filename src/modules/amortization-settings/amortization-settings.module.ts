import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmortizationSettings } from './entities/amortization-settings.entity';
import { AmortizationSettingsService } from './amortization-settings.service';
import { AmortizationSettingsController } from './amortization-settings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AmortizationSettings])],
  controllers: [AmortizationSettingsController],
  providers: [AmortizationSettingsService],
  exports: [AmortizationSettingsService],
})
export class AmortizationSettingsModule {}
