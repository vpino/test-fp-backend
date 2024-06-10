import { Controller, Request, Post, Get, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthValidation } from './dto/auth.validation.dto';
import { SkipJwtAuth } from '../../common/decorators/skip-guard.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipJwtAuth()
  @Post('login')
  async login(@Body() body: AuthValidation) {
    return this.authService.login(body);
  }

  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
