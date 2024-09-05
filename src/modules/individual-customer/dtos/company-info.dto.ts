import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CompanyInfoDTO {
  @ApiProperty({
    description: 'Name of the company',
    example: 'Tech Solutions Inc.',
  })
  @IsString()
  @Length(1, 100)
  companyName: string;

  @ApiProperty({
    description: 'Phone number of the company',
    example: '+1-800-123-4567',
  })
  @IsString()
  companyPhone: string;

  @ApiProperty({
    description: 'Address of the company',
    example: '456 Business Rd',
  })
  @IsString()
  @Length(1, 200)
  companyAddress: string;

  @ApiProperty({
    description: 'State where the company is located',
    example: 'New York',
  })
  @IsString()
  @Length(1, 100)
  companyState: string;

  @ApiProperty({
    description: 'City where the company is located',
    example: 'New York City',
  })
  @IsString()
  @Length(1, 100)
  companyCity: string;

  @ApiProperty({
    description: 'Town where the company is located',
    example: 'New York Town',
  })
  @IsString()
  @Length(1, 100)
  companyTown: string;

  @ApiProperty({
    description: 'Year the company was founded or the individual joined',
    example: '2015',
  })
  @IsString()
  @Length(4, 10)
  companyYear: string;

  @ApiProperty({
    description: 'Month the company was founded or the individual joined',
    example: 'March',
  })
  @IsString()
  @Length(1, 50)
  companyMonth: string;
}
