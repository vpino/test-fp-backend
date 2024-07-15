import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class PaymentMethodDTO {
  @ApiProperty({ description: 'Número de identificación del método de pago' })
  @IsString()
  identificationNumber: string;

  @ApiProperty({ description: 'Indica si es una tarjeta de crédito múltiple' })
  @IsBoolean()
  isMultipleCreditCard: boolean;
}

class CreditCardAccountDTO {
  @ApiProperty({ description: 'ID de la cuenta de tarjeta de crédito' })
  @IsString()
  creditCardAccountId: string;

  @ApiProperty({ description: 'Nombre de la marca' })
  @IsString()
  brandName: string;

  @ApiProperty({ description: 'CNPJ de la compañía' })
  @IsString()
  companyCnpj: string;

  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tipo de producto' })
  @IsString()
  productType: string;

  @ApiProperty({
    description: 'Información adicional del producto',
    required: false,
  })
  @IsOptional()
  @IsString()
  productAdditionalInfo?: string;

  @ApiProperty({ description: 'Red de tarjeta de crédito' })
  @IsString()
  creditCardNetwork: string;

  @ApiProperty({
    description: 'Información adicional de la red',
    required: false,
  })
  @IsOptional()
  @IsString()
  networkAdditionalInfo?: string;

  @ApiProperty({ type: [PaymentMethodDTO] })
  @ValidateNested({ each: true })
  @Type(() => PaymentMethodDTO)
  paymentMethod: PaymentMethodDTO[];
}

class BillTotalAmountDTO {
  @ApiProperty({ description: 'Monto total' })
  @IsString()
  amount: string;

  @ApiProperty({ description: 'Moneda' })
  @IsString()
  currency: string;
}

class FinanceChargesDTO {
  @ApiProperty({ description: 'Tipo de cargo financiero' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Información adicional', required: false })
  @IsOptional()
  @IsString()
  additionalInfo?: string;

  @ApiProperty({ description: 'Monto' })
  @IsString()
  amount: string;

  @ApiProperty({ description: 'Moneda' })
  @IsString()
  currency: string;
}

class PaymentsDTO {
  @ApiProperty({ description: 'Tipo de valor' })
  @IsString()
  valueType: string;

  @ApiProperty({ description: 'Fecha de pago' })
  @IsDateString()
  paymentDate: string;

  @ApiProperty({ description: 'Modo de pago' })
  @IsString()
  paymentMode: string;

  @ApiProperty({ description: 'Monto' })
  @IsString()
  amount: string;

  @ApiProperty({ description: 'Moneda' })
  @IsString()
  currency: string;
}

class CreditCardAccountBillDTO {
  @ApiProperty({ description: 'ID de la cuenta de tarjeta de crédito' })
  @IsString()
  creditCardAccountId: string;

  @ApiProperty({ description: 'ID de la factura' })
  @IsString()
  billId: string;

  @ApiProperty({ description: 'Fecha de vencimiento' })
  @IsDateString()
  dueDate: string;

  @ApiProperty({ type: BillTotalAmountDTO })
  @ValidateNested()
  @Type(() => BillTotalAmountDTO)
  billTotalAmount: BillTotalAmountDTO;

  @ApiProperty({ description: 'Monto mínimo de la factura' })
  @IsString()
  billMinimumAmount: string;

  @ApiProperty({ description: 'Indica si es una cuota', required: false })
  @IsOptional()
  @IsBoolean()
  isInstalment?: boolean;

  @ApiProperty({ type: [FinanceChargesDTO], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FinanceChargesDTO)
  financeCharges?: FinanceChargesDTO[];

  @ApiProperty({ type: [PaymentsDTO], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PaymentsDTO)
  payments?: PaymentsDTO[];
}

class BrazilianAmountDTO {
  @ApiProperty({ description: 'Monto en reales brasileños' })
  @IsString()
  amount: string;

  @ApiProperty({ description: 'Moneda' })
  @IsString()
  currency: string;
}

class TransactionDTO {
  @ApiProperty({ description: 'ID de la cuenta de tarjeta de crédito' })
  @IsString()
  creditCardAccountId: string;

  @ApiProperty({ description: 'ID de la transacción' })
  @IsString()
  transactionId: string;

  @ApiProperty({ description: 'Número de identificación' })
  @IsString()
  identificationNumber: string;

  @ApiProperty({ description: 'Nombre de la transacción' })
  @IsString()
  transactionName: string;

  @ApiProperty({ description: 'ID de la factura' })
  @IsString()
  billId: string;

  @ApiProperty({ description: 'Tipo de crédito o débito' })
  @IsString()
  creditDebitType: string;

  @ApiProperty({ description: 'Tipo de transacción' })
  @IsString()
  transactionType: string;

  @ApiProperty({
    description: 'Información adicional de la transacción',
    required: false,
  })
  @IsOptional()
  @IsString()
  transactionalAdditionalInfo?: string;

  @ApiProperty({ description: 'Tipo de pago' })
  @IsString()
  paymentType: string;

  @ApiProperty({ description: 'Tipo de tarifa' })
  @IsString()
  feeType: string;

  @ApiProperty({
    description: 'Información adicional de la tarifa',
    required: false,
  })
  @IsOptional()
  @IsString()
  feeTypeAdditionalInfo?: string;

  @ApiProperty({ description: 'Tipo de otros créditos' })
  @IsString()
  otherCreditsType: string;

  @ApiProperty({
    description: 'Información adicional de otros créditos',
    required: false,
  })
  @IsOptional()
  @IsString()
  otherCreditsAdditionalInfo?: string;

  @ApiProperty({ description: 'Identificador de cargo' })
  @IsString()
  chargeIdentificator: string;

  @ApiProperty({ description: 'Número de cargos' })
  @IsNumber()
  chargeNumber: number;

  @ApiProperty({ type: BrazilianAmountDTO })
  @ValidateNested()
  @Type(() => BrazilianAmountDTO)
  brazilianAmount: BrazilianAmountDTO;

  @ApiProperty({ type: BrazilianAmountDTO })
  @ValidateNested()
  @Type(() => BrazilianAmountDTO)
  amount: BrazilianAmountDTO;

  @ApiProperty({ description: 'Fecha de transacción' })
  @IsDateString()
  transactionDate: string;

  @ApiProperty({ description: 'Fecha de publicación de la factura' })
  @IsDateString()
  billPostDate: string;

  @ApiProperty({ description: 'MCC del beneficiario' })
  @IsNumber()
  payeeMCC: number;
}

class LimitAmountDTO {
  @ApiProperty({ description: 'Monto del límite' })
  @IsString()
  amount: string;

  @ApiProperty({ description: 'Moneda' })
  @IsString()
  currency: string;
}

class CreditCardAccountLimitDTO {
  @ApiProperty({ description: 'ID de la cuenta de tarjeta de crédito' })
  @IsString()
  creditCardAccountId: string;

  @ApiProperty({ description: 'Tipo de límite de línea de crédito' })
  @IsString()
  creditLineLimitType: string;

  @ApiProperty({ description: 'Tipo de consolidación' })
  @IsString()
  consolidationType: string;

  @ApiProperty({ description: 'Número de identificación' })
  @IsString()
  identificationNumber: string;

  @ApiProperty({ description: 'Nombre de la línea de crédito' })
  @IsString()
  lineName: string;

  @ApiProperty({
    description: 'Información adicional del nombre de la línea',
    required: false,
  })
  @IsOptional()
  @IsString()
  lineNameAdditionalInfo?: string;

  @ApiProperty({ description: 'Indica si el límite es flexible' })
  @IsBoolean()
  isLimitFlexible: boolean;

  @ApiProperty({ type: LimitAmountDTO })
  @ValidateNested()
  @Type(() => LimitAmountDTO)
  limitAmount: LimitAmountDTO;

  @ApiProperty({ type: LimitAmountDTO })
  @ValidateNested()
  @Type(() => LimitAmountDTO)
  usedAmount: LimitAmountDTO;

  @ApiProperty({ type: LimitAmountDTO })
  @ValidateNested()
  @Type(() => LimitAmountDTO)
  availableAmount: LimitAmountDTO;
}

class AccountListDTO {
  @ApiProperty({ description: 'Nombre de la marca' })
  @IsString()
  brandName: string;

  @ApiProperty({ description: 'CNPJ de la compañía' })
  @IsString()
  companyCnpj: string;

  @ApiProperty({ description: 'Tipo de cuenta' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Código de compensación' })
  @IsString()
  compeCode: string;

  @ApiProperty({ description: 'Código de sucursal' })
  @IsString()
  branchCode: string;

  @ApiProperty({ description: 'Número de cuenta' })
  @IsString()
  number: string;

  @ApiProperty({ description: 'Dígito de verificación' })
  @IsString()
  checkDigit: string;

  @ApiProperty({ description: 'ID de la cuenta' })
  @IsString()
  accountId: string;

  @ApiProperty({ description: 'Subtipo de cuenta' })
  @IsString()
  subtype: string;

  @ApiProperty({ description: 'Moneda' })
  @IsString()
  currency: string;
}

class AccountBalanceDTO {
  @ApiProperty({ description: 'ID de la cuenta' })
  @IsString()
  accountId: string;

  @ApiProperty({ type: LimitAmountDTO })
  @ValidateNested()
  @Type(() => LimitAmountDTO)
  availableAmount: LimitAmountDTO;

  @ApiProperty({ type: LimitAmountDTO })
  @ValidateNested()
  @Type(() => LimitAmountDTO)
  blockedAmount: LimitAmountDTO;

  @ApiProperty({ type: LimitAmountDTO })
  @ValidateNested()
  @Type(() => LimitAmountDTO)
  automaticallyInvestedAmount: LimitAmountDTO;
}

class AccountTransactionDTO {
  @ApiProperty({ description: 'ID de la cuenta' })
  @IsString()
  accountId: string;

  @ApiProperty({ description: 'ID de la transacción' })
  @IsString()
  transactionId: string;

  @ApiProperty({ description: 'Tipo de pago autorizado completado' })
  @IsString()
  completedAuthorisedPaymentType: string;

  @ApiProperty({ description: 'Tipo de crédito o débito' })
  @IsString()
  creditDebitType: string;

  @ApiProperty({ description: 'Nombre de la transacción' })
  @IsString()
  transactionName: string;

  @ApiProperty({ description: 'Tipo de transacción' })
  @IsString()
  type: string;

  @ApiProperty({ type: BrazilianAmountDTO })
  @ValidateNested()
  @Type(() => BrazilianAmountDTO)
  transactionAmount: BrazilianAmountDTO;

  @ApiProperty({ description: 'Fecha de la transacción' })
  @IsDateString()
  transactionDate: string;

  @ApiProperty({ description: 'CNPJ o CPF de la otra parte' })
  @IsString()
  partieCnpjCpf: string;

  @ApiProperty({ description: 'Tipo de persona de la otra parte' })
  @IsString()
  partiePersonType: string;

  @ApiProperty({ description: 'Código de compensación de la otra parte' })
  @IsString()
  partieCompeCode: string;

  @ApiProperty({ description: 'Código de sucursal de la otra parte' })
  @IsString()
  partieBranchCode: string;

  @ApiProperty({ description: 'Número de cuenta de la otra parte' })
  @IsString()
  partieNumber: string;

  @ApiProperty({ description: 'Dígito de verificación de la otra parte' })
  @IsString()
  partieCheckDigit: string;
}

class AccountOverdraftLimitDTO {
  @ApiProperty({ description: 'ID de la cuenta' })
  @IsString()
  accountId: string;

  @ApiProperty({ type: LimitAmountDTO })
  @ValidateNested()
  @Type(() => LimitAmountDTO)
  overdraftContractedLimit: LimitAmountDTO;

  @ApiProperty({ type: LimitAmountDTO })
  @ValidateNested()
  @Type(() => LimitAmountDTO)
  overdraftUsedLimit: LimitAmountDTO;

  @ApiProperty({ type: LimitAmountDTO })
  @ValidateNested()
  @Type(() => LimitAmountDTO)
  unarrangedOverdraftAmount: LimitAmountDTO;
}

class CreditCardAffordabilityCheckDTO {
  @ApiProperty({ type: [CreditCardAccountDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreditCardAccountDTO)
  creditCardAccountsList: CreditCardAccountDTO[];

  @ApiProperty({ type: [CreditCardAccountBillDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreditCardAccountBillDTO)
  creditCardAccountsBills: CreditCardAccountBillDTO[];

  @ApiProperty({ type: [TransactionDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionDTO)
  creditCardAccountsTransaction: TransactionDTO[];

  @ApiProperty({ type: [CreditCardAccountLimitDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreditCardAccountLimitDTO)
  creditCardAccountsLimits: CreditCardAccountLimitDTO[];
}

class AccountAffordabilityCheckDTO {
  @ApiProperty({ type: [AccountListDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccountListDTO)
  accountsList: AccountListDTO[];

  @ApiProperty({ type: [AccountBalanceDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccountBalanceDTO)
  accountBalances: AccountBalanceDTO[];

  @ApiProperty({ type: [AccountTransactionDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccountTransactionDTO)
  accountTransactions: AccountTransactionDTO[];

  @ApiProperty({ type: [AccountOverdraftLimitDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccountOverdraftLimitDTO)
  accountOverdraftLimits: AccountOverdraftLimitDTO[];
}

export class AffordabilityCheckDTO {
  @ApiProperty({ description: 'ID del cliente' })
  @IsString()
  customerId: string;

  @ApiProperty({ type: CreditCardAffordabilityCheckDTO })
  @ValidateNested()
  @Type(() => CreditCardAffordabilityCheckDTO)
  creditCardAffordabilityCheck: CreditCardAffordabilityCheckDTO;

  @ApiProperty({ type: AccountAffordabilityCheckDTO })
  @ValidateNested()
  @Type(() => AccountAffordabilityCheckDTO)
  accountAffordabilityCheck: AccountAffordabilityCheckDTO;
}
