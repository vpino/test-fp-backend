import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// DTO para métodos de pago
class PaymentMethodDTO {
  @ApiProperty({ description: 'Número de identificación del método de pago' })
  @IsString()
  identificationNumber: string;

  @ApiProperty({ description: 'Indica si es una tarjeta de crédito múltiple' })
  @IsBoolean()
  isMultipleCreditCard: boolean;
}

// DTO para cuentas de tarjeta de crédito
class CreditCardAccountDTO {
  @ApiProperty({ description: 'ID de la cuenta de tarjeta de crédito' })
  @IsString()
  creditCardAccountId: string;

  @ApiProperty({ description: 'Nombre de la marca de la tarjeta de crédito' })
  @IsString()
  brandName: string;

  @ApiProperty({ description: 'CNPJ de la compañía emisora de la tarjeta de crédito' })
  @IsString()
  companyCnpj: string;

  @ApiProperty({ description: 'Nombre del producto de la tarjeta de crédito' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tipo de producto de tarjeta de crédito' })
  @IsString()
  productType: string;

  @ApiProperty({ description: 'Información adicional sobre el producto de tarjeta de crédito', required: false })
  @IsOptional()
  @IsString()
  productAdditionalInfo?: string;

  @ApiProperty({ description: 'Red de tarjeta de crédito' })
  @IsString()
  creditCardNetwork: string;

  @ApiProperty({ description: 'Información adicional sobre la red de tarjeta de crédito', required: false })
  @IsOptional()
  @IsString()
  networkAdditionalInfo?: string;

  @ApiProperty({ type: [PaymentMethodDTO] })
  @ValidateNested({ each: true })
  @Type(() => PaymentMethodDTO)
  paymentMethod: PaymentMethodDTO[];
}

// DTO para el monto total de la factura
class BillTotalAmountDTO {
  @ApiProperty({ description: 'Monto total de la factura' })
  @IsString()
  amount: string;

  @ApiProperty({ description: 'Moneda del monto total de la factura' })
  @IsString()
  currency: string;
}

// DTO para cargos financieros
class FinanceChargesDTO {
  @ApiProperty({ description: 'Tipo de cargo financiero' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Información adicional sobre el cargo financiero', required: false })
  @IsOptional()
  @IsString()
  additionalInfo?: string;

  @ApiProperty({ description: 'Monto del cargo financiero' })
  @IsString()
  amount: string;

  @ApiProperty({ description: 'Moneda del cargo financiero' })
  @IsString()
  currency: string;
}

// DTO para pagos
class PaymentsDTO {
  @ApiProperty({ description: 'Tipo de valor del pago' })
  @IsString()
  valueType: string;

  @ApiProperty({ description: 'Fecha del pago' })
  @IsDateString()
  paymentDate: string;

  @ApiProperty({ description: 'Modo de pago' })
  @IsString()
  paymentMode: string;

  @ApiProperty({ description: 'Monto del pago' })
  @IsString()
  amount: string;

  @ApiProperty({ description: 'Moneda del pago' })
  @IsString()
  currency: string;
}

// DTO para facturas de cuentas de tarjeta de crédito
class CreditCardAccountBillDTO {
  @ApiProperty({ description: 'ID de la cuenta de tarjeta de crédito' })
  @IsString()
  creditCardAccountId: string;

  @ApiProperty({ description: 'ID de la factura de tarjeta de crédito' })
  @IsString()
  billId: string;

  @ApiProperty({ description: 'Fecha de vencimiento de la factura' })
  @IsDateString()
  dueDate: string;

  @ApiProperty({ type: BillTotalAmountDTO })
  @ValidateNested()
  @Type(() => BillTotalAmountDTO)
  billTotalAmount: BillTotalAmountDTO;

  @ApiProperty({ description: 'Monto mínimo de la factura' })
  @IsString()
  billMinimumAmount: string;

  @ApiProperty({ description: 'Indica si es una cuota' })
  @IsBoolean()
  isInstalment: boolean;

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

// DTO para transacciones de cuentas de tarjeta de crédito
class TransactionDTO {
  @ApiProperty({ description: 'ID de la cuenta de tarjeta de crédito' })
  @IsString()
  creditCardAccountId: string;

  @ApiProperty({ description: 'ID de la transacción de tarjeta de crédito' })
  @IsString()
  transactionId: string;

  @ApiProperty({ description: 'Número de identificación de la transacción' })
  @IsString()
  identificationNumber: string;

  @ApiProperty({ description: 'Nombre de la transacción' })
  @IsString()
  transactionName: string;

  @ApiProperty({ description: 'ID de la factura relacionada con la transacción' })
  @IsString()
  billId: string;

  @ApiProperty({ description: 'Tipo de crédito o débito en la transacción' })
  @IsString()
  creditDebitType: string;

  @ApiProperty({ description: 'Tipo de transacción' })
  @IsString()
  transactionType: string;

  @ApiProperty({ description: 'Información adicional de la transacción', required: false })
  @IsOptional()
  @IsString()
  transactionalAdditionalInfo?: string;

  @ApiProperty({ description: 'Tipo de pago realizado en la transacción' })
  @IsString()
  paymentType: string;

  @ApiProperty({ description: 'Tipo de tarifa de la transacción' })
  @IsString()
  feeType: string;

  @ApiProperty({ description: 'Información adicional sobre la tarifa de la transacción', required: false })
  @IsOptional()
  @IsString()
  feeTypeAdditionalInfo?: string;

  @ApiProperty({ description: 'Tipo de otros créditos en la transacción' })
  @IsString()
  otherCreditsType: string;

  @ApiProperty({ description: 'Información adicional sobre otros créditos en la transacción', required: false })
  @IsOptional()
  @IsString()
  otherCreditsAdditionalInfo?: string;

  @ApiProperty({ description: 'Identificador de cargo en la transacción' })
  @IsString()
  chargeIdentificator: string;

  @ApiProperty({ description: 'Número de cargos en la transacción' })
  @IsNumber()
  chargeNumber: number;

  @ApiProperty({ type: BillTotalAmountDTO })
  @ValidateNested()
  @Type(() => BillTotalAmountDTO)
  brazilianAmount: BillTotalAmountDTO;

  @ApiProperty({ type: BillTotalAmountDTO })
  @ValidateNested()
  @Type(() => BillTotalAmountDTO)
  amount: BillTotalAmountDTO;

  @ApiProperty({ description: 'Fecha de la transacción' })
  @IsDateString()
  transactionDate: string;

  @ApiProperty({ description: 'Fecha de publicación de la factura relacionada' })
  @IsDateString()
  billPostDate: string;

  @ApiProperty({ description: 'MCC del beneficiario de la transacción' })
  @IsNumber()
  payeeMCC: number;
}

// DTO para el límite de tarjeta de crédito
class LimitAmountDTO {
  @ApiProperty({ description: 'Monto del límite' })
  @IsString()
  amount: string;

  @ApiProperty({ description: 'Moneda del límite' })
  @IsString()
  currency: string;
}

// DTO para el límite de cuenta de tarjeta de crédito
class CreditCardAccountLimitDTO {
  @ApiProperty({ description: 'ID de la cuenta de tarjeta de crédito' })
  @IsString()
  creditCardAccountId: string;

  @ApiProperty({ description: 'Tipo de límite de crédito' })
  @IsString()
  creditLineLimitType: string;

  @ApiProperty({ description: 'Tipo de consolidación del límite' })
  @IsString()
  consolidationType: string;

  @ApiProperty({ description: 'Número de identificación del límite' })
  @IsString()
  identificationNumber: string;

  @ApiProperty({ description: 'Nombre de la línea de crédito' })
  @IsString()
  lineName: string;

  @ApiProperty({ description: 'Información adicional sobre la línea de crédito' })
  @IsString()
  lineNameAdditionalInfo: string;

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

// DTO para la lista de cuentas
class AccountListDTO {
  @ApiProperty({ description: 'Nombre de la marca de la cuenta' })
  @IsString()
  brandName: string;

  @ApiProperty({ description: 'CNPJ de la compañía de la cuenta' })
  @IsString()
  companyCnpj: string;

  @ApiProperty({ description: 'Tipo de cuenta' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Código COMPE de la cuenta' })
  @IsString()
  compeCode: string;

  @ApiProperty({ description: 'Código de sucursal de la cuenta' })
  @IsString()
  branchCode: string;

  @ApiProperty({ description: 'Número de la cuenta' })
  @IsString()
  number: string;

  @ApiProperty({ description: 'Dígito de verificación de la cuenta' })
  @IsString()
  checkDigit: string;

  @ApiProperty({ description: 'ID de la cuenta' })
  @IsString()
  accountId: string;

  @ApiProperty({ description: 'Subtipo de la cuenta' })
  @IsString()
  subtype: string;

  @ApiProperty({ description: 'Moneda de la cuenta' })
  @IsString()
  currency: string;
}

// DTO para saldos de cuentas
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

// DTO para transacciones de cuentas
class AccountTransactionDTO {
  @ApiProperty({ description: 'ID de la cuenta' })
  @IsString()
  accountId: string;

  @ApiProperty({ description: 'ID de la transacción de cuenta' })
  @IsString()
  transactionId: string;

  @ApiProperty({ description: 'Tipo de pago completado o autorizado' })
  @IsString()
  completedAuthorisedPaymentType: string;

  @ApiProperty({ description: 'Tipo de crédito o débito en la transacción' })
  @IsString()
  creditDebitType: string;

  @ApiProperty({ description: 'Nombre de la transacción' })
  @IsString()
  transactionName: string;

  @ApiProperty({ description: 'Tipo de transacción de cuenta' })
  @IsString()
  type: string;

  @ApiProperty({ type: BillTotalAmountDTO })
  @ValidateNested()
  @Type(() => BillTotalAmountDTO)
  transactionAmount: BillTotalAmountDTO;

  @ApiProperty({ description: 'Fecha de la transacción' })
  @IsDateString()
  transactionDate: string;

  @ApiProperty({ description: 'CNPJ o CPF de la parte involucrada en la transacción' })
  @IsString()
  partieCnpjCpf: string;

  @ApiProperty({ description: 'Tipo de persona de la parte involucrada en la transacción' })
  @IsString()
  partiePersonType: string;

  @ApiProperty({ description: 'Código COMPE de la parte involucrada en la transacción' })
  @IsString()
  partieCompeCode: string;

  @ApiProperty({ description: 'Código de sucursal de la parte involucrada en la transacción' })
  @IsString()
  partieBranchCode: string;

  @ApiProperty({ description: 'Número de cuenta de la parte involucrada en la transacción' })
  @IsString()
  partieNumber: string;

  @ApiProperty({ description: 'Dígito de verificación de la parte involucrada en la transacción' })
  @IsString()
  partieCheckDigit: string;
}

// DTO para límites de sobregiro
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

// DTO para el puntaje de tarjeta de crédito
class CreditCardScoreDTO {
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

// DTO para el puntaje de cuenta
class AccountScoreDTO {
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

// DTO para la solicitud de puntaje de crédito
export class CreditScoreRequestDTO {
  @ApiProperty({ description: 'ID del cliente' })
  @IsString()
  customerId: string;

  @ApiProperty({ type: CreditCardScoreDTO })
  @ValidateNested()
  @Type(() => CreditCardScoreDTO)
  creditCardScore: CreditCardScoreDTO;

  @ApiProperty({ type: AccountScoreDTO })
  @ValidateNested()
  @Type(() => AccountScoreDTO)
  accountScore: AccountScoreDTO;
}
