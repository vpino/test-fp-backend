import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class NameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  suffix: string;
}

class SocialNumDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty()
  @IsString()
  @Length(9, 9)
  number: string;
}

class AddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  houseNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  streetType: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  apartmentNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty()
  @IsString()
  @Length(5, 5)
  zip: string;
}

class ConsumersDto {
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

  @ApiProperty()
  @IsString()
  @Length(8, 8)
  dateOfBirth: string;

  @ApiProperty({ type: [AddressDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];
}

class ModelDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  modelField: string;
}

class EquifaxUSConsumerCreditReportDto {
  @ApiProperty()
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

export class CreateConsumerDto {
  @ApiProperty({ type: ConsumersDto })
  @ValidateNested()
  @Type(() => ConsumersDto)
  consumers: ConsumersDto;

  @ApiProperty({ type: [ModelDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModelDto)
  multidatamodels: ModelDto[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  customerReferenceIdentifier: string;

  @ApiProperty({ type: CustomerConfigurationDto })
  @ValidateNested()
  @Type(() => CustomerConfigurationDto)
  customerConfiguration: CustomerConfigurationDto;
}
