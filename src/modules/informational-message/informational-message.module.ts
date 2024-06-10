
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationalMessage } from './entities/informational-message.entity';
import { InformationalMessageService } from './informational-message.service';
import { InformationalMessageController } from './informational-message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InformationalMessage])],
  controllers: [InformationalMessageController],
  providers: [InformationalMessageService],
  exports: [InformationalMessageService]
})
export class InformationalMessageModule {}
