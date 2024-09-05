import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PersonalLoan } from './entities/personal-loan.entity';
import { LoanDetailsMounthlyDto } from './dtos/loan-details-mounthly.dto';
import { CustomerService } from '../customer/customer.service';
import { StatusPersonalLoan } from './enums/personal-loan.enum';
import { UpdateTermsLoanDto } from './dtos/update.terms-loan.dto';
import { UpdateAssetsDto } from './dtos/update.assets.dto';
import { UpdateTermsAndConditionsDto } from './dtos/update.terms-and-conditions.dto';
import { IPersonalLoan } from './interfaces/personal-loan.interfaces';

@Injectable()
export class PersonalLoanService extends CrudService<PersonalLoan> {
  constructor(
    @InjectRepository(PersonalLoan)
    private personalLoanRepository: Repository<PersonalLoan>,
    private readonly dataSourceInject: DataSource,
    private customerService: CustomerService,
  ) {
    super(personalLoanRepository, 'id', dataSourceInject);
  }

  async loanDetailsMounthly(
    customerId: string,
    dto: LoanDetailsMounthlyDto,
  ): Promise<IPersonalLoan> {
    const customer = await this.customerService.findOne({ id: customerId });

    if (!customer || !customer.data) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    const personalLoan = this.personalLoanRepository.create({
      customer: customer.data,
      monthlyIncome: dto.monthlyIncome,
      monthlyBills: dto.monthlyBills,
      status: StatusPersonalLoan.TEMRS_LOAN,
    });

    const loan = await this.personalLoanRepository.save(personalLoan);

    const response: IPersonalLoan = {
      id: loan.id,
      monthlyIncome: loan.monthlyIncome,
      monthlyBills: loan.monthlyBills,
      amount: loan.amount,
      duration: loan.duration,
      assets: loan.assets,
      assetsAmount: loan.assetsAmount,
      tc: loan.tc,
      status: loan.status,
      isActive: loan.isActive,
      isDeleted: loan.isDeleted,
      createdAt: loan.createdAt,
      updatedAt: loan.updatedAt,
    };

    return response;
  }

  async updateTermsLoan(
    personalLoanId: string,
    dto: UpdateTermsLoanDto,
  ): Promise<IPersonalLoan> {
    const { amount, duration } = dto;

    const personalLoan = await this.findOne({ id: personalLoanId });

    if (!personalLoan || !personalLoan.data) {
      throw new NotFoundException(
        `Personal loan ID ${personalLoanId} not found`,
      );
    }

    personalLoan.data.amount = amount;
    personalLoan.data.duration = duration;
    personalLoan.data.status = StatusPersonalLoan.ASSETS;

    const loan = await this.personalLoanRepository.save(personalLoan.data);

    const response: IPersonalLoan = {
      id: loan.id,
      monthlyIncome: loan.monthlyIncome,
      monthlyBills: loan.monthlyBills,
      amount: loan.amount,
      duration: loan.duration,
      assets: loan.assets,
      assetsAmount: loan.assetsAmount,
      tc: loan.tc,
      status: loan.status,
      isActive: loan.isActive,
      isDeleted: loan.isDeleted,
      createdAt: loan.createdAt,
      updatedAt: loan.updatedAt,
    };

    return response;
  }

  async updateAssets(
    personalLoanId: string,
    dto: UpdateAssetsDto,
  ): Promise<IPersonalLoan> {
    const personalLoan = await this.findOne({ id: personalLoanId });

    if (!personalLoan || !personalLoan.data) {
      throw new NotFoundException(
        `Personal loan for personal Loan ID ${personalLoanId} not found`,
      );
    }

    personalLoan.data.assets = dto.assets;
    personalLoan.data.assetsAmount = dto.assetsAmount;
    personalLoan.data.status = StatusPersonalLoan.TC;

    const loan = await this.personalLoanRepository.save(personalLoan.data);

    const response: IPersonalLoan = {
      id: loan.id,
      monthlyIncome: loan.monthlyIncome,
      monthlyBills: loan.monthlyBills,
      amount: loan.amount,
      duration: loan.duration,
      assets: loan.assets,
      assetsAmount: loan.assetsAmount,
      tc: loan.tc,
      status: loan.status,
      isActive: loan.isActive,
      isDeleted: loan.isDeleted,
      createdAt: loan.createdAt,
      updatedAt: loan.updatedAt,
    };

    return response;
  }

  async updateTermsAndConditions(
    id: string,
    dto: UpdateTermsAndConditionsDto,
  ): Promise<IPersonalLoan> {
    const personalLoan = await this.findOne({ id });

    if (!personalLoan || !personalLoan.data) {
      throw new NotFoundException(`Personal loan for ID ${id} not found`);
    }

    personalLoan.data.tc = dto.tc;
    personalLoan.data.status = StatusPersonalLoan.CREATED;

    const loan = await this.personalLoanRepository.save(personalLoan.data);

    const response: IPersonalLoan = {
      id: loan.id,
      monthlyIncome: loan.monthlyIncome,
      monthlyBills: loan.monthlyBills,
      amount: loan.amount,
      duration: loan.duration,
      assets: loan.assets,
      assetsAmount: loan.assetsAmount,
      tc: loan.tc,
      status: loan.status,
      isActive: loan.isActive,
      isDeleted: loan.isDeleted,
      createdAt: loan.createdAt,
      updatedAt: loan.updatedAt,
    };

    return response;
  }
}
