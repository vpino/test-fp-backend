
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreditCard } from './entities/credit-card.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class CreditCardService extends CrudService<CreditCard> {
  constructor(
    @InjectRepository(CreditCard) private creditCardRepository: Repository<CreditCard>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(creditCardRepository, 'id', dataSourceInject);
  }

  generateCreditCardOffer() {
    return {
      uuid: faker.datatype.uuid(),
      partner: {
        uuid: faker.datatype.uuid(),
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        disclaimer: faker.lorem.sentence(),
        supportsPersonalizedOffers: faker.datatype.boolean(),
        supportsPreSelect: faker.datatype.boolean(),
        imageUrl: faker.image.url(),
      },
      marketplace: {
        uuid: faker.datatype.uuid(),
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        disclaimer: faker.lorem.sentence(),
        imageUrl: faker.image.imageUrl(),
      },
      productType: 'credit_card',
      productSubType: 'credit_card',
      url: faker.internet.url(),
      details: {
        cardName: faker.finance.creditCardIssuer(),
        cardImageUrl: faker.image.url(),
        cardPurposes: [faker.lorem.word()],
        ratesUrl: faker.internet.url(),
        maxPurchaseApr: faker.number.float({ min: 10, max: 30 }),
        minPurchaseApr: faker.number.float({ min: 5, max: 10 }),
        maxPurchaseIntroApr: faker.number.float({ min: 0, max: 10 }),
        minPurchaseIntroApr: faker.number.float({ min: 0, max: 5 }),
        purchaseIntroAprTerm: faker.number.int({ min: 6, max: 24 }),
        purchaseIntroAprTermUnit: 'month',
        maxCashAdvanceApr: faker.number.float({ min: 10, max: 30 }),
        minCashAdvanceApr: faker.number.float({ min: 5, max: 10 }),
        maxCashAdvanceIntroApr: faker.number.float({ min: 0, max: 10 }),
        minCashAdvanceIntroApr: faker.number.float({ min: 0, max: 5 }),
        cashAdvanceIntroAprTerm: faker.number.int({ min: 6, max: 24 }),
        cashAdvanceIntroAprTermUnit: 'month',
        maxBalanceTransferApr: faker.number.float({ min: 10, max: 30 }),
        minBalanceTransferApr: faker.number.float({ min: 5, max: 10 }),
        maxBalanceTransferIntroApr: faker.number.float({ min: 0, max: 10 }),
        minBalanceTransferIntroApr: faker.number.float({ min: 0, max: 5 }),
        balanceTransferIntroAprTerm: faker.number.int({ min: 6, max: 24 }),
        balanceTransferIntroAprTermUnit: 'month',
        annualFee: faker.number.int({ min: 0, max: 500 }),
        annualIntroFee: faker.number.int({ min: 0, max: 500 }),
        annualIntroFeeTerm: faker.number.int({ min: 1, max: 2 }),
        details: [faker.lorem.sentence()],
        additionalDetails: [faker.lorem.sentence()],
        cardType: faker.finance.creditCardIssuer(),
        minimumCreditLine: faker.number.int({ min: 1000, max: 5000 }),
        minimumPenaltyApr: faker.number.float({ min: 5, max: 30 }),
        maximumPenaltyApr: faker.number.float({ min: 5, max: 30 }),
        balanceTransferFee: faker.number.int({ min: 0, max: 100 }),
        cashAdvanceFee: faker.number.int({ min: 0, max: 100 }),
        lateFee: faker.number.int({ min: 0, max: 100 }),
        foreignExchangeFee: faker.number.int({ min: 0, max: 100 }),
        accountOpeningFee: faker.number.int({ min: 0, max: 100 }),
        returnPaymentFee: faker.number.int({ min: 0, max: 100 }),
        monthlyServiceFee: faker.number.int({ min: 0, max: 100 }),
        recommendedCreditRatings: [faker.lorem.word()],
        preQualified: faker.datatype.boolean(),
        preApproved: faker.datatype.boolean(),
        preSelected: faker.datatype.boolean(),
        aprType: 'variable',
      }
    };
  }

  generatePendingResponse() {
    return {
      partner: {
        uuid: faker.string.uuid(),
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        disclaimer: faker.lorem.sentence(),
        imageUrl: faker.image.url(),
      },
      productTypes: ['credit_card'],
    };
  }

  generateResponse() {
    return {
      uuid: faker.datatype.uuid(),
      leadUuid: faker.datatype.uuid(),
      loanOffers: [],
      specialOffers: [],
      savingsOffers: [],
      creditCardOffers: Array.from({ length: 2 }, () => this.generateCreditCardOffer()), // Genera 2 ofertas de tarjetas de crédito
      mortgageOffers: [],
      pendingResponses: Array.from({ length: 1 }, () => this.generatePendingResponse()), // Genera 1 respuesta pendiente
    };
  }
}

