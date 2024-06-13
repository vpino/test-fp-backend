// src/dto/create-customer.dto.ts

import { IsUUID, IsArray, ArrayNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '../enums/product-type.enum';

export class CreateLoanDto {
  @ApiProperty({
    description: 'Unique identifier for the customer',
    example: '3f020d62-6cef-4f2c-87ed-b096abc5cac9',
  })
  @IsUUID()
  customerID: string;

  @ApiProperty({
    description: 'Unique identifier for the risk',
    example: '3f020d62-6cef-4f2c-87ed-b096abc5cac9',
  })
  @IsUUID()
  riskID: string;

  @ApiProperty({
    description: 'List of product types associated with the customer',
    example: ['Personal_Loan'],
    enum: ProductType,
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(ProductType, { each: true })
  productTypes: ProductType[];
}
