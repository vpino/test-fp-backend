import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreFactors } from './entities/score-factors.entity';
import { ScoreFactorsService } from './score-factors.service';
import { ScoreFactorsController } from './score-factors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ScoreFactors])],
  controllers: [ScoreFactorsController],
  providers: [ScoreFactorsService],
  exports: [ScoreFactorsService],
})
export class ScoreFactorsModule {}
