import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthValidation } from './dto/auth.validation.dto';
import { ResponseDTO } from '../../common/dtos/response.dto';
import * as bcrypt from 'bcrypt';
import { MESSAGES } from '../../common/constans/messages';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const response: ResponseDTO<User> = await this.userService.findOne({
      email,
    });

    if (!response || !response.data) {
      throw new UnauthorizedException(MESSAGES.INVALID_CREDENTIALS_ERROR);
    }

    const user = response.data;

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      throw new UnauthorizedException(MESSAGES.INVALID_CREDENTIALS_ERROR);
    }

    return user;
  }

  async login(data: AuthValidation): Promise<ResponseDTO> {
    const user = await this.validateUser(data.email, data.password);

    const payload = {
      email: user.email,
      _id: user.id,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      data: {
        status: user.status,
        access_token: accessToken,
      },
    };
  }
}
