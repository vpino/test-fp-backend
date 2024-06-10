import { PartialType } from '@nestjs/swagger';
import { CreateEmploymentInformationDto } from './create.employment-information.dto';

export class UpdateEmploymentInformationDto extends PartialType(CreateEmploymentInformationDto) {}