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
import { CreditCardService } from './credit-card.service';
import { CreateCreditCardDto } from './dtos/create.credit-card.dto';
import { UpdateCreditCardDto } from './dtos/update.credit-card.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('CreditCard')
@Controller('credit-card')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all CreditCards' })
  @ApiResponse({ status: 200, description: 'Return all CreditCards' })
  async getAll(): Promise<ResponseDTO> {
    return await this.creditCardService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a CreditCard by id' })
  @ApiResponse({ status: 200, description: 'Return a CreditCard' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.creditCardService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new CreditCard' })
  @ApiResponse({
    status: 201,
    description: 'The CreditCard has been successfully created.',
  })
  async create(@Body() creditCard: CreateCreditCardDto): Promise<ResponseDTO> {
    return { data: await this.creditCardService.create(creditCard) };
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a CreditCard' })
  @ApiResponse({
    status: 200,
    description: 'The CreditCard has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() creditCard: UpdateCreditCardDto,
  ): Promise<ResponseDTO> {
    return await this.creditCardService.update(id, creditCard);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a CreditCard' })
  @ApiResponse({
    status: 200,
    description: 'The CreditCard has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.creditCardService.deleteOne({ id });
  }
}
