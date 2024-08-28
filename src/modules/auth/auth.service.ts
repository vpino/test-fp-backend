import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthValidation } from './dto/auth.validation.dto';
import { ResponseDTO } from '../../common/dtos/response.dto';
import * as bcrypt from 'bcrypt';
import { MESSAGES } from '../../common/constans/messages';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/entities/customer.entity';
import { CreateCustomerDto } from '../customer/dtos/create.customer.dto';
import { IndividualCustomerService } from '../individual-customer/individual-customer.service';
import { LoginResponse } from './interfaces/LoginResponse';
import { IndividualCustomer } from '../individual-customer/entities/individual-customer.entity';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private individualCustomerService: IndividualCustomerService,

    private jwtService: JwtService,
  ) {}

  async validateCustomer(
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    const response: ResponseDTO<Customer> = await this.customerService.findOne({
      email,
    });

    if (!response || !response.data) {
      throw new UnauthorizedException(MESSAGES.INVALID_CREDENTIALS_ERROR);
    }

    const customer = response.data;

    const individualCustomer: ResponseDTO<IndividualCustomer> =
      await this.individualCustomerService.findOne({
        customerId: { id: customer.id },
      });

    const individual = individualCustomer.data;

    const comparePass = await bcrypt.compare(password, customer.password);

    if (!comparePass) {
      throw new UnauthorizedException(MESSAGES.INVALID_CREDENTIALS_ERROR);
    }

    return { customer, individual };
  }

  async login(data: AuthValidation): Promise<ResponseDTO> {
    const response = await this.validateCustomer(data.email, data.password);

    const payload = {
      email: response.customer.email,
      id: response.customer.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      data: {
        status: response?.customer?.isActive,
        access_token: accessToken,
        individual: response?.individual,
        id: response?.customer?.id,
      },
    };
  }

  async signUp(data: CreateCustomerDto): Promise<ResponseDTO> {
    return await this.customerService.save(data);
  }
}
