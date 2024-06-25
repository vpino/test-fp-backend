import { PartialType } from '@nestjs/swagger';
import { CreateEquifaxDto } from './create.equifax.dto';

export class UpdateEquifaxDto extends PartialType(CreateEquifaxDto) {}
