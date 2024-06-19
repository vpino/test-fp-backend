import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWebhookDto {
  @ApiProperty()
  @IsString()
  transactionId: string;

  @ApiProperty()
  @IsString()
  typeTransaction: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  statusTransaction: string;

  @ApiProperty()
  @IsString()
  eventData: string;
}
