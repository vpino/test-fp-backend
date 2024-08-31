import { Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { IndividualCustomer } from './entities/individual-customer.entity';
import { AddressDTO } from './dtos/address.dto';
import { CompanyInfoDTO } from './dtos/company-info.dto';
import { ContactInfoDTO } from './dtos/contact-info.dto';
import { EducationDataDTO } from './dtos/education-data.dto';
import { HousingDataDTO } from './dtos/housing-data.dto';
import { IdentityDocumentDTO } from './dtos/identity-document.dto';
import { OccupationDTO } from './dtos/occupation.dto';
import { StatusOnboarding } from './enums/individual-customer.enum';

@Injectable()
export class IndividualCustomerService extends CrudService<IndividualCustomer> {
  constructor(
    @InjectRepository(IndividualCustomer)
    private individualCustomerRepository: Repository<IndividualCustomer>,
    private readonly dataSourceInject: DataSource,
  ) {
    super(individualCustomerRepository, 'id', dataSourceInject);
  }

  async findCustomerById(customerId: string): Promise<IndividualCustomer> {
    const individualCustomer = await this.individualCustomerRepository.findOne({
      where: { customerId: { id: customerId } },
    });

    if (!individualCustomer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }
    return individualCustomer;
  }

  async updateIdentityDocument(
    id: string,
    identityDocumentDTO: IdentityDocumentDTO,
  ): Promise<IndividualCustomer> {
    const individualCustomer = await this.findCustomerById(id);
    individualCustomer.country = identityDocumentDTO.country;
    individualCustomer.typeDocument = identityDocumentDTO.typeDocument;
    individualCustomer.dni = identityDocumentDTO.dni;
    individualCustomer.status = StatusOnboarding.ADDRESS;

    return this.individualCustomerRepository.save(individualCustomer);
  }

  async updateAddress(
    id: string,
    addressDTO: AddressDTO,
  ): Promise<IndividualCustomer> {
    const individualCustomer = await this.findCustomerById(id);
    individualCustomer.address = addressDTO.address;
    individualCustomer.state = addressDTO.state;
    individualCustomer.city = addressDTO.city;
    individualCustomer.town = addressDTO.town;
    individualCustomer.status = StatusOnboarding.HOUSING;

    return this.individualCustomerRepository.save(individualCustomer);
  }

  async updateHousingData(
    id: string,
    housingDataDTO: HousingDataDTO,
  ): Promise<IndividualCustomer> {
    const individualCustomer = await this.findCustomerById(id);
    individualCustomer.housingType = housingDataDTO.housingType;
    individualCustomer.housingYear = housingDataDTO.housingYear;
    individualCustomer.housingMonth = housingDataDTO.housingMonth;
    individualCustomer.status = StatusOnboarding.EDUCATION;

    return this.individualCustomerRepository.save(individualCustomer);
  }

  async updateEducationData(
    id: string,
    educationDataDTO: EducationDataDTO,
  ): Promise<IndividualCustomer> {
    const individualCustomer = await this.findCustomerById(id);
    individualCustomer.educationLevel = educationDataDTO.educationLevel;
    individualCustomer.educationArea = educationDataDTO.educationArea;
    individualCustomer.educationYear = educationDataDTO.educationYear;
    individualCustomer.status = StatusOnboarding.OCCUPATION;

    return this.individualCustomerRepository.save(individualCustomer);
  }

  async updateOccupation(
    id: string,
    occupationDTO: OccupationDTO,
  ): Promise<IndividualCustomer> {
    const individualCustomer = await this.findCustomerById(id);
    individualCustomer.occupation = occupationDTO.occupation;
    individualCustomer.typeBusiness = occupationDTO.typeBusiness;
    individualCustomer.status = StatusOnboarding.COMPANY;

    return this.individualCustomerRepository.save(individualCustomer);
  }

  async updateCompanyInfo(
    id: string,
    companyInfoDTO: CompanyInfoDTO,
  ): Promise<IndividualCustomer> {
    const individualCustomer = await this.findCustomerById(id);
    individualCustomer.companyName = companyInfoDTO.companyName;
    individualCustomer.companyPhone = companyInfoDTO.companyPhone;
    individualCustomer.companyAddress = companyInfoDTO.companyAddress;
    individualCustomer.companyState = companyInfoDTO.companyState;
    individualCustomer.companyCity = companyInfoDTO.companyCity;
    individualCustomer.companyTown = companyInfoDTO.companyTown;
    individualCustomer.companyYear = companyInfoDTO.companyYear;
    individualCustomer.companyMonth = companyInfoDTO.companyMonth;
    individualCustomer.status = StatusOnboarding.CONTACT;

    return this.individualCustomerRepository.save(individualCustomer);
  }

  async updateContactInfo(
    id: string,
    contactInfoDTO: ContactInfoDTO,
  ): Promise<IndividualCustomer> {
    const individualCustomer = await this.findCustomerById(id);
    individualCustomer.phone = contactInfoDTO.phone;
    individualCustomer.status = StatusOnboarding.COMPLETED;

    return this.individualCustomerRepository.save(individualCustomer);
  }
}
