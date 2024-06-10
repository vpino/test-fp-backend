import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderRecordService } from './header-record.service';
import { HeaderRecord } from './entities/header-record.entity';
import { HeaderRecordController } from './header-record.controller';

@Module({
  providers: [HeaderRecordService],
  controllers: [HeaderRecordController],
  imports: [
    TypeOrmModule.forFeature([HeaderRecord]),
  ],
  exports: [HeaderRecordService]
})
export class HeaderRecordModule {}
