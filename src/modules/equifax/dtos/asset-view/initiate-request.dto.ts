import {
  IsString,
  IsEmail,
  IsBoolean,
  IsObject,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AddressDTO {
  @ApiProperty({ description: 'Primary address line' })
  @IsString()
  @IsNotEmpty()
  address1: string;

  @ApiProperty({ description: 'City of the address' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'State of the address' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'ZIP code of the address' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ description: 'Country of the address' })
  @IsString()
  @IsNotEmpty()
  country: string;
}

class ConsumerDTO {
  @ApiProperty({ description: 'Consumer identifier' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ description: 'Consumer first name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Consumer last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Consumer email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Consumer date of birth' })
  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty({ description: 'Consumer address', type: AddressDTO })
  @IsObject()
  @Type(() => AddressDTO)
  address: AddressDTO;
}

class ResellerDTO {
  @ApiProperty({ description: 'Is the reseller self?' })
  @IsBoolean()
  self: boolean;

  @ApiProperty({ description: 'End user organization ID' })
  @IsString()
  @IsNotEmpty()
  endUserOrganizationId: string;

  @ApiProperty({ description: 'End user name' })
  @IsString()
  @IsNotEmpty()
  endUserName: string;
}

class ConnectorDTO {
  @ApiProperty({ description: 'Platform of the connector' })
  @IsString()
  @IsNotEmpty()
  platform: string;

  @ApiProperty({ description: 'Intermediary of the connector' })
  @IsString()
  @IsNotEmpty()
  intermediary: string;

  @ApiProperty({ description: 'End user of the connector' })
  @IsString()
  @IsNotEmpty()
  endUser: string;
}

export class InitiateRequestDTO {
  @ApiProperty({ description: 'Permissible purpose' })
  @IsString()
  @IsNotEmpty()
  permissiblePurpose: string;

  @ApiProperty({ description: 'Loan number' })
  @IsString()
  @IsNotEmpty()
  loanNumber: string;

  @ApiProperty({ description: 'Monitoring duration' })
  @IsString()
  @IsNotEmpty()
  monitoringDuration: string;

  @ApiProperty({ description: 'CC email' })
  @IsEmail()
  @IsNotEmpty()
  ccEmail: string;

  @ApiProperty({ description: 'Order start date' })
  @IsDateString()
  @IsNotEmpty()
  orderStartDate: string;

  @ApiProperty({ description: 'Order end date' })
  @IsDateString()
  @IsNotEmpty()
  orderEndDate: string;

  @ApiProperty({ description: 'Consumer details', type: ConsumerDTO })
  @IsObject()
  @Type(() => ConsumerDTO)
  consumer: ConsumerDTO;

  @ApiProperty({ description: 'Reseller details', type: ResellerDTO })
  @IsObject()
  @Type(() => ResellerDTO)
  reseller: ResellerDTO;

  @ApiProperty({ description: 'Connector details', type: ConnectorDTO })
  @IsObject()
  @Type(() => ConnectorDTO)
  connector: ConnectorDTO;
}
