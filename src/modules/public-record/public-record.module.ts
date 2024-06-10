import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicRecord } from './entities/public-record.entity';
import { PublicRecordService } from './public-record.service';
import { PublicRecordController } from './public-record.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PublicRecord])],
  controllers: [PublicRecordController],
  providers: [PublicRecordService],
  exports: [PublicRecordService],
})
export class PublicRecordModule {}
