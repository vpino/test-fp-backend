import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { TypeCustomer } from 'src/common/enums/customer.enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Unique identifier for the customer',
    example: 'c9b1dcd8-3b6e-4f8f-9d2b-9f5dc9abde8a',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({
    description: 'Email address of the customer',
    example: 'customer@example.com',
    required: false,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone number of the customer',
    example: '+123456789',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    description: 'Type of the customer',
    example: 'INDIVIDUAL',
    enum: TypeCustomer,
    required: true,
  })
  @IsEnum(TypeCustomer)
  type: TypeCustomer;

  @ApiProperty({
    description: 'Password of the customer',
    example: 'strongpassword123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Indicates if the customer is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiProperty({
    description: 'Indicates if the customer is deleted',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @ApiProperty({
    description: 'The date and time when the customer was created',
    example: '2023-01-01T12:34:56.789Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    description: 'The date and time when the customer was last updated',
    example: '2023-01-02T12:34:56.789Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
