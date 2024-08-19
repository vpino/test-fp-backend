import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthValidation } from './dto/auth.validation.dto';
import { SkipJwtAuth } from '../../common/decorators/skip-guard.decorator';
import { CreateCustomerDto } from '../customer/dtos/create.customer.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipJwtAuth()
  @Post('login')
  async login(@Body() body: AuthValidation) {
    return this.authService.login(body);
  }

  @SkipJwtAuth()
  @Post('sign-up')
  async signUp(@Body() body: CreateCustomerDto) {
    return this.authService.signUp(body);
  }

}
