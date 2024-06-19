import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ClientTags } from 'src/modules/client-tags/entities/client-tags.entity';
import { CreditInformation } from 'src/modules/credit-information/entities/credit-information.entity';
import { EducationInformation } from 'src/modules/education-information/entities/education-information.entity';
import { FinancialInformation } from 'src/modules/financial-information/entities/financial-information.entity';
import { LegalInformation } from 'src/modules/legal-information/entities/legal-information.entity';
import { LoanInformation } from 'src/modules/loan-information/entities/loan-information.entity';
import { MortgageInformation } from 'src/modules/mortgage-information/entities/mortgage-information.entity';
import { Persona } from 'src/modules/persona/entities/persona.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoanDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  productTypes: string[];

  @ApiProperty()
  @ValidateNested()
  @Type(() => Persona)
  personalInformation: Persona;

  @ApiProperty()
  @ValidateNested()
  @Type(() => LoanInformation)
  loanInformation: LoanInformation;

  @ApiProperty()
  @ValidateNested()
  @Type(() => MortgageInformation)
  mortgageInformation: MortgageInformation;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreditInformation)
  creditInformation: CreditInformation;

  @ApiProperty()
  @ValidateNested()
  @Type(() => FinancialInformation)
  financialInformation: FinancialInformation;

  @ApiProperty()
  @ValidateNested()
  @Type(() => EducationInformation)
  educationInformation: EducationInformation;

  @ApiProperty()
  @ValidateNested()
  @Type(() => LegalInformation)
  legalInformation: LegalInformation;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ClientTags)
  clientTags: ClientTags;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;
}
