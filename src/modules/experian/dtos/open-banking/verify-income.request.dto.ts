import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
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

class PaymentMethodDTO {
  @ApiProperty({
    description: 'Identification Number',
    example: '4453',
  })
  @IsString()
  @IsNotEmpty()
  identificationNumber: string;

  @ApiProperty({
    description: 'Is Multiple Credit Card',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isMultipleCreditCard: boolean;
}

class CreditCardAccountDTO {
  @ApiProperty({
    description: 'Credit Card Account ID',
    example: 'XXZTR3459087',
  })
  @IsString()
  @IsNotEmpty()
  creditCardAccountId: string;

  @ApiProperty({
    description: 'Brand Name',
    example: 'Organização A',
  })
  @IsString()
  @IsNotEmpty()
  brandName: string;

  @ApiProperty({
    description: 'Company CNPJ',
    example: '21128159000166',
  })
  @IsString()
  @IsNotEmpty()
  companyCnpj: string;

  @ApiProperty({
    description: 'Name of the credit card',
    example: 'Cartão Universitário',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Product Type',
    example: 'OUTROS',
  })
  @IsString()
  @IsNotEmpty()
  productType: string;

  @ApiProperty({
    description: 'Product Additional Info',
    example: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  productAdditionalInfo?: string;

  @ApiProperty({
    description: 'Credit Card Network',
    example: 'VISA',
  })
  @IsString()
  @IsNotEmpty()
  creditCardNetwork: string;

  @ApiProperty({
    description: 'Network Additional Info',
    example: 'AURA CARD',
    required: false,
  })
  @IsString()
  @IsOptional()
  networkAdditionalInfo?: string;

  @ApiProperty({
    description: 'Payment Methods',
    type: [PaymentMethodDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentMethodDTO)
  paymentMethod: PaymentMethodDTO[];
}

class BillAmountDTO {
  @ApiProperty({
    description: 'Bill Amount',
    example: '1000.0400',
  })
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty({
    description: 'Currency of the bill amount',
    example: 'BRL',
  })
  @IsString()
  @IsNotEmpty()
  currency: string;
}

class FinanceChargeDTO {
  @ApiProperty({
    description: 'Type of Finance Charge',
    example: 'JUROS_REMUNERATORIOS_ATRASO_PAGAMENTO_FATURA',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Additional Information for Finance Charge',
    example: 'Informações Adicionais',
    required: false,
  })
  @IsString()
  @IsOptional()
  additionalInfo?: string;

  @ApiProperty({
    description: 'Amount of Finance Charge',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  amount: AmountDTO;
}

class PaymentDTO {
  @ApiProperty({
    description: 'Value Type',
    example: 'VALOR_PAGAMENTO_FATURA_PARCELADO',
  })
  @IsString()
  @IsNotEmpty()
  valueType: string;

  @ApiProperty({
    description: 'Payment Date',
    example: '2021-05-21',
  })
  @IsDateString()
  @IsNotEmpty()
  paymentDate: string;

  @ApiProperty({
    description: 'Payment Mode',
    example: 'DEBITO_CONTA_CORRENTE',
  })
  @IsString()
  @IsNotEmpty()
  paymentMode: string;

  @ApiProperty({
    description: 'Payment Amount',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  amount: AmountDTO;
}

class CreditCardAccountBillDTO {
  @ApiProperty({
    description: 'Credit Card Account ID',
    example: 'XXZTR3459087',
  })
  @IsString()
  @IsNotEmpty()
  creditCardAccountId: string;

  @ApiProperty({
    description: 'Bill ID',
    example: 'MTU0OTU1NjI2NTk4OTRmc2ZhZDRmc2Q1NmZkM',
  })
  @IsString()
  @IsNotEmpty()
  billId: string;

  @ApiProperty({
    description: 'Due Date',
    example: '2021-05-21',
  })
  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @ApiProperty({
    description: 'Bill Total Amount',
  })
  @ValidateNested()
  @Type(() => BillAmountDTO)
  billTotalAmount: BillAmountDTO;

  @ApiProperty({
    description: 'Bill Minimum Amount',
    example: 'BRL',
  })
  @IsString()
  @IsNotEmpty()
  billMinimumAmount: string;

  @ApiProperty({
    description: 'Is Instalment',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isInstalment: boolean;

  @ApiProperty({
    description: 'Finance Charges',
    type: [FinanceChargeDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FinanceChargeDTO)
  financeCharges: FinanceChargeDTO[];

  @ApiProperty({
    description: 'Payments',
    type: [PaymentDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentDTO)
  payments: PaymentDTO[];
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

class CreditCardLimitDTO {
  @ApiProperty({
    description: 'Credit Card Account ID',
    example: 'XXZTR3459087',
  })
  @IsString()
  @IsNotEmpty()
  creditCardAccountId: string;

  @ApiProperty({
    description: 'Credit Line Limit Type',
    example: 'LIMITE_CREDITO_TOTAL',
  })
  @IsString()
  @IsNotEmpty()
  creditLineLimitType: string;

  @ApiProperty({
    description: 'Consolidation Type',
    example: 'CONSOLIDADO',
  })
  @IsString()
  @IsNotEmpty()
  consolidationType: string;

  @ApiProperty({
    description: 'Identification Number',
    example: '4453',
  })
  @IsString()
  @IsNotEmpty()
  identificationNumber: string;

  @ApiProperty({
    description: 'Line Name',
    example: 'CREDITO_A_VISTA',
  })
  @IsString()
  @IsNotEmpty()
  lineName: string;

  @ApiProperty({
    description: 'Line Name Additional Info',
    example: 'Informações adicionais e complementares.',
    required: false,
  })
  @IsString()
  @IsOptional()
  lineNameAdditionalInfo?: string;

  @ApiProperty({
    description: 'Is Limit Flexible',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isLimitFlexible: boolean;

  @ApiProperty({
    description: 'Limit Amount',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  limitAmount: AmountDTO;

  @ApiProperty({
    description: 'Used Amount',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  usedAmount: AmountDTO;

  @ApiProperty({
    description: 'Available Amount',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  availableAmount: AmountDTO;
}

class CreditCardIncomeVerificationDTO {
  @ApiProperty({
    description: 'List of Credit Card Accounts',
    type: [CreditCardAccountDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreditCardAccountDTO)
  creditCardAccountsList: CreditCardAccountDTO[];

  @ApiProperty({
    description: 'List of Credit Card Bills',
    type: [CreditCardAccountBillDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreditCardAccountBillDTO)
  creditCardAccountsBills: CreditCardAccountBillDTO[];

  @ApiProperty({
    description: 'List of Credit Card Transactions',
    type: [CreditCardTransactionDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreditCardTransactionDTO)
  creditCardAccountsTransaction: CreditCardTransactionDTO[];

  @ApiProperty({
    description: 'List of Credit Card Limits',
    type: [CreditCardLimitDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreditCardLimitDTO)
  creditCardAccountsLimits: CreditCardLimitDTO[];
}

class AccountDTO {
  @ApiProperty({
    description: 'Brand Name',
    example: 'Organização A',
  })
  @IsString()
  @IsNotEmpty()
  brandName: string;

  @ApiProperty({
    description: 'Company CNPJ',
    example: '21128159000166',
  })
  @IsString()
  @IsNotEmpty()
  companyCnpj: string;

  @ApiProperty({
    description: 'Account Type',
    example: 'CONTA_DEPOSITO_A_VISTA',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'COMPE Code',
    example: '001',
  })
  @IsString()
  @IsNotEmpty()
  compeCode: string;

  @ApiProperty({
    description: 'Branch Code',
    example: '6272',
  })
  @IsString()
  @IsNotEmpty()
  branchCode: string;

  @ApiProperty({
    description: 'Account Number',
    example: '94088392',
  })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({
    description: 'Check Digit',
    example: '4',
  })
  @IsString()
  @IsNotEmpty()
  checkDigit: string;

  @ApiProperty({
    description: 'Account ID',
    example: '92792126019929279212650822221989319252576',
  })
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @ApiProperty({
    description: 'Account Subtype',
    example: 'INDIVIDUAL',
  })
  @IsString()
  @IsNotEmpty()
  subtype: string;

  @ApiProperty({
    description: 'Currency',
    example: 'BRL',
  })
  @IsString()
  @IsNotEmpty()
  currency: string;
}

class AccountBalanceDTO {
  @ApiProperty({
    description: 'Account ID',
    example: '92792126019929279212650822221989319252576',
  })
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @ApiProperty({
    description: 'Available Amount',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  availableAmount: AmountDTO;

  @ApiProperty({
    description: 'Blocked Amount',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  blockedAmount: AmountDTO;

  @ApiProperty({
    description: 'Automatically Invested Amount',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  automaticallyInvestedAmount: AmountDTO;
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
    description: 'Check Digit of the party',
    example: '4',
  })
  @IsString()
  @IsNotEmpty()
  partieCheckDigit: string;
}

class AccountOverdraftLimitDTO {
  @ApiProperty({
    description: 'Account ID',
    example: '92792126019929279212650822221989319252576',
  })
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @ApiProperty({
    description: 'Overdraft Contracted Limit',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  overdraftContractedLimit: AmountDTO;

  @ApiProperty({
    description: 'Overdraft Used Limit',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  overdraftUsedLimit: AmountDTO;

  @ApiProperty({
    description: 'Unarranged Overdraft Amount',
  })
  @ValidateNested()
  @Type(() => AmountDTO)
  unarrangedOverdraftAmount: AmountDTO;
}

class AccountIncomeVerificationDTO {
  @ApiProperty({
    description: 'List of Accounts',
    type: [AccountDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccountDTO)
  accountsList: AccountDTO[];

  @ApiProperty({
    description: 'List of Account Balances',
    type: [AccountBalanceDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccountBalanceDTO)
  accountBalances: AccountBalanceDTO[];

  @ApiProperty({
    description: 'List of Account Transactions',
    type: [AccountTransactionDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccountTransactionDTO)
  accountTransactions: AccountTransactionDTO[];

  @ApiProperty({
    description: 'List of Account Overdraft Limits',
    type: [AccountOverdraftLimitDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccountOverdraftLimitDTO)
  accountOverdraftLimits: AccountOverdraftLimitDTO[];
}

export class VerifyIncomeDTO {
  @ApiProperty({
    description: 'Customer ID',
    example: '43908445778',
  })
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({
    description: 'Credit Card Income Verification',
  })
  @ValidateNested()
  @Type(() => CreditCardIncomeVerificationDTO)
  creditCardIncomeVerification: CreditCardIncomeVerificationDTO;

  @ApiProperty({
    description: 'Account Income Verification',
  })
  @ValidateNested()
  @Type(() => AccountIncomeVerificationDTO)
  accountIncomeVerification: AccountIncomeVerificationDTO;
}
