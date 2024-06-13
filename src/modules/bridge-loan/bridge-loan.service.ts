import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BridgeLoan } from './entities/bridge-loan.entity';
import { GenerateBridgeLoanDto } from './dtos/generate.bridge-loan.dto';
import { ResponseDTO } from 'src/common/dtos';
import { faker } from '@faker-js/faker';

@Injectable()
export class BridgeLoanService extends CrudService<BridgeLoan> {
  constructor(
    @InjectRepository(BridgeLoan)
    private bridgeLoanRepository: Repository<BridgeLoan>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(bridgeLoanRepository, 'id', dataSourceInject);
  }

  async generate(generateBridgeLoan: GenerateBridgeLoanDto): Promise<any> {
    return {
      loanConnection: this.generateLoanConnection(),
      customer: this.generateCustomer(),
      loanOffer: this.generateLoanOffer(),
    };
  }

  generateLoanConnection() {
    return {
      LoanConnectionID: faker.datatype.uuid(),
      createdAt: faker.date.recent().toISOString(),
      status: 'Pending',
    };
  }

  generateCustomer() {
    return {
      customerID: faker.string.uuid(),
      riskID: faker.string.uuid(),
    };
  }

  generateLoanOffer() {
    return {
      LoanOfferID: faker.string.uuid(),
      PartnerID: faker.string.uuid(),
      productTypes: ['Personal_loan'],
    };
  }

  generateAllData() {
    return {
      loanConnection: this.generateLoanConnection(),
      customer: this.generateCustomer(),
      loanOffer: this.generateLoanOffer(),
    };
  }
}
