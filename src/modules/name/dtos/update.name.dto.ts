import { PartialType } from '@nestjs/swagger';
import { CreateNameDto } from './create.name.dto';

export class UpdateNameDto extends PartialType(CreateNameDto) {}
