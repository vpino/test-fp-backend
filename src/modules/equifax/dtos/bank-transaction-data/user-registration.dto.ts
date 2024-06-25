import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

class AddressDto {
  @ApiProperty({ example: '1907', required: false })
  @IsString()
  @IsOptional()
  apartmentNumber: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  streetName: string;

  @ApiProperty({ example: '1907 Marsh Trail Cir' })
  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  addressLine2: string;

  @ApiProperty({ example: 'Atlanta' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'GA' })
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({ example: '30328' })
  @IsString()
  @Matches(/^\d{5}$/, { message: 'ZIP must be a 5-digit string' })
  zip: string;

  @ApiProperty({ example: 'US' })
  @IsString()
  @Length(2, 2)
  country: string;
}

class ContactDetailDto {
  @ApiProperty({ example: 'Mobile' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  @Matches(/^\d{10}$/, { message: 'Contact number must be a 10-digit string' })
  value: string;
}

class BorrowerDto {
  @ApiProperty({ example: 'Vardhana' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'N', required: false })
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty({ example: 'Garapati' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '623456789' })
  @IsString()
  @Matches(/^\d{9}$/, { message: 'SSN must be a 9-digit string' })
  ssn: string;

  @ApiProperty({ example: 'vardhana.garapati@equifax.com' })
  @IsEmail()
  emailAddress: string;

  @ApiProperty({ example: 'Mr.', required: false })
  @IsString()
  @IsOptional()
  suffix: string;

  @ApiProperty({ example: '1999-02-01' })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date of Birth must be in YYYY-MM-DD format',
  })
  dateOfBirth: string;

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty({ type: [ContactDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContactDetailDto)
  contactDetail: ContactDetailDto[];
}

class LenderDto {
  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  submittingPartyname: string;

  @ApiProperty({ example: 'Wells Fargo' })
  @IsString()
  @IsNotEmpty()
  requestingPartyName: string;

  @ApiProperty({ example: 'Direct' })
  @IsString()
  @IsNotEmpty()
  lenderType: string;

  @ApiProperty({ example: '999TCS7' })
  @IsString()
  @IsNotEmpty()
  loginAccountIdentifier: string;

  @ApiProperty({ example: '30' })
  @IsString()
  @IsNotEmpty()
  refreshPeriod: string;

  @ApiProperty({ example: 'Y' })
  @IsString()
  triggerEmail: string;

  @ApiProperty({ example: '323433' })
  @IsString()
  @IsNotEmpty()
  loanNumber: string;

  @ApiProperty({ example: 'Garapati,Vardhana' })
  @IsString()
  @IsNotEmpty()
  endUserName: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  lenderEmails: string[];
}

class ProductDto {
  @ApiProperty({ example: 'VOT' })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ example: 'PDF' })
  @IsString()
  @IsNotEmpty()
  reportType: string;

  @ApiProperty({ example: 'Submit' })
  @IsString()
  @IsNotEmpty()
  actionType: string;

  @ApiProperty({ example: '60' })
  @IsString()
  @IsNotEmpty()
  numberOfDays: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  transactionId: string;

  @ApiProperty({
    example:
      'http://internal-btd-ecs-elb-1-519465492.us-east-1.elb.amazonaws.com:8080/btd/callBackTest',
  })
  @IsUrl()
  @IsNotEmpty()
  callbackURL: string;
}

export class UserRegistrationDTO {
  @ApiProperty({ type: BorrowerDto })
  @ValidateNested()
  @Type(() => BorrowerDto)
  borrower: BorrowerDto;

  @ApiProperty({ type: LenderDto })
  @ValidateNested()
  @Type(() => LenderDto)
  lender: LenderDto;

  @ApiProperty({ type: ProductDto })
  @ValidateNested()
  @Type(() => ProductDto)
  product: ProductDto;

  @ApiProperty({ example: 'N' })
  @IsString()
  autoRegister: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  applicationType: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  applicationSubType: string;
}
