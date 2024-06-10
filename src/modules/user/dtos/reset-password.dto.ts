import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';
import { passwdDescription, passwordOpts } from '../settings/password';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @IsStrongPassword(passwordOpts, { message: passwdDescription })
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsStrongPassword(passwordOpts, { message: passwdDescription })
  newPassword: string;
}
