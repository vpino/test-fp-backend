import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsPhoneNumber, IsNumberString } from 'class-validator';

export class CompanyInfoDTO {
  @ApiProperty({
    description: 'Name of the company',
    example: 'Tech Solutions Inc.',
  })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({
    description: 'Phone number of the company',
    example: '+1-800-123-4567',
  })
  @IsPhoneNumber(null)
  phone: string;

  @ApiProperty({
    description: 'Address of the company',
    example: '456 Business Rd',
  })
  @IsString()
  @Length(1, 200)
  address: string;

  @ApiProperty({
    description: 'State where the company is located',
    example: 'New York',
  })
  @IsString()
  @Length(1, 100)
  state: string;

  @ApiProperty({
    description: 'City where the company is located',
    example: 'New York City',
  })
  @IsString()
  @Length(1, 100)
  city: string;

  @ApiProperty({
    description: 'Year the company was founded or the individual joined',
    example: '2015',
  })
  @IsNumberString()
  @Length(4, 4)
  year: string;

  @ApiProperty({
    description: 'Month the company was founded or the individual joined',
    example: 'March',
  })
  @IsString()
  @Length(1, 50)
  month: string;
}
