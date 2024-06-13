import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeLoan } from './entities/home-loan.entity';
import { HomeLoanService } from './home-loan.service';
import { HomeLoanController } from './home-loan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HomeLoan])],
  controllers: [HomeLoanController],
  providers: [HomeLoanService],
  exports: [HomeLoanService],
})
export class HomeLoanModule {}
