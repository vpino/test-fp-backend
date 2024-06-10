import { PartialType } from '@nestjs/swagger';
import { CreateHeaderRecordDto } from './create.header-record.dto';

export class UpdateHeaderRecordDto extends PartialType(CreateHeaderRecordDto) {}
