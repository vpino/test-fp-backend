import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PersonalLoan } from './entities/personal-loan.entity';
import { faker } from '@faker-js/faker';
import { CreditCardService } from '../credit-card/credit-card.service';
import { HomeLoanService } from '../home-loan/home-loan.service';
import { CreateLoanDto } from 'src/common/dtos/create.loan.dto';
import { ProductType } from 'src/common/enums/product-type.enum';

@Injectable()
export class PersonalLoanService extends CrudService<PersonalLoan> {
  constructor(
    @InjectRepository(PersonalLoan)
    private personaLoanRepository: Repository<PersonalLoan>,
    private readonly dataSourceInject: DataSource,
    private readonly creditCardService: CreditCardService,
    private readonly homeLoanService: HomeLoanService,
  ) {
    super(personaLoanRepository, 'id', dataSourceInject);
  }

  generateLoanOffer() {
    return {
      uuid: faker.string.uuid(),
      originator: {
        key: faker.lorem.slug(),
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        images: [
          {
            sizeKey: '150',
            url: 'aff-tag.fuap.com/images/lendingclub/lendingclub_120.png', //faker.image.url(),
          },
        ],
        disclaimer: faker.lorem.sentence(),
      },
      originatorId: null,
      termLength: faker.datatype.number({ min: 12, max: 60 }),
      termUnit: 'month',
      maxAmount: faker.datatype.number({ min: 5000, max: 50000 }),
      minAmount: faker.datatype.number({ min: 500, max: 5000 }),
      maxApr: faker.datatype.float({ min: 10, max: 50 }),
      minApr: faker.datatype.float({ min: 5, max: 10 }),
      meanApr: faker.datatype.float({ min: 7.5, max: 30 }),
      feeRate: null,
      maxFeeRate: null,
      minFeeRate: null,
      feeFixed: null,
      maxFeeFixed: null,
      minFeeFixed: null,
      allowPrepayment: faker.datatype.boolean(),
      prepaymentFee: faker.datatype.number({ min: 0, max: 100 }),
      monthlyPayment: faker.datatype.float({ min: 50, max: 500 }),
      maxMonthlyPayment: faker.datatype.float({ min: 50, max: 500 }),
      minMonthlyPayment: faker.datatype.float({ min: 50, max: 500 }),
      meanMonthlyPayment: faker.datatype.float({ min: 50, max: 500 }),
      maxTotalPayment: faker.datatype.number({ min: 1000, max: 100000 }),
      minTotalPayment: faker.datatype.number({ min: 1000, max: 100000 }),
      meanTotalPayment: faker.datatype.number({ min: 1000, max: 100000 }),
      terms: null,
      url: faker.internet.url(),
      preQualified: faker.datatype.boolean(),
      preApproved: faker.datatype.boolean(),
      sponsored: faker.datatype.boolean(),
      aprType: 'fixed',
      recommendationScore: faker.datatype.number({ min: 0, max: 100 }),
      amountPrefix: null,
    };
  }

  generateResponse() {
    return {
      uuid: faker.string.uuid(),
      PartnerUuid: faker.string.uuid(),
      loanOffers: Array.from({ length: 3 }, () => this.generateLoanOffer()), // Genera 3 ofertas de préstamo
      specialOffers: [],
      savingsOffers: [],
      creditCardOffers: [],
      mortgageOffers: [],
      pendingResponses: [
        {
          partner: {
            uuid: faker.string.uuid(),
            name: faker.company.name(),
            description: faker.lorem.sentence(),
            disclaimer: faker.lorem.sentence(),
            imageUrl: faker.image.url(),
          },
          productTypes: ['loan'],
        },
      ],
    };
  }

  generatePersonalLoanOffer() {
    return {
      uuid: faker.string.uuid(),
      originator: {
        key: 'lending-club',
        name: 'LendingClub',
        description: 'Low fixed rate personal loans from $1,000 to $40,000',
        images: [
          {
            sizeKey: '150',
            url: 'aff-tag.fuap.com/images/lendingclub/lendingclub_120.png',
          },
        ],
        disclaimer: faker.lorem.sentence(),
      },
      originatorId: null,
      termLength: faker.number.int({ min: 12, max: 60 }),
      termUnit: 'month',
      maxAmount: faker.number.int({ min: 5000, max: 40000 }),
      minAmount: faker.number.int({ min: 1000, max: 5000 }),
      maxApr: faker.number.float({ min: 10, max: 40 }),
      minApr: faker.number.float({ min: 5, max: 10 }),
      meanApr: faker.number.float({ min: 10, max: 30 }),
      feeRate: null,
      maxFeeRate: null,
      minFeeRate: null,
      feeFixed: null,
      maxFeeFixed: null,
      minFeeFixed: null,
      allowPrepayment: faker.datatype.boolean(),
      prepaymentFee: faker.number.int({ min: 0, max: 100 }),
      monthlyPayment: faker.number.float({ min: 50, max: 500 }),
      maxMonthlyPayment: faker.number.float({ min: 500, max: 700 }),
      minMonthlyPayment: faker.number.float({ min: 50, max: 500 }),
      meanMonthlyPayment: faker.number.float({ min: 100, max: 600 }),
      maxTotalPayment: faker.number.int({ min: 1000, max: 10000 }),
      minTotalPayment: faker.number.int({ min: 500, max: 1000 }),
      meanTotalPayment: faker.number.int({ min: 1000, max: 5000 }),
      terms: null,
      url: faker.internet.url(),
      preQualified: faker.datatype.boolean(),
      preApproved: faker.datatype.boolean(),
      sponsored: faker.datatype.boolean(),
      aprType: 'fixed',
      recommendationScore: faker.number.int({ min: 0, max: 100 }),
      amountPrefix: null,
    };
  }

  generateCreditCardOffer() {
    return {
      uuid: faker.string.uuid(),
      partner: {
        uuid: faker.string.uuid(),
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        disclaimer: faker.lorem.sentence(),
        supportsPersonalizedOffers: faker.datatype.boolean(),
        supportsPreSelect: faker.datatype.boolean(),
        imageUrl: faker.image.url(),
      },
      marketplace: {
        uuid: faker.string.uuid(),
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        disclaimer: faker.lorem.sentence(),
        imageUrl: faker.image.url(),
      },
      productType: 'credit_card',
      productSubType: 'credit_card',
      url: faker.internet.url(),
      details: {
        cardName: faker.finance.accountName(),
        cardImageUrl: faker.image.url(),
        cardPurposes: ['travel_incentives'],
        ratesUrl: faker.internet.url(),
        maxPurchaseApr: faker.number.float({ min: 10, max: 25 }),
        minPurchaseApr: faker.number.float({ min: 5, max: 10 }),
        maxPurchaseIntroApr: faker.number.float({ min: 0, max: 5 }),
        minPurchaseIntroApr: faker.number.float({ min: 0, max: 5 }),
        purchaseIntroAprTerm: faker.number.int({ min: 6, max: 18 }),
        purchaseIntroAprTermUnit: 'month',
        maxCashAdvanceApr: faker.number.float({ min: 10, max: 25 }),
        minCashAdvanceApr: faker.number.float({ min: 5, max: 10 }),
        maxCashAdvanceIntroApr: faker.number.float({ min: 0, max: 5 }),
        minCashAdvanceIntroApr: faker.number.float({ min: 0, max: 5 }),
        cashAdvanceIntroAprTerm: faker.number.int({ min: 6, max: 18 }),
        cashAdvanceIntroAprTermUnit: 'month',
        maxBalanceTransferApr: faker.number.float({ min: 10, max: 25 }),
        minBalanceTransferApr: faker.number.float({ min: 5, max: 10 }),
        maxBalanceTransferIntroApr: faker.number.float({ min: 0, max: 5 }),
        minBalanceTransferIntroApr: faker.number.float({ min: 0, max: 5 }),
        balanceTransferIntroAprTerm: faker.number.int({ min: 6, max: 18 }),
        balanceTransferIntroAprTermUnit: 'month',
        annualFee: faker.number.int({ min: 0, max: 500 }),
        annualIntroFee: 0,
        annualIntroFeeTerm: 1,
        details: [faker.lorem.sentence()],
        additionalDetails: [faker.lorem.sentence()],
        cardType: 'visa',
        minimumCreditLine: faker.number.int({ min: 1000, max: 5000 }),
        minimumPenaltyApr: faker.number.float({ min: 5, max: 25 }),
        maximumPenaltyApr: faker.number.float({ min: 10, max: 35 }),
        balanceTransferFee: faker.number.int({ min: 0, max: 100 }),
        cashAdvanceFee: faker.number.int({ min: 0, max: 100 }),
        lateFee: faker.number.int({ min: 0, max: 50 }),
        foreignExchangeFee: faker.number.int({ min: 0, max: 50 }),
        accountOpeningFee: 0,
        returnPaymentFee: 0,
        monthlyServiceFee: 0,
        recommendedCreditRatings: ['good'],
        preQualified: faker.datatype.boolean(),
        preApproved: faker.datatype.boolean(),
        preSelected: faker.datatype.boolean(),
        aprType: 'variable',
      },
    };
  }

  generateHomeLoanOffer() {
    return {
      uuid: faker.string.uuid(),
      originator: {
        key: 'lending-club',
        name: 'LendingClub',
        description: 'Low fixed rate home loans from $100,000 to $750,000',
        images: [
          {
            sizeKey: '150',
            url: 'aff-tag.fuap.com/images/lendingclub/lendingclub_120.png',
          },
        ],
        disclaimer: faker.lorem.sentence(),
      },
      originatorId: null,
      termLength: faker.number.int({ min: 60, max: 360 }),
      termUnit: 'month',
      maxAmount: faker.number.int({ min: 100000, max: 750000 }),
      minAmount: faker.number.int({ min: 100000, max: 750000 }),
      maxApr: faker.number.float({ min: 2, max: 7 }),
      minApr: faker.number.float({ min: 1, max: 2 }),
      meanApr: faker.number.float({ min: 2, max: 5 }),
      feeRate: null,
      maxFeeRate: null,
      minFeeRate: null,
      feeFixed: null,
      maxFeeFixed: null,
      minFeeFixed: null,
      allowPrepayment: faker.datatype.boolean(),
      prepaymentFee: 0,
      monthlyPayment: faker.number.float({ min: 1000, max: 3000 }),
      maxMonthlyPayment: faker.number.float({ min: 3000, max: 3500 }),
      minMonthlyPayment: faker.number.float({ min: 1000, max: 3000 }),
      meanMonthlyPayment: faker.number.float({ min: 1500, max: 3250 }),
      maxTotalPayment: faker.number.int({ min: 60000, max: 400000 }),
      minTotalPayment: faker.number.int({ min: 60000, max: 400000 }),
      meanTotalPayment: faker.number.int({ min: 80000, max: 300000 }),
      terms: null,
      url: faker.internet.url(),
      preQualified: faker.datatype.boolean(),
      preApproved: faker.datatype.boolean(),
      sponsored: faker.datatype.boolean(),
      aprType: 'fixed',
      recommendationScore: faker.number.int({ min: 0, max: 100 }),
      amountPrefix: null,
    };
  }

  generateLoans(personaLoan: CreateLoanDto) {
    const response = {
      uuid: faker.string.uuid(),
      partnerUuid: faker.string.uuid(),
      loanOffers: [],
      specialOffers: [],
      savingsOffers: [],
      creditCardOffers: [],
      mortgageOffers: [],
      pendingResponses: [],
    };

    if (personaLoan.productTypes.includes(ProductType.Personal_Loan)) {
      response.loanOffers.push(this.generatePersonalLoanOffer());
    }

    if (personaLoan.productTypes.includes(ProductType.Credit_Card)) {
      response.creditCardOffers.push(this.generateCreditCardOffer());
    }

    if (personaLoan.productTypes.includes(ProductType.Home_Loan)) {
      response.mortgageOffers.push(this.generateHomeLoanOffer());
    }

    return response;
  }
}
