import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ResponseDTO } from '../../common/dtos/response.dto';
import { SkipJwtAuth } from 'src/common/decorators/skip-guard.decorator';
import { BridgeLoanService } from './bridge-loan.service';
import { CreateBridgeLoanDto } from './dtos/create.bridge-loan.dto';
import { UpdateBridgeLoanDto } from './dtos/update.bridge-loan.dto';
import { GenerateBridgeLoanDto } from './dtos/generate.bridge-loan.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Bridge Loan')
@Controller('bridge-loan')
export class BridgeLoanController {
  constructor(private readonly bridgeLoanService: BridgeLoanService) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all BridgeLoans' })
  @ApiResponse({ status: 200, description: 'Return all BridgeLoans' })
  async getAll(): Promise<ResponseDTO> {
    return await this.bridgeLoanService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a BridgeLoan by id' })
  @ApiResponse({ status: 200, description: 'Return a BridgeLoan' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.bridgeLoanService.findOne({ id });
  }

  // @SkipJwtAuth()
  // @Post()
  // @ApiOperation({ summary: 'Create a new BridgeLoan' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'The BridgeLoan has been successfully created.',
  // })
  // async create(@Body() bridgeLoan: CreateBridgeLoanDto): Promise<ResponseDTO> {
  //   return { data: await this.bridgeLoanService.create(bridgeLoan) }
  // }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new BridgeLoan' })
  @ApiResponse({
    status: 201,
    description: 'The BridgeLoan has been successfully created.',
  })
  async create(@Body() bridgeLoan: GenerateBridgeLoanDto): Promise<any> {
    return await this.bridgeLoanService.generate(bridgeLoan);
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a BridgeLoan' })
  @ApiResponse({
    status: 200,
    description: 'The BridgeLoan has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() bridgeLoan: UpdateBridgeLoanDto,
  ): Promise<ResponseDTO> {
    return await this.bridgeLoanService.update(id, bridgeLoan);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a BridgeLoan' })
  @ApiResponse({
    status: 200,
    description: 'The BridgeLoan has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.bridgeLoanService.deleteOne({ id });
  }
}
