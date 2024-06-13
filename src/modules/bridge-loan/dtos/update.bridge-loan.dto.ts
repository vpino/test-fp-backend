import { PartialType } from '@nestjs/swagger';
import { CreateBridgeLoanDto } from './create.bridge-loan.dto';

export class UpdateBridgeLoanDto extends PartialType(CreateBridgeLoanDto) {}
