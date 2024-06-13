import { PartialType } from '@nestjs/swagger';
import { CreatePersonalLoanDto } from './create.personal-loan.dto';

export class UpdatePersonalLoanDto extends PartialType(CreatePersonalLoanDto) {}