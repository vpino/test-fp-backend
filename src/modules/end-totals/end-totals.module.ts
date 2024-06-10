
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndTotals } from './entities/end-totals.entity';
import { EndTotalsService } from './end-totals.service';
import { EndTotalsController } from './end-totals.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EndTotals])],
  controllers: [EndTotalsController],
  providers: [EndTotalsService],
  exports: [EndTotalsService],
})
export class EndTotalsModule {}
