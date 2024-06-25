import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

class NameDto {
  @ApiProperty({ example: 'current' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ example: 'TESTFN' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'TESTLN' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  suffix: string;
}

class SocialNumDto {
  @ApiProperty({ example: 'current' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ example: '000000000' })
  @IsString()
  @Matches(/^\d{9}$/, { message: 'Number must be a 9-digit string' })
  number: string;
}

class AddressDto {
  @ApiProperty({ example: 'current' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ example: '0000' })
  @IsString()
  @IsNotEmpty()
  houseNumber: string;

  @ApiProperty({ example: 'X XXXX' })
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @ApiProperty({ example: 'XX' })
  @IsString()
  @IsNotEmpty()
  streetType: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  apartmentNumber: string;

  @ApiProperty({ example: 'New CITY' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'AB' })
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({ example: '00000' })
  @IsString()
  @Matches(/^\d{5}$/, { message: 'ZIP must be a 5-digit string' })
  zip: string;
}

class ConsumerDto {
  @ApiProperty({ type: [NameDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NameDto)
  name: NameDto[];

  @ApiProperty({ type: [SocialNumDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialNumDto)
  socialNum: SocialNumDto[];

  @ApiProperty({ example: '10021962' })
  @IsString()
  @Matches(/^\d{8}$/, { message: 'Date of Birth must be in MMDDYYYY format' })
  dateOfBirth: string;

  @ApiProperty({ type: [AddressDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];
}

class ModelDto {
  @ApiProperty({ example: '05234' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ example: 'modelField' })
  @IsString()
  @IsNotEmpty()
  modelField: string;
}

class EquifaxUSConsumerCreditReportDto {
  @ApiProperty({ example: 'true' })
  @IsBooleanString()
  codeDescriptionRequired: string;

  @ApiProperty({ type: [ModelDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModelDto)
  models: ModelDto[];
}

class CustomerConfigurationDto {
  @ApiProperty({ type: EquifaxUSConsumerCreditReportDto })
  @ValidateNested()
  @Type(() => EquifaxUSConsumerCreditReportDto)
  equifaxUSConsumerCreditReport: EquifaxUSConsumerCreditReportDto;
}

export class CreditReportRequestAcroOnly {
  @ApiProperty({ type: ConsumerDto })
  @ValidateNested()
  @Type(() => ConsumerDto)
  consumers: ConsumerDto;

  @ApiProperty({ example: 'JSON-T2' })
  @IsString()
  @IsNotEmpty()
  customerReferenceIdentifier: string;

  @ApiProperty({ type: CustomerConfigurationDto })
  @ValidateNested()
  @Type(() => CustomerConfigurationDto)
  customerConfiguration: CustomerConfigurationDto;
}
