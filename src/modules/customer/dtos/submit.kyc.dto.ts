import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';
import { CreateIndividualCustomerDto } from 'src/modules/individual-customer/dtos/create.individual-customer.dto';

export class SubmitKycDto {
  @Type(() => CreateIndividualCustomerDto)
  @ApiProperty()
  @ValidateNested()
  kycSubmission: CreateIndividualCustomerDto;
}
