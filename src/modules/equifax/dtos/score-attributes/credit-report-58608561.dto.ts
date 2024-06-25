import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class NameDto {
  @ApiProperty({ example: 'current' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ example: 'TESTFN' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'TESTLN' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  suffix: string;
}

class SocialNumDto {
  @ApiProperty({ example: 'current' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ example: '000000000' })
  @IsString()
  @Length(9, 9)
  number: string;
}

class AddressDto {
  @ApiProperty({ example: 'current' })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ example: '0000' })
  @IsString()
  @IsNotEmpty()
  houseNumber: string;

  @ApiProperty({ example: 'X XXXX' })
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @ApiProperty({ example: 'XX' })
  @IsString()
  @IsNotEmpty()
  streetType: string;

  @ApiProperty({ example: '', required: false })
  @IsString()
  @IsOptional()
  apartmentNumber: string;

  @ApiProperty({ example: 'New CITY' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'AB' })
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({ example: '00000' })
  @IsString()
  @Length(5, 5)
  zip: string;
}

class ConsumerDto {
  @ApiProperty({ type: [NameDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => NameDto)
  name: NameDto[];

  @ApiProperty({ type: [SocialNumDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SocialNumDto)
  socialNum: SocialNumDto[];

  @ApiProperty({ example: '10021962' })
  @IsString()
  @Length(8, 8)
  dateOfBirth: string;

  @ApiProperty({ type: [AddressDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];
}

class MultidatamodelDto {
  @ApiProperty({ example: '5860' })
  @IsString()
  @IsNotEmpty()
  identifier: string;
}

export class CreditReportRequest58608561 {
  @ApiProperty({ type: ConsumerDto })
  @ValidateNested()
  @Type(() => ConsumerDto)
  consumers: ConsumerDto;

  @ApiProperty({ type: [MultidatamodelDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MultidatamodelDto)
  multidatamodels: MultidatamodelDto[];

  @ApiProperty({ example: 'JSON-T2' })
  @IsString()
  @IsNotEmpty()
  customerReferenceIdentifier: string;
}
