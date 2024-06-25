import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class NameDTO {
  @ApiProperty({ description: 'Identifier of the name' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ description: 'First name of the consumer' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the consumer' })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}

class SocialNumDTO {
  @ApiProperty({ description: 'Identifier of the social number' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ description: 'Social number of the consumer' })
  @IsString()
  @IsNotEmpty()
  number: string;
}

class AddressDTO {
  @ApiProperty({ description: 'Identifier of the address' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ description: 'House number' })
  @IsString()
  @IsNotEmpty()
  houseNumber: string;

  @ApiProperty({ description: 'Street name' })
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @ApiProperty({ description: 'Street type' })
  @IsString()
  @IsNotEmpty()
  streetType: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'State' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'ZIP code' })
  @IsString()
  @IsNotEmpty()
  zip: string;
}

class ConsumersDTO {
  @ApiProperty({ description: 'Array of names' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NameDTO)
  name: NameDTO[];

  @ApiProperty({ description: 'Array of social numbers' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialNumDTO)
  socialNum: SocialNumDTO[];

  @ApiProperty({ description: 'Array of addresses' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  addresses: AddressDTO[];
}

class ModelFieldDTO {
  @ApiProperty({ description: 'Model field identifier' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ description: 'Model field values' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  modelField?: string[];
}

class EquifaxUSConsumerCreditReportDTO {
  @ApiProperty({ description: 'PDF combo indicator' })
  @IsString()
  @IsNotEmpty()
  pdfComboIndicator: string;

  @ApiProperty({ description: 'Member number' })
  @IsString()
  @IsNotEmpty()
  memberNumber: string;

  @ApiProperty({ description: 'Security code' })
  @IsString()
  @IsNotEmpty()
  securityCode: string;

  @ApiProperty({ description: 'Customer code' })
  @IsString()
  @IsNotEmpty()
  customerCode: string;

  @ApiProperty({ description: 'Multiple report indicator' })
  @IsString()
  @IsNotEmpty()
  multipleReportIndicator: string;

  @ApiProperty({ description: 'Models' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModelFieldDTO)
  models: ModelFieldDTO[];

  @ApiProperty({ description: 'ECOA Inquiry Type' })
  @IsString()
  @IsNotEmpty()
  ECOAInquiryType: string;
}

class CustomerConfigurationDTO {
  @ApiProperty({ description: 'Equifax US Consumer Credit Report' })
  @ValidateNested()
  @Type(() => EquifaxUSConsumerCreditReportDTO)
  equifaxUSConsumerCreditReport: EquifaxUSConsumerCreditReportDTO;
}

export class CreateReportRequestDTO {
  @ApiProperty({ description: 'Consumer information' })
  @ValidateNested()
  @Type(() => ConsumersDTO)
  consumers: ConsumersDTO;

  @ApiProperty({ description: 'Customer reference identifier' })
  @IsString()
  @IsNotEmpty()
  customerReferenceidentifier: string;

  @ApiProperty({ description: 'Customer configuration' })
  @ValidateNested()
  @Type(() => CustomerConfigurationDTO)
  customerConfiguration: CustomerConfigurationDTO;
}
