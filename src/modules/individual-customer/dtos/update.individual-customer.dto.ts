import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  IsUUID,
} from 'class-validator';
import { StatusKyc } from 'src/common/enums/customer.enums';

function Optional(target: any, propertyKey: string) {
  Reflect.defineMetadata('optional', true, target, propertyKey);
}

function DontDisplay(target: any, propertyKey: string) {
  Reflect.defineMetadata('dontDisplay', true, target, propertyKey);
}

export class UpdateIndividualCustomerDto {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  @Optional
  @DontDisplay
  id?: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  customerId;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName: string = '';

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Optional
  middleName: string = '';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName: string = '';

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  dateOfBirth: Date = new Date();

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  country: string = '';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: string = '';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  state: string = '';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  zipCode: string = '';

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsOptional()
  dni: string = '';

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string = '';

  @ApiProperty()
  @IsOptional()
  @Optional
  @IsString()
  addressExtension?: string = '';

  @IsEnum(StatusKyc)
  @ApiProperty({
    description: 'Status KYC',
    enum: StatusKyc,
  })
  @IsString()
  @IsOptional()
  @Optional
  @DontDisplay
  statusKyc?: StatusKyc.CREATED;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Optional
  @DontDisplay
  verificationSessionId?: string = '';

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @ApiProperty({ isArray: true })
  @Optional
  @DontDisplay
  verificationSessions?: string[] = [];

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @Optional
  @DontDisplay
  manualValidation?: boolean = false;

  @ApiProperty({
    description: 'Indicates if the customer is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  @Optional
  @DontDisplay
  isActive?: boolean = true;

  @ApiProperty({
    description: 'Indicates if the customer is deleted',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  @Optional
  @DontDisplay
  isDeleted?: boolean = false;
}
