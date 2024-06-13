
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
import { PersonalLoanService } from './personal-loan.service';
import { CreatePersonalLoanDto } from './dtos/create.personal-loan.dto';
import { UpdatePersonalLoanDto } from './dtos/update.personal-loan.dto';
import { CreateLoanDto } from 'src/common/dtos/create.loan.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Loan')
@Controller('loan')
export class PersonalLoanController {
  constructor(private readonly personaLoanService: PersonalLoanService) { }

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all PersonalLoans' })
  @ApiResponse({ status: 200, description: 'Return all PersonalLoans' })
  async getAll(): Promise<ResponseDTO> {
    return await this.personaLoanService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a PersonalLoan by id' })
  @ApiResponse({ status: 200, description: 'Return a PersonalLoan' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.personaLoanService.findOne({ id });
  }

  // @SkipJwtAuth()
  // @Post()
  // @ApiOperation({ summary: 'Create a new PersonalLoan' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'The PersonalLoan has been successfully created.',
  // })
  // async create(@Body() personaLoan: CreatePersonalLoanDto): Promise<ResponseDTO> {
  //   return { data: await this.personaLoanService.create(personaLoan) }
  // }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new PersonalLoan' })
  @ApiResponse({
    status: 201,
    description: 'The PersonalLoan has been successfully created.',
  })
  async create(@Body() personaLoan: CreateLoanDto): Promise<any> {
    return await this.personaLoanService.generateLoans(personaLoan)
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a PersonalLoan' })
  @ApiResponse({
    status: 200,
    description: 'The PersonalLoan has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() personaLoan: UpdatePersonalLoanDto,
  ): Promise<ResponseDTO> {
    return await this.personaLoanService.update(id, personaLoan);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a PersonalLoan' })
  @ApiResponse({
    status: 200,
    description: 'The PersonalLoan has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.personaLoanService.deleteOne({ id });
  }
}
