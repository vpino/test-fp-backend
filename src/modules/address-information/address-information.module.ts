import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressInformationService } from './address-information.service';
import { AddressInformation } from './entities/address-information.entity';
import { AddressInformationController } from './address-information.controller';

@Module({
  providers: [AddressInformationService],
  controllers: [AddressInformationController],
  imports: [TypeOrmModule.forFeature([AddressInformation])],
  exports: [AddressInformationService],
})
export class AddressInformationModule {}
