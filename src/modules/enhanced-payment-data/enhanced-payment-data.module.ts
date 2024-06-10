
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnhancedPaymentData } from './entities/enhanced-payment-data.entity';
import { EnhancedPaymentDataService } from './enhanced-payment-data.service';
import { EnhancedPaymentDataController } from './enhanced-payment-data.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EnhancedPaymentData])],
  controllers: [EnhancedPaymentDataController],
  providers: [EnhancedPaymentDataService],
  exports: [EnhancedPaymentDataService],
})
export class EnhancedPaymentDataModule {}
