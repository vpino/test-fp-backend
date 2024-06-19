import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum CountryCode {
  MEX = 'MEX',
  ARG = 'ARG',
  BRA = 'BRA',
  COL = 'COL',
  CHL = 'CHL',
  DOM = 'DOM',
}

export class kycRequirements {
  @ApiProperty({
    enum: CountryCode,
  })
  @IsEnum(CountryCode)
  country: CountryCode;
}
