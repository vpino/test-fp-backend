import { IsString, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressInformationDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ description: 'City name' })
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 1)
  @ApiProperty({ description: 'Type of dwelling' })
  dwellingType: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  @ApiProperty({ description: 'First reported date in MMDDYYYY format' })
  firstReportedDate: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 7)
  @ApiProperty({ description: 'Last reporting subscriber code' })
  lastReportingSubscriberCode: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  @ApiProperty({ description: 'Last updated date in MMDDYYYY format' })
  lastUpdatedDate: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 1)
  @ApiProperty({ description: 'Source of the information' })
  source: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @ApiProperty({ description: 'State abbreviation' })
  state: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ description: 'Street name' })
  streetName: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ description: 'Street prefix' })
  streetPrefix: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ description: 'Street suffix' })
  streetSuffix: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @ApiProperty({ description: 'Times reported' })
  timesReported: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ description: 'Unit ID' })
  unitId: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ description: 'Unit type' })
  unitType: string;

  @IsString()
  @IsNotEmpty()
  @Length(9, 9)
  @ApiProperty({ description: 'Zip code' })
  zipCode: string;
}
