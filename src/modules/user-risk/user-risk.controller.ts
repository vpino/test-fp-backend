
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ResponseDTO } from '../../common/dtos/response.dto';
import { SkipJwtAuth } from 'src/common/decorators/skip-guard.decorator';
import { UserRiskService } from './user-risk.service';
import { CreateUserRiskDto } from './dtos/create.user-risk.dto';
import { UpdateUserRiskDto } from './dtos/update.user-risk.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('User Risk')
@Controller('user-risk')
export class UserRiskController {
  constructor(private readonly userRiskService: UserRiskService) { }

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all UserRisks' })
  @ApiResponse({ status: 200, description: 'Return all UserRisks' })
  async getAll(): Promise<ResponseDTO> {
    return await this.userRiskService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a UserRisk by id' })
  @ApiResponse({ status: 200, description: 'Return a UserRisk' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.userRiskService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new UserRisk' })
  @ApiResponse({
    status: 201,
    description: 'The UserRisk has been successfully created.',
  })
  async create(@Body() userRisk: CreateUserRiskDto): Promise<ResponseDTO> {
    return { data: await this.userRiskService.create(userRisk) }
  }

  @SkipJwtAuth()
  @Post('generate')
  @ApiOperation({ summary: 'Create a new UserRisk' })
  @ApiResponse({
    status: 201,
    description: 'The UserRisk has been successfully created.',
  })
  async generate(): Promise<ResponseDTO> {
    return { data: await this.userRiskService.generate() }
  }


  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a UserRisk' })
  @ApiResponse({
    status: 200,
    description: 'The UserRisk has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() userRisk: UpdateUserRiskDto,
  ): Promise<ResponseDTO> {
    return await this.userRiskService.update(id, userRisk);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a UserRisk' })
  @ApiResponse({
    status: 200,
    description: 'The UserRisk has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.userRiskService.deleteOne({ id });
  }
}
