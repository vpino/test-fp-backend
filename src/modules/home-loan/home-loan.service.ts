import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { HomeLoan } from './entities/home-loan.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class HomeLoanService extends CrudService<HomeLoan> {
  constructor(
    @InjectRepository(HomeLoan)
    private homeLoanRepository: Repository<HomeLoan>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(homeLoanRepository, 'id', dataSourceInject);
  }

  generateMortgageOffer() {
    return {
      uuid: faker.string.uuid(),
      originator: {
        key: faker.lorem.slug(),
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        images: [
          {
            sizeKey: '150',
            url: faker.internet.url(),
          },
        ],
        disclaimer: faker.lorem.sentence(),
      },
      originatorId: null,
      termLength: faker.number.int({ min: 12, max: 360 }),
      termUnit: 'month',
      maxAmount: faker.number.int({ min: 100000, max: 750000 }),
      minAmount: faker.number.int({ min: 1000, max: 100000 }),
      maxApr: faker.number.float({ min: 20, max: 40 }),
      minApr: faker.number.float({ min: 10, max: 20 }),
      meanApr: faker.number.float({ min: 15, max: 30 }),
      feeRate: null,
      maxFeeRate: null,
      minFeeRate: null,
      feeFixed: null,
      maxFeeFixed: null,
      minFeeFixed: null,
      allowPrepayment: faker.datatype.boolean(),
      prepaymentFee: faker.number.int({ min: 0, max: 100 }),
      monthlyPayment: faker.number.float({ min: 100, max: 5000 }),
      maxMonthlyPayment: faker.number.float({ min: 500, max: 7000 }),
      minMonthlyPayment: faker.number.float({ min: 100, max: 5000 }),
      meanMonthlyPayment: faker.number.float({ min: 200, max: 6000 }),
      maxTotalPayment: faker.number.int({ min: 10000, max: 1000000 }),
      minTotalPayment: faker.number.int({ min: 1000, max: 100000 }),
      meanTotalPayment: faker.number.int({ min: 5000, max: 500000 }),
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

  generatePendingResponse() {
    return {
      partner: {
        uuid: faker.string.uuid(),
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        disclaimer: faker.lorem.sentence(),
        imageUrl: faker.image.imageUrl(),
      },
      productTypes: ['credit_card'],
    };
  }

  generateResponse() {
    return {
      uuid: faker.string.uuid(),
      partnerUuid: faker.string.uuid(),
      loanOffers: [],
      specialOffers: [],
      savingsOffers: [],
      creditCardOffers: [],
      mortgageOffers: Array.from({ length: 1 }, () =>
        this.generateMortgageOffer(),
      ), // Genera 1 oferta de hipoteca
      pendingResponses: Array.from({ length: 1 }, () =>
        this.generatePendingResponse(),
      ), // Genera 1 respuesta pendiente
    };
  }
}
