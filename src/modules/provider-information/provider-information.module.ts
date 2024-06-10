import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderInformationService } from './provider-information.service';
import { ProviderInformationController } from './provider-information.controller';
import { ProviderInformation } from './entities/provider-information.entity';

@Module({
  providers: [ProviderInformationService],
  controllers: [ProviderInformationController],
  imports: [TypeOrmModule.forFeature([ProviderInformation])],
  exports: [ProviderInformationService],
})
export class ProviderInformationModule {}
