import { PartialType } from '@nestjs/swagger';
import { CreateOfacDto } from './create.ofac.dto';

export class UpdateOfacDto extends PartialType(CreateOfacDto) {}