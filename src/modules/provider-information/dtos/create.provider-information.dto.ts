import { IsString, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProviderInformationDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ description: 'Subscriber code of the provider' })
  subscriberCode: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty({ description: 'Name of the provider' })
  subscriberName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ description: 'Terms of the provider' })
  terms: string;
}
