
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tradeline } from './entities/tradeline.entity';
import { TradelineService } from './tradeline.service';
import { TradelineController } from './tradeline.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tradeline])],
  controllers: [TradelineController],
  providers: [TradelineService],
  exports: [TradelineService],
})
export class TradelineModule {}
