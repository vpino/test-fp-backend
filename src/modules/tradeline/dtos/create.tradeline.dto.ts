import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { EnhancedPaymentData } from 'src/modules/enhanced-payment-data/entities/enhanced-payment-data.entity';

export class CreateTradelineDto {
  @ApiProperty()
  @IsString()
  accountNumber: string;

  @ApiProperty()
  @IsString()
  accountType: string;

  @ApiProperty()
  @IsString()
  amount1: string;

  @ApiProperty()
  @IsString()
  amount1Qualifier: string;

  @ApiProperty()
  @IsString()
  balanceDate: string;

  @ApiProperty()
  @IsString()
  delinquencies30Days: string;

  @ApiProperty()
  @IsString()
  delinquencies60Days: string;

  @ApiProperty()
  @IsString()
  delinquencies90to180Days: string;

  @ApiProperty()
  @IsString()
  derogCounter: string;

  @ApiProperty()
  @IsString()
  ecoa: string;

  @ApiProperty({ type: [EnhancedPaymentData] })
  @ValidateNested({ each: true })
  @Type(() => EnhancedPaymentData)
  enhancedPaymentData: EnhancedPaymentData[];

  @ApiProperty()
  @IsString()
  evaluation: string;

  @ApiProperty()
  @IsString()
  kob: string;

  @ApiProperty()
  @IsString()
  monthsHistory: string;

  @ApiProperty()
  @IsString()
  openDate: string;

  @ApiProperty()
  @IsString()
  openOrClosed: string;

  @ApiProperty()
  @IsString()
  paymentHistory: string;

  @ApiProperty()
  @IsString()
  revolvingOrInstallment: string;

  @ApiProperty()
  @IsString()
  specialComment: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  statusDate: string;

  @ApiProperty()
  @IsString()
  subscriberCode: string;

  @ApiProperty()
  @IsString()
  subscriberName: string;

  @ApiProperty()
  @IsString()
  terms: string;
}
