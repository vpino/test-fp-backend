import { PartialType } from '@nestjs/swagger';
import { LoanDetailsMounthlyDto } from 'src/modules/personal-loan/dtos/loan-details-mounthly.dto';

export class UpdateHomeLoanMounthlyDetailsDto extends PartialType(
  LoanDetailsMounthlyDto,
) {}
