import { PartialType } from '@nestjs/swagger';
import { CreateHomeLoanDto } from './create.home-loan.dto';

export class UpdateHomeLoanDto extends PartialType(CreateHomeLoanDto) {}
