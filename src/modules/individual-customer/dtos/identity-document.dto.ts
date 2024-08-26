import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class IdentityDocumentDTO {
  @ApiProperty({
    description: 'Country of the identity document',
    example: 'USA',
  })
  @IsString()
  @Length(2, 100)
  country: string;

  @ApiProperty({
    description: 'Type of the identity document',
    example: 'Passport',
  })
  @IsString()
  @Length(2, 100)
  typeDocument: string;

  @ApiProperty({
    description: 'Document number (DNI)',
    example: '123456789',
  })
  @IsString()
  @Length(1, 100)
  dni: string;
}
