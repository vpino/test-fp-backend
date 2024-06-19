import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { TypeTransaction } from 'src/common/enums/webhook.enums';

export class EventDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  referenceId: string;

  @ApiProperty()
  @IsEnum(TypeTransaction)
  @IsNotEmpty()
  eventType: TypeTransaction;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @IsOptional()
  metadata: any;
}
