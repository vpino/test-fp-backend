import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { ResponseDTO } from 'src/common/dtos';
import { CreateIndividualCustomerDto } from '../individual-customer/dtos/create.individual-customer.dto';
import { IndividualCustomerService } from '../individual-customer/individual-customer.service';
import { IndividualCustomer } from '../individual-customer/entities/individual-customer.entity';
import { isValidUUID } from 'src/common/functions/valid-uuid.function';
import { CreateCustomerDto } from './dtos/create.customer.dto';
import { IResponseCustomer } from './interfaces/response.customer.interface';
import { IResponseIndividualCustomer } from './interfaces/response.individual-customer.interface';
import { StatusKyc } from 'src/common/enums/customer.enums';

@Injectable()
export class CustomerService extends CrudService<Customer> {
  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    private readonly individualCustomerService: IndividualCustomerService,
    private readonly dataSourceInject: DataSource,
  ) {
    super(customerRepository, 'id', dataSourceInject);
  }

  async save(payload: CreateCustomerDto): Promise<ResponseDTO> {
    try {
      const email = await this.findOne({ email: payload.email });

      if (email?.data) throw new ConflictException('Email already registered');

      const phoneNumber = await this.findOne(
        { phoneNumber: payload.phoneNumber }
      );

      if (phoneNumber?.data) throw new ConflictException('Phone number already registered')

      const newCustomer = await this.customerRepository.create(payload);
      const createdCustomer = await this.customerRepository.save(newCustomer);

      const customer: IResponseCustomer = {
        customerId: createdCustomer.id,
        createdAt: createdCustomer.createdAt
      };

      return { data: customer };
    } catch (error) {
      throw error;
    }
  }

  async getKycRequirements(country: string): Promise<ResponseDTO> {
    let kycRequiredFields = [];

    const dto = new CreateIndividualCustomerDto();

    const countryRequirements = {
      'BRA': {
        required: [],
        notRequired: [],
        DNI: 'CPF'
      },
      'MEX': {
        required: [],
        notRequired: [],
        DNI: 'INE'
      },
    };

    for (const key of Object.keys(dto)) {

      if (Reflect.getMetadata('dontDisplay', dto, key)) {
        continue;
      }

      const type = Reflect.getMetadata('design:type', dto, key).name;

      const field = {
        fieldName: key,
        required: !Reflect.hasMetadata('optional', dto, key),
        type: (key.includes('doc')) ? 'FILE_UPLOAD' : key.includes('date') ? 'DATE' : type.toUpperCase()
      };

      kycRequiredFields.push(field);
    }

    if (countryRequirements.hasOwnProperty(country)) {
      const requirements = countryRequirements[country];
      requirements.required.forEach(fieldName => {
        const field = kycRequiredFields.find(field => field.fieldName === fieldName);
        if (field) {
          field.required = true;
        }
      });

      requirements.notRequired.forEach(fieldName => {
        kycRequiredFields = kycRequiredFields.filter(field => field.fieldName !== fieldName);
      });
    }

    return { data: { kycRequiredFields } }
  }

  async submitKyc(payload: CreateIndividualCustomerDto, customerId: string): Promise<ResponseDTO> {
    try {
      if (!isValidUUID(customerId)) {
        const reasons = {
          message: `${customerId} is invalid`,
          path: 'customerId',
          validation: 'isInvalid'
        };

        throw new HttpException({
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'A logic validation has not been fulfilled',
          reasons: reasons,
          code: 'VALIDATION_ERROR'
        }, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      const country = payload.country;
      const requiredFields = this.getRequiredFieldsForCountry(country);
      const missingFields = requiredFields.filter(fieldName => !(fieldName in payload));

      if (missingFields.length > 0) {
        const reasons = missingFields.map(fieldName => ({
          message: `${fieldName} is required`,
          path: fieldName,
          validation: 'isRequired'
        }));

        throw new HttpException({
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'A logic validation has not been fulfilled',
          reasons: reasons,
          code: 'VALIDATION_ERROR'
        }, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      const customer = await this.findOne({ id: customerId });

      if (!customer?.data) throw new NotFoundException('Customer not found')

      const customerKyc = await this.individualCustomerService.findOne({ customerId: { id: customerId }});

      if (customerKyc?.data) throw new BadRequestException('KYC record cannot be retried')

      payload.customerId = customerId

      const individualCustomerCreated = await this.individualCustomerService.create(payload)

      if (!individualCustomerCreated) {
        throw new HttpException(
          'Error when save submission KYC',
          HttpStatus.BAD_REQUEST,
        );
      }

      const response: IResponseIndividualCustomer = {
        submissionId: individualCustomerCreated.id,
        createdAt: individualCustomerCreated.createdAt
      }

      return { data: response }
    } catch (error) {
      throw error
    }
  }

  private getRequiredFieldsForCountry(country: string): string[] {
    const countryRequirements = {
      BR: [],
      MX: [],
    };

    return countryRequirements[country] || [];
  }

  async updateKyc(individualCustomer: CreateIndividualCustomerDto, customerId: string, submissionId: string): Promise<ResponseDTO> {
    try {
      if (!isValidUUID(customerId)) {
        const reasons = {
          message: `${customerId} is invalid`,
          path: 'customerId',
          validation: 'isInvalid'
        };

        throw new HttpException({
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'A logic validation has not been fulfilled',
          reasons: reasons,
          code: 'VALIDATION_ERROR'
        }, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      if (!isValidUUID(submissionId)) {
        const reasons = {
          message: `${submissionId} is invalid`,
          path: 'submissionId',
          validation: 'isInvalid'
        };

        throw new HttpException({
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'A logic validation has not been fulfilled',
          reasons: reasons,
          code: 'VALIDATION_ERROR'
        }, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      const customer = await this.findOne({ id: customerId });

      if (!customer?.data) throw new NotFoundException('Customer not found');

      let checkIndividualCustomer = await this.individualCustomerService.findOne(
        {
          customerId: { id: customerId },
          id: submissionId
        }
      );

      if (!checkIndividualCustomer?.data) throw new NotFoundException('Customer Kyc not found');

      if (checkIndividualCustomer?.data?.statusKyc === StatusKyc.COMPLETED) {
        throw new HttpException(
          'You cannot edit the information since it is in a completed status.',
          HttpStatus.BAD_REQUEST,
        );
      }

      checkIndividualCustomer.data = { ...checkIndividualCustomer?.data, ...individualCustomer };

      delete checkIndividualCustomer?.data?.updatedAt

      const updateResult = await this.individualCustomerService.update(submissionId, checkIndividualCustomer?.data);

      if (!updateResult?.data) {
        throw new HttpException(
          'Error when updating customer Kyc',
          HttpStatus.BAD_REQUEST,
        );
      }

      const response: IResponseIndividualCustomer = {
        submissionId: updateResult?.data?.id,
        updatedAt: updateResult?.data?.updatedAt,
        status: updateResult?.data?.statusKyc
      }

      return { data: response }
    } catch (error) {
      throw error
    }
  }
}
