import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsObject,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class IdentifierDto {
  @ApiProperty({ description: 'Identifier type', example: 'current' })
  @IsString()
  identifier: string;
}

class NameDto extends IdentifierDto {
  @ApiProperty({ description: 'First name of the consumer', example: 'LJBKFJ' })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the consumer',
    example: 'KHJGUFJM',
  })
  @IsString()
  lastName: string;
}

class SocialNumDto extends IdentifierDto {
  @ApiProperty({
    description: 'Social number of the consumer',
    example: '666123456',
  })
  @IsString()
  number: string;
}

class AddressDto extends IdentifierDto {
  @ApiProperty({ description: 'House number', example: '123' })
  @IsString()
  houseNumber: string;

  @ApiProperty({ description: 'Street name', example: 'POIBHHFJD' })
  @IsString()
  streetName: string;

  @ApiProperty({ description: 'Street type', example: 'ST' })
  @IsString()
  streetType: string;

  @ApiProperty({ description: 'City name', example: 'ATLANTA' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'State abbreviation', example: 'GA' })
  @IsString()
  state: string;

  @ApiProperty({ description: 'ZIP code', example: '30374' })
  @IsString()
  zip: string;
}

class ConsumersDto {
  @ApiProperty({ type: [NameDto], description: 'List of names' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NameDto)
  name: NameDto[];

  @ApiProperty({ type: [SocialNumDto], description: 'List of social numbers' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialNumDto)
  socialNum: SocialNumDto[];

  @ApiProperty({ type: [AddressDto], description: 'List of addresses' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];
}

class ModelDto extends IdentifierDto {
  @ApiPropertyOptional({
    type: [String],
    description: 'List of model fields',
    example: ['3', 'GA'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  modelField?: string[];
}

class EquifaxUSConsumerCreditReportDto {
  @ApiProperty({ description: 'PDF combo indicator', example: 'Y' })
  @IsString()
  pdfComboIndicator: string;

  @ApiProperty({ description: 'Member number', example: '999XX12345' })
  @IsString()
  memberNumber: string;

  @ApiProperty({ description: 'Security code', example: '@U2' })
  @IsString()
  securityCode: string;

  @ApiProperty({ description: 'Customer code', example: 'IAPI' })
  @IsString()
  customerCode: string;

  @ApiProperty({ description: 'Multiple report indicator', example: '1' })
  @IsString()
  multipleReportIndicator: string;

  @ApiProperty({ type: [ModelDto], description: 'List of models' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModelDto)
  models: ModelDto[];

  @ApiProperty({ description: 'ECOA inquiry type', example: 'Individual' })
  @IsString()
  ECOAInquiryType: string;
}

class EquifaxUSConsumerTwnRequestDto {
  @ApiProperty({ description: 'User ID', example: 'twnUser@1234' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'User password', example: 'pass123' })
  @IsString()
  userPassword: string;

  @ApiProperty({ description: 'Permissible purpose code', example: 'PPASSESS' })
  @IsString()
  permissiblePurposeCode: string;

  @ApiProperty({ description: 'Template name', example: 'Full VOI' })
  @IsString()
  templateName: string;
}

class AuthenticationDto {
  @ApiProperty({ description: 'License key', example: 'licenseKey123' })
  @IsString()
  licensekey: string;

  @ApiProperty({ description: 'Password', example: 'passwd123' })
  @IsString()
  password: string;
}

class EquifaxUSConsumerDataxInquiryRequestDto {
  @ApiProperty({ description: 'Authentication details' })
  @IsObject()
  @ValidateNested()
  @Type(() => AuthenticationDto)
  authentication: AuthenticationDto;
}

class CustomerConfigurationDto {
  @ApiProperty({ description: 'Equifax US Consumer Credit Report details' })
  @IsObject()
  @ValidateNested()
  @Type(() => EquifaxUSConsumerCreditReportDto)
  equifaxUSConsumerCreditReport: EquifaxUSConsumerCreditReportDto;

  @ApiProperty({ description: 'Equifax US Consumer TWN Request details' })
  @IsObject()
  @ValidateNested()
  @Type(() => EquifaxUSConsumerTwnRequestDto)
  equifaxUSConsumerTwnRequest: EquifaxUSConsumerTwnRequestDto;

  @ApiProperty({
    description: 'Equifax US Consumer Datax Inquiry Request details',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => EquifaxUSConsumerDataxInquiryRequestDto)
  equifaxUSConsumerDataxInquiryRequest: EquifaxUSConsumerDataxInquiryRequestDto;
}

export class ConsumerCreditReportRequestDTO {
  @ApiProperty({ description: 'Consumers information' })
  @IsObject()
  @ValidateNested()
  @Type(() => ConsumersDto)
  consumers: ConsumersDto;

  @ApiProperty({
    description: 'Customer reference identifier',
    example: '2C800002-DOR7',
  })
  @IsString()
  customerReferenceidentifier: string;

  @ApiProperty({ description: 'Customer configuration details' })
  @IsObject()
  @ValidateNested()
  @Type(() => CustomerConfigurationDto)
  customerConfiguration: CustomerConfigurationDto;
}
