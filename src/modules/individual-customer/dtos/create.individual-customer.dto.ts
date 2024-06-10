import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  IsNotEmpty,
  IsDate,
  IsBoolean,
  IsArray,
  IsUUID,
  isUUID,
} from 'class-validator';
import { StatusKyc } from 'src/common/enums/customer.enums';

function Optional(target: any, propertyKey: string) {
  Reflect.defineMetadata('optional', true, target, propertyKey);
}

function DontDisplay(target: any, propertyKey: string) {
  Reflect.defineMetadata('dontDisplay', true, target, propertyKey);
}

@ValidatorConstraint({ name: 'arrayNotNull', async: false })
export class ArrayNotNullValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (!Array.isArray(value)) {
      return false;
    }
    return value.every((element) => element.trim() !== '');
  }

  defaultMessage(args: ValidationArguments) {
    return 'Each element in $property must not be empty';
  }
}

export class CreateIndividualCustomerDto {
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
  lastName: string = '';

  @ApiProperty()
  @IsDateString()
  dateOfBirth: Date = new Date();

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string = '';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string = '';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string = '';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zipCode: string = '';

  @ApiProperty()
  @IsString()
  dni: string = '';

  @ApiProperty()
  @IsString()
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
