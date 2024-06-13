import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BridgeLoan } from './entities/bridge-loan.entity';
import { BridgeLoanService } from './bridge-loan.service';
import { BridgeLoanController } from './bridge-loan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BridgeLoan])],
  controllers: [BridgeLoanController],
  providers: [BridgeLoanService],
  exports: [BridgeLoanService],
})
export class BridgeLoanModule {}
