import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entities/user.entity';
import { ResponseDTO } from 'src/common/dtos/response.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.key'),
    });
  }

  async validate(payload: any) {
    const response: ResponseDTO = await this.userService.findOne({
      email: payload.email,
    });

    if (!response || !response.data) {
      return null;
    }

    const user = response.data as User;

    return {
      email: user.email,
      phone: '',
      name: '',
    };
  }
}
