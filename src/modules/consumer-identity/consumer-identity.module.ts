
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumerIdentity } from './entities/consumer-identity.entity';
import { ConsumerIdentityService } from './consumer-identity.service';
import { ConsumerIdentityController } from './consumer-identity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumerIdentity])],
  controllers: [ConsumerIdentityController],
  providers: [ConsumerIdentityService],
  exports: [ConsumerIdentityService],
})
export class ConsumerIdentityModule {}
