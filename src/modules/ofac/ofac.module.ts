
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ofac } from './entities/ofac.entity';
import { OfacService } from './ofac.service';
import { OfacController } from './ofac.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ofac])],
  controllers: [OfacController],
  providers: [OfacService],
  exports: [OfacService],
})
export class OfacModule {}
