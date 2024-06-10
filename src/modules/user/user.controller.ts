import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ResponseDTO } from '../../common/dtos/response.dto';
import { UserService } from './user.service';
import { CreateUserAndPersonaDto } from './dtos/create.user.person.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiBearerAuth('JWT-auth')
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  async getAll(): Promise<ResponseDTO> {
    return this.userService.getAll({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return a user' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return this.userService.findOne({ _id: id });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async create(@Body() data: CreateUserAndPersonaDto): Promise<ResponseDTO> {
    return this.userService.createUserAndPersona(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() data: CreateUserAndPersonaDto,
  ): Promise<ResponseDTO> {
    return this.userService.updateUserAndPersona(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return this.userService.deleteUserAndPersona(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reset-password')
  async resetPassword(
    @Req() request: any,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    const email = request.user.email;
    return await this.userService.resetPassword(resetPasswordDto, email);
  }
}
