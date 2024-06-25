import { IsString, IsBoolean, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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

export class RefreshRequestDTO {
  @ApiProperty({ description: 'Reference number' })
  @IsString()
  @IsNotEmpty()
  referenceNumber: string;

  @ApiProperty({ description: 'Last 4 digits of consumer identifier' })
  @IsString()
  @IsNotEmpty()
  consumerIdentifierLast4: string;

  @ApiProperty({ description: 'Reseller details', type: ResellerDTO })
  @IsObject()
  @Type(() => ResellerDTO)
  reseller: ResellerDTO;

  @ApiProperty({ description: 'Connector details', type: ConnectorDTO })
  @IsObject()
  @Type(() => ConnectorDTO)
  connector: ConnectorDTO;
}
