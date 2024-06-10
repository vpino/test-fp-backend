import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsString, IsUUID, ValidateNested } from "class-validator"
import { CreateIndividualCustomerDto } from "src/modules/individual-customer/dtos/create.individual-customer.dto"

export class UpdateKycDto {
  @Type(() => CreateIndividualCustomerDto)
  @ApiProperty()
  @ValidateNested()
  kycUpdateSubmission: CreateIndividualCustomerDto;

  @ApiProperty()
  @IsString()
  submissionId: string;
}