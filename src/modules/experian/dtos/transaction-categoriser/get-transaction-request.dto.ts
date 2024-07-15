import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AmountDTO {
  @ApiProperty({
    description: 'Amount of the transaction',
    example: '1000.0400',
  })
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty({
    description: 'Currency of the amount',
    example: 'BRL',
  })
  @IsString()
  @IsNotEmpty()
  currency: string;
}

class AccountTransactionDTO {
  @ApiProperty({
    description: 'Account ID',
    example: '92792126019929279212650822221989319252576',
  })
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @ApiProperty({
    description: 'Transaction ID',
    example: 'TXpRMU9UQTROMWhZV2xSU1FUazJSMDl',
  })
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @ApiProperty({
    description: 'Completed Authorised Payment Type',
    example: 'TRANSACAO_EFETIVADA',
  })
  @IsString()
  @IsNotEmpty()
  completedAuthorisedPaymentType: string;

  @ApiProperty({
    description: 'Credit or Debit Type',
    example: 'DEBITO',
  })
  @IsString()
  @IsNotEmpty()
  creditDebitType: string;

  @ApiProperty({
    description: 'Transaction Name',
    example: 'TRANSFCWAR5TXHCX5I9IDBHML8082N8NEO30M6LNNG7ANAYIJYRM00ZBZPU8',
  })
  @IsString()
  @IsNotEmpty()
  transactionName: string;

  @ApiProperty({
    description: 'Transaction Type',
    example: 'PIX',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Transaction Amount',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  transactionAmount: AmountDTO;

  @ApiProperty({
    description: 'Transaction Date',
    example: '2021-01-07',
  })
  @IsDateString()
  @IsNotEmpty()
  transactionDate: string;

  @ApiProperty({
    description: 'CNPJ or CPF of the party',
    example: '43908445778',
  })
  @IsString()
  @IsNotEmpty()
  partieCnpjCpf: string;

  @ApiProperty({
    description: 'Person Type of the party',
    example: 'PESSOA_NATURAL',
  })
  @IsString()
  @IsNotEmpty()
  partiePersonType: string;

  @ApiProperty({
    description: 'Compe Code of the party',
    example: '001',
  })
  @IsString()
  @IsNotEmpty()
  partieCompeCode: string;

  @ApiProperty({
    description: 'Branch Code of the party',
    example: '6272',
  })
  @IsString()
  @IsNotEmpty()
  partieBranchCode: string;

  @ApiProperty({
    description: 'Account Number of the party',
    example: '67890854360',
  })
  @IsString()
  @IsNotEmpty()
  partieNumber: string;

  @ApiProperty({
    description: 'Check Digit of the account number',
    example: '4',
  })
  @IsString()
  @IsNotEmpty()
  partieCheckDigit: string;
}

class CreditCardTransactionDTO {
  @ApiProperty({
    description: 'Credit Card Account ID',
    example: 'XXZTR3459087',
  })
  @IsString()
  @IsNotEmpty()
  creditCardAccountId: string;

  @ApiProperty({
    description: 'Transaction ID',
    example: 'TXpRMU9UQTROMWhZV2xSU1FUazJSMDl',
  })
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @ApiProperty({
    description: 'Identification Number',
    example: '4453',
  })
  @IsString()
  @IsNotEmpty()
  identificationNumber: string;

  @ApiProperty({
    description: 'Transaction Name',
    example: 'PGTO',
  })
  @IsString()
  @IsNotEmpty()
  transactionName: string;

  @ApiProperty({
    description: 'Bill ID',
    example: 'MTU0OTU1NjI2NTk4OTRmc2ZhZDRmc2Q1NmZkM',
  })
  @IsString()
  @IsNotEmpty()
  billId: string;

  @ApiProperty({
    description: 'Credit or Debit Type',
    example: 'DEBITO',
  })
  @IsString()
  @IsNotEmpty()
  creditDebitType: string;

  @ApiProperty({
    description: 'Transaction Type',
    example: 'CASHBACK',
  })
  @IsString()
  @IsNotEmpty()
  transactionType: string;

  @ApiProperty({
    description: 'Additional Information for the transaction',
    example: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  transactionalAdditionalInfo?: string;

  @ApiProperty({
    description: 'Payment Type',
    example: 'A_VISTA',
  })
  @IsString()
  @IsNotEmpty()
  paymentType: string;

  @ApiProperty({
    description: 'Fee Type',
    example: 'ANUIDADE',
  })
  @IsString()
  @IsNotEmpty()
  feeType: string;

  @ApiProperty({
    description: 'Additional Information for the fee type',
    example: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  feeTypeAdditionalInfo?: string;

  @ApiProperty({
    description: 'Type of other credits',
    example: 'CREDITO_ROTATIVO',
  })
  @IsString()
  @IsNotEmpty()
  otherCreditsType: string;

  @ApiProperty({
    description: 'Additional Information for other credits',
    example: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  otherCreditsAdditionalInfo?: string;

  @ApiProperty({
    description: 'Charge Identificator',
    example: 'PARCELA_1',
  })
  @IsString()
  @IsNotEmpty()
  chargeIdentificator: string;

  @ApiProperty({
    description: 'Charge Number',
    example: 12,
  })
  @IsNumber()
  @IsNotEmpty()
  chargeNumber: number;

  @ApiProperty({
    description: 'Brazilian Amount',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  brazilianAmount: AmountDTO;

  @ApiProperty({
    description: 'Amount',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  amount: AmountDTO;

  @ApiProperty({
    description: 'Transaction Date',
    example: '2021-05-21',
  })
  @IsDateString()
  @IsNotEmpty()
  transactionDate: string;

  @ApiProperty({
    description: 'Bill Post Date',
    example: '2021-05-21',
  })
  @IsDateString()
  @IsNotEmpty()
  billPostDate: string;

  @ApiProperty({
    description: 'Payee MCC',
    example: 5137,
  })
  @IsNumber()
  @IsNotEmpty()
  payeeMCC: number;
}

export class GetTransactionCategoriserDTO {
  @ApiProperty({
    description: 'List of account transactions',
    type: [AccountTransactionDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccountTransactionDTO)
  accountTransactions: AccountTransactionDTO[];

  @ApiProperty({
    description: 'List of credit card account transactions',
    type: [CreditCardTransactionDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreditCardTransactionDTO)
  creditCardAccountTransactions: CreditCardTransactionDTO[];
}
