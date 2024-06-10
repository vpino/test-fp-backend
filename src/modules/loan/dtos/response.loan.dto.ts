export class OriginatorDto {
  key: string;
  name: string;
  description: string;
  images: { sizeKey: string; url: string }[];
  disclaimer: string;
}

export class LoanOfferDto {
  uuid: string;
  originator: OriginatorDto;
  originatorId: string | null;
  termLength: number;
  termUnit: string;
  maxAmount: number;
  minAmount: number;
  maxApr: number;
  minApr: number;
  meanApr: number;
  feeRate: number | null;
  maxFeeRate: number | null;
  minFeeRate: number | null;
  feeFixed: number | null;
  maxFeeFixed: number | null;
  minFeeFixed: number | null;
  allowPrepayment: boolean;
  prepaymentFee: number;
  monthlyPayment: number;
  maxMonthlyPayment: number;
  minMonthlyPayment: number;
  meanMonthlyPayment: number;
  maxTotalPayment: number;
  minTotalPayment: number;
  meanTotalPayment: number;
  terms: string | null;
  url: string;
  preQualified: boolean;
  preApproved: boolean;
  sponsored: boolean;
  aprType: string;
  recommendationScore: number;
  amountPrefix: string | null;
}

export class PartnerDto {
  uuid: string;
  name: string;
  description: string;
  disclaimer: string;
  imageUrl: string;
}

export class PendingResponseDto {
  partner: PartnerDto;
  productTypes: string[];
}

export class PendingOriginatorDto {
  key: string;
  name: string;
  description: string;
  images: { sizeKey: string; url: string }[];
  disclaimer: string;
}

export class PersonalLoanResponseDto {
  uuid: string;
  leadUuid: string;
  loanOffers: LoanOfferDto[];
  specialOffers: any[];
  savingsOffers: any[];
  creditCardOffers: any[];
  mortgageOffers: any[];
  pendingResponses: PendingResponseDto[];
  pendingOriginators: PendingOriginatorDto[];
}
