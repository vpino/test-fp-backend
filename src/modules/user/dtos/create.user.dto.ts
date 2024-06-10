import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { UserStatusEnum } from '../../../common/enums/user.enum';

export class CreateUserDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @ApiProperty({ enum: UserStatusEnum })
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  persona: string;
}
