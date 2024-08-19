import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthValidation } from './dto/auth.validation.dto';
import { ResponseDTO } from '../../common/dtos/response.dto';
import * as bcrypt from 'bcrypt';
import { MESSAGES } from '../../common/constans/messages';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/entities/customer.entity';
import { CreateCustomerDto } from '../customer/dtos/create.customer.dto';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async validateCustomer(email: string, password: string): Promise<Customer> {
    const response: ResponseDTO<Customer> = await this.customerService.findOne({
      email,
    });

    if (!response || !response.data) {
      throw new UnauthorizedException(MESSAGES.INVALID_CREDENTIALS_ERROR);
    }

    const customer = response.data;

    const comparePass = await bcrypt.compare(password, customer.password);

    if (!comparePass) {
      throw new UnauthorizedException(MESSAGES.INVALID_CREDENTIALS_ERROR);
    }

    return customer;
  }

  async login(data: AuthValidation): Promise<ResponseDTO> {
    const customer = await this.validateCustomer(data.email, data.password);

    const payload = {
      email: customer.email,
      _id: customer.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      data: {
        status: customer.isActive,
        access_token: accessToken,
      },
    };
  }

  async signUp(data: CreateCustomerDto): Promise<ResponseDTO> {
    return await this.customerService.save(data);
  }
}
