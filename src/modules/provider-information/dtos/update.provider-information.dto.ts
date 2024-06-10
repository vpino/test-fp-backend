import { PartialType } from '@nestjs/swagger';
import { CreateProviderInformationDto } from './create.provider-information.dto';

export class UpdateProviderInformationDto extends PartialType(CreateProviderInformationDto) {}
