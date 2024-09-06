import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { HomeLoan } from './entities/home-loan.entity';
import { TypeHomeDto } from './dtos/update.type-home.dto';
import { CustomerService } from '../customer/customer.service';
import { UpdateHomeAssetsDto } from './dtos/update.assets.dto';
import { UpdatePaymentInitialDto } from './dtos/update.payment-initial.dto';
import { UpdatePriceHomeDto } from './dtos/update.price-home.dto';
import { PropertyUsageDto } from './dtos/update.property-usage.dto';
import { UpdateTermsAndConditionsDto } from './dtos/update.terms-and-conditions.dto';
import { UpdateAddressHomeDto } from './dtos/update.address-home.dto';
import { UpdateHomeLoanMounthlyDetailsDto } from './dtos/update.home-mounthly-details.dto';
import { StatusHomeLoan } from './enums/home-loan.enum';

@Injectable()
export class HomeLoanService extends CrudService<HomeLoan> {
  constructor(
    @InjectRepository(HomeLoan)
    private homeLoanRepository: Repository<HomeLoan>,
    private readonly dataSourceInject: DataSource,
    private customerService: CustomerService,
  ) {
    super(homeLoanRepository, 'id', dataSourceInject);
  }

  private async findHomeLoanById(id: string): Promise<HomeLoan> {
    const homeLoan = await this.findOne({ id });
    if (!homeLoan || !homeLoan.data) {
      throw new NotFoundException(`HomeLoan with id ${id} not found`);
    }
    return homeLoan.data;
  }

  async updatePropertyUsage(
    customerId: string,
    propertyUsageDto: PropertyUsageDto,
  ): Promise<HomeLoan> {
    const customer = await this.customerService.findOne({ id: customerId });

    if (!customer || !customer.data) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    const homeLoan = this.homeLoanRepository.create({
      customer: customer.data,
      propertyUsage: propertyUsageDto.propertyUsage,
      status: StatusHomeLoan.TYPE_HOME,
    });

    return this.homeLoanRepository.save(homeLoan);
  }

  async updateTypeHome(
    id: string,
    typeHomeDto: TypeHomeDto,
  ): Promise<HomeLoan> {
    try {
      const homeLoan = await this.findHomeLoanById(id);

      homeLoan.typeHome = typeHomeDto.typeHome;
      homeLoan.status = StatusHomeLoan.ADDRESS;

      return this.homeLoanRepository.save(homeLoan);
    } catch (error) {
      throw error;
    }
  }

  async updateAddress(
    id: string,
    addressDto: UpdateAddressHomeDto,
  ): Promise<HomeLoan> {
    const homeLoan = await this.findHomeLoanById(id);

    homeLoan.address = addressDto.address;
    homeLoan.state = addressDto.state;
    homeLoan.city = addressDto.city;
    homeLoan.town = addressDto.town;
    homeLoan.status = StatusHomeLoan.PRICE;

    return this.homeLoanRepository.save(homeLoan);
  }

  async updatePriceHome(
    id: string,
    updatePriceHomeDto: UpdatePriceHomeDto,
  ): Promise<HomeLoan> {
    const homeLoan = await this.findHomeLoanById(id);

    homeLoan.priceHome = updatePriceHomeDto.priceHome;
    homeLoan.status = StatusHomeLoan.PAYMENT_INITIAL;

    return this.homeLoanRepository.save(homeLoan);
  }

  async updatePaymentInitial(
    id: string,
    updatePaymentInitialDto: UpdatePaymentInitialDto,
  ): Promise<HomeLoan> {
    const homeLoan = await this.findHomeLoanById(id);

    homeLoan.paymentInitial = updatePaymentInitialDto.paymentInitial;
    homeLoan.status = StatusHomeLoan.MOUNTLY_FINANCE;

    return this.homeLoanRepository.save(homeLoan);
  }

  async updateMounthlyDetails(
    id: string,
    updateMounthlyDetailsDto: UpdateHomeLoanMounthlyDetailsDto,
  ): Promise<HomeLoan> {
    const homeLoan = await this.findHomeLoanById(id);

    homeLoan.monthlyIncome = Number(updateMounthlyDetailsDto.monthlyIncome);
    homeLoan.monthlyDebt = Number(updateMounthlyDetailsDto.monthlyBills);
    homeLoan.status = StatusHomeLoan.ASSETS;

    return this.homeLoanRepository.save(homeLoan);
  }

  async updateAssets(
    id: string,
    updateAssetsDto: UpdateHomeAssetsDto,
  ): Promise<HomeLoan> {
    const homeLoan = await this.findHomeLoanById(id);

    homeLoan.assets = updateAssetsDto.assets;
    homeLoan.assetsAmount = updateAssetsDto.assetsAmount;
    homeLoan.status = StatusHomeLoan.TC;

    return this.homeLoanRepository.save(homeLoan);
  }

  async updateTermsAndConditions(
    id: string,
    updateTermsAndConditionsDto: UpdateTermsAndConditionsDto,
  ): Promise<HomeLoan> {
    const homeLoan = await this.findHomeLoanById(id);
    homeLoan.tc = updateTermsAndConditionsDto.tc;
    return this.homeLoanRepository.save(homeLoan);
  }
}
