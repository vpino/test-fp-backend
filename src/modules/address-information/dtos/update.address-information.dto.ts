import { PartialType } from '@nestjs/swagger';
import { CreateAddressInformationDto } from './create.address-information.dto';

export class UpdateAddressInformationDto extends PartialType(
  CreateAddressInformationDto,
) {}
