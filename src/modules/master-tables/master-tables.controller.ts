import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { ResponseDTO } from '../../common/dtos/response.dto';
import { CountryService } from './services/country/country.service';
import { StateService } from './services/state/state.service';
import { TownshipService } from './services/township/township.service';
import { ParishService } from './services/parish/parish.service';
import { SkipJwtAuth } from 'src/common/decorators/skip-guard.decorator';
import { ProductTypeService } from './services/product-type/product-type.service';
import { CreateProductTypeDto } from './dtos/create.product-type.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Master Tables')
@Controller('master-tables')
export class MasterTablesController {
  constructor(
    private readonly countryService: CountryService,
    private readonly stateService: StateService,
    private readonly townshipService: TownshipService,
    private readonly parishService: ParishService,
    private readonly productTypeService: ProductTypeService
  ) {}

  @SkipJwtAuth()
  @Get('country')
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: 200, description: 'Return all countries' })
  async getAllCountries(): Promise<ResponseDTO> {
    return this.countryService.getAll({});
  }

  @Get('country/:id')
  @ApiOperation({ summary: 'Get a country by id' })
  @ApiResponse({ status: 200, description: 'Return a country' })
  async getOneCountry(@Param('id') id: string): Promise<ResponseDTO> {
    return this.countryService.findOne({ _id: id });
  }

  @Get('state')
  @ApiOperation({ summary: 'Get all states' })
  @ApiResponse({ status: 200, description: 'Return all states' })
  async getAllStates(): Promise<ResponseDTO> {
    return this.stateService.getAll({});
  }

  @Get('state/:id')
  @ApiOperation({ summary: 'Get a state by id' })
  @ApiResponse({ status: 200, description: 'Return a state' })
  async getOneState(@Param('id') id: string): Promise<ResponseDTO> {
    return this.stateService.findOne({ _id: id }, null, ['country']);
  }

  @Get('states/:idCountry')
  @ApiOperation({ summary: 'Get list states by country' })
  @ApiResponse({ status: 200, description: 'Return list states' })
  async getStatesByCountry(
    @Param('idCountry') id: string,
  ): Promise<ResponseDTO> {
    return this.stateService.getStatesByCountry(id);
  }

  @Get('township')
  @ApiOperation({ summary: 'Get all townships' })
  @ApiResponse({ status: 200, description: 'Return all townships' })
  async getAllTownships(): Promise<ResponseDTO> {
    return this.townshipService.getAll({});
  }

  @Get('township/:id')
  @ApiOperation({ summary: 'Get a township by id' })
  @ApiResponse({ status: 200, description: 'Return a township' })
  async getOneTownship(@Param('id') id: string): Promise<ResponseDTO> {
    return this.townshipService.findOne({ _id: id }, null, ['state']);
  }

  @Get('townships/:idState')
  @ApiOperation({ summary: 'Get list townships by idState' })
  @ApiResponse({ status: 200, description: 'Return a list states' })
  async getTownshipByState(
    @Param('idState') idState: string,
  ): Promise<ResponseDTO> {
    return this.townshipService.getTownshipByState(idState);
  }

  @Get('parish')
  @ApiOperation({ summary: 'Get all parishes' })
  @ApiResponse({ status: 200, description: 'Return all parishes' })
  async getAllParishes(): Promise<ResponseDTO> {
    return this.parishService.getAll({});
  }

  @Get('parish/:id')
  @ApiOperation({ summary: 'Get a parish by id' })
  @ApiResponse({ status: 200, description: 'Return a parish' })
  async getOneParish(@Param('id') id: string): Promise<ResponseDTO> {
    return this.parishService.findOne({ _id: id }, null, ['township']);
  }

  @Get('parishes/:idTownship')
  @ApiOperation({ summary: 'Get a parish by idTownship' })
  @ApiResponse({ status: 200, description: 'Return a parish' })
  async getParishesByTownship(
    @Param('idTownship') idTownship: string,
  ): Promise<ResponseDTO> {
    return this.parishService.getParishesByTownship(idTownship);
  }

  @SkipJwtAuth()
  @Get('product-type')
  @ApiOperation({ summary: 'Get all product type' })
  @ApiResponse({ status: 200, description: 'Return all product type' })
  async getAllPrductTypes(): Promise<ResponseDTO> {
    return this.productTypeService.getAll({});
  }

  @SkipJwtAuth()
  @Post('product-type')
  @ApiOperation({ summary: 'Create a product type' })
  @ApiResponse({ status: 200, description: 'Return a product type' })
  async createProductType(@Body() productType: CreateProductTypeDto): Promise<ResponseDTO> {
    return { data: await this.productTypeService.create(productType) }
  }


  @Get('product-type/:id')
  @ApiOperation({ summary: 'Get a product type by id' })
  @ApiResponse({ status: 200, description: 'Return a product type' })
  async getOneProductType(@Param('id') id: string): Promise<ResponseDTO> {
    return this.productTypeService.findOne({ _id: id });
  }
}
