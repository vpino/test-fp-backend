import { PartialType } from '@nestjs/swagger';
import { CreatePublicRecordDto } from './create.public-record.dto';

export class UpdatePublicRecordDto extends PartialType(CreatePublicRecordDto) {}
