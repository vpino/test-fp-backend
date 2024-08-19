import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseDTO } from 'src/common/dtos/response.dto';
import { CustomerService } from 'src/modules/customer/customer.service';
import { Customer } from 'src/modules/customer/entities/customer.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private customerService: CustomerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.key'),
    });
  }

  async validate(payload: any) {
    const response: ResponseDTO = await this.customerService.findOne({
      email: payload.email,
    });

    if (!response || !response.data) {
      return null;
    }

    const customer = response.data as Customer;

    return {
      email: customer.email,
      phone: '',
    };
  }
}
