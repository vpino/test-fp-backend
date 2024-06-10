import { IsString, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHeaderRecordDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  @ApiProperty({ description: 'Date of the report in MMDDYY format' })
  reportDate: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  @ApiProperty({ description: 'Time of the report in HHMMSS format' })
  reportTime: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 4)
  @ApiProperty({ description: 'Preamble of the report' })
  preamble: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @ApiProperty({ description: 'Version number of the report' })
  versionNo: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @ApiProperty({ description: 'Keyword length in the report' })
  mKeywordLength: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @ApiProperty({ description: 'Keyword text in the report' })
  mKeywordText: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  @ApiProperty({ description: 'Y2K reported date in MMDDYYYY format' })
  y2kReportedDate: string;
}
