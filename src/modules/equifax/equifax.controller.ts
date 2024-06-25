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
import { EquifaxService } from './equifax.service';
import { CreateEquifaxDto } from './dtos/create.equifax.dto';
import { UpdateEquifaxDto } from './dtos/update.equifax.dto';
import { AssetViewService } from './services/asset-view.service';
import { InitiateRequestDTO } from './dtos/asset-view/initiate-request.dto';
import { ScoreAttributesService } from './services/score-attributes.service';
import { CreateConsumerDto } from './dtos/score-attributes/credit-report-acro.dto';
import { CreditReportRequest58608561 } from './dtos/score-attributes/credit-report-58608561.dto';
import { CreditReportRequest5860 } from './dtos/score-attributes/credit-report-5860.dto';
import { CreditReportRequest5861 } from './dtos/score-attributes/credit-report-5861.dto';
import { CreditReportRequestAppplicant } from './dtos/score-attributes/credit-report-applicant.dto';
import { CreditReportRequestAcroOnly } from './dtos/score-attributes/credit-report-acro-only.dto';
import { RetrieveRequestDTO } from './dtos/asset-view/retrieve-request.dto';
import { RefreshRequestDTO } from './dtos/asset-view/refresh-request.dto';
import { ChexAdvisorService } from './services/chex-advisor.service';
import { DataXInquiryDTO } from './dtos/chex-advisor/datax-inquiry.dto';
import { BankTransactionDataService } from './services/bank-transaction-data.service';
import { UserRegistrationDTO } from './dtos/bank-transaction-data/user-registration.dto';
import { PreApprovalOneService } from './services/pre-approval-one.service';
import { CreateReportRequestDTO } from './dtos/pre-approval-one/report-request.dto';
import { PreQualificationService } from './services/pre-qualification.service';
import { CreatePreQualificationDTO } from './dtos/pre-qualification/pre-qualification.dto';
import { OneViewService } from './services/one-view.service';
import { ConsumerCreditReportRequestDTO } from './dtos/one-view/consumer-credit-report.dto';

@ApiBearerAuth('JWT-auth')
@ApiTags('Equifax')
@Controller('tier-one')
export class EquifaxController {
  constructor(
    private readonly equifaxService: EquifaxService,
    private readonly assetViewService: AssetViewService,
    private readonly scoreAttributesService: ScoreAttributesService,
    private readonly chexAdvisor: ChexAdvisorService,
    private readonly bankTransactionDataService: BankTransactionDataService,
    private readonly preApprovalOneService: PreApprovalOneService,
    private readonly preQualificationService: PreQualificationService,
    private readonly oneViewService: OneViewService,
  ) {}

  @SkipJwtAuth()
  @Get()
  @ApiOperation({ summary: 'Get all Equifaxs' })
  @ApiResponse({ status: 200, description: 'Return all Equifaxs' })
  async getAll(): Promise<ResponseDTO> {
    return await this.equifaxService.getAll({});
  }

  @SkipJwtAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Get a Equifax by id' })
  @ApiResponse({ status: 200, description: 'Return a Equifax' })
  async getOne(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.equifaxService.findOne({ id });
  }

  @SkipJwtAuth()
  @Post('/chex-advisor/initiate')
  @ApiOperation({ summary: 'Chex advisor' })
  @ApiResponse({
    status: 201,
    description: 'The Chex advisor has been successfully created.',
  })
  async initiateDataXInquiry(
    @Body() data: DataXInquiryDTO,
  ): Promise<ResponseDTO> {
    return { data: await this.chexAdvisor.initiateDataXInquiry(data) };
  }

  @SkipJwtAuth()
  @Post('/asset-view/initiate')
  @ApiOperation({ summary: 'Asset View' })
  @ApiResponse({
    status: 201,
    description: 'The Asset View has been successfully created.',
  })
  async assetView(@Body() data: InitiateRequestDTO): Promise<ResponseDTO> {
    return { data: await this.assetViewService.initiateVerification(data) };
  }

  @SkipJwtAuth()
  @Post('/asset-view/retrieve')
  @ApiOperation({ summary: 'retrieve' })
  @ApiResponse({
    status: 201,
    description: 'The retrieve View has been successfully created.',
  })
  async retrieve(@Body() data: RetrieveRequestDTO): Promise<ResponseDTO> {
    return { data: await this.assetViewService.retrieveAssetView(data) };
  }

  @SkipJwtAuth()
  @Post('/asset-view/refresh')
  @ApiOperation({ summary: 'refresh' })
  @ApiResponse({
    status: 201,
    description: 'The refresh View has been successfully created.',
  })
  async refresh(@Body() data: RefreshRequestDTO): Promise<ResponseDTO> {
    return { data: await this.assetViewService.refreshAssetView(data) };
  }

  @SkipJwtAuth()
  @Post('/bank-transaction-data/user-registration')
  @ApiOperation({ summary: 'refresh' })
  @ApiResponse({
    status: 201,
    description: 'The refresh View has been successfully created.',
  })
  async bankTransactionRegistration(
    @Body() data: UserRegistrationDTO,
  ): Promise<ResponseDTO> {
    return { data: await this.bankTransactionDataService.registerUser(data) };
  }

  @SkipJwtAuth()
  @Post('/pre-approval/report-requests')
  @ApiOperation({ summary: 'refresh' })
  @ApiResponse({
    status: 201,
    description: 'The pre approval has been successfully created.',
  })
  async preApproval(
    @Body() data: CreateReportRequestDTO,
  ): Promise<ResponseDTO> {
    return { data: await this.preApprovalOneService.createReportRequest(data) };
  }

  @SkipJwtAuth()
  @Post('/pre-qualification/report-requests')
  @ApiOperation({ summary: 'refresh' })
  @ApiResponse({
    status: 201,
    description: 'The pre qualification has been successfully created.',
  })
  async preQualification(
    @Body() data: CreatePreQualificationDTO,
  ): Promise<ResponseDTO> {
    return {
      data: await this.preQualificationService.createPreQualification(data),
    };
  }

  @SkipJwtAuth()
  @Post('/score-and-attributes/model-a/credit-report')
  @ApiOperation({ summary: 'Asset View' })
  @ApiResponse({
    status: 201,
    description: 'The Asset View has been successfully created.',
  })
  async scoreAttributes(@Body() data: CreateConsumerDto): Promise<ResponseDTO> {
    return { data: await this.scoreAttributesService.getCreditReport(data) };
  }

  @SkipJwtAuth()
  @Post('/score-and-attributes/model-b/credit-report')
  @ApiOperation({ summary: 'Asset View' })
  @ApiResponse({
    status: 201,
    description: 'The Asset View has been successfully created.',
  })
  async scoreAttributes58608561(
    @Body() data: CreditReportRequest58608561,
  ): Promise<ResponseDTO> {
    return { data: await this.scoreAttributesService.getCreditReport(data) };
  }

  @SkipJwtAuth()
  @Post('/score-and-attributes/model-c/credit-report')
  @ApiOperation({ summary: 'Asset View' })
  @ApiResponse({
    status: 201,
    description: 'The Asset View has been successfully created.',
  })
  async scoreAttributes5860(
    @Body() data: CreditReportRequest5860,
  ): Promise<ResponseDTO> {
    return { data: await this.scoreAttributesService.getCreditReport(data) };
  }

  @SkipJwtAuth()
  @Post('/score-and-attributes/model-d/credit-report')
  @ApiOperation({ summary: 'Asset View' })
  @ApiResponse({
    status: 201,
    description: 'The Asset View has been successfully created.',
  })
  async scoreAttributes5861(
    @Body() data: CreditReportRequest5861,
  ): Promise<ResponseDTO> {
    return { data: await this.scoreAttributesService.getCreditReport(data) };
  }

  @SkipJwtAuth()
  @Post('/score-and-attributes/model-e/credit-report')
  @ApiOperation({ summary: 'Asset View' })
  @ApiResponse({
    status: 201,
    description: 'The Asset View has been successfully created.',
  })
  async scoreAttributesApplicant(
    @Body() data: CreditReportRequestAppplicant,
  ): Promise<ResponseDTO> {
    return { data: await this.scoreAttributesService.getCreditReport(data) };
  }

  @SkipJwtAuth()
  @Post('/score-and-attributes/model-f/credit-report')
  @ApiOperation({ summary: 'Asset View' })
  @ApiResponse({
    status: 201,
    description: 'The Asset View has been successfully created.',
  })
  async scoreAttributesAcroOnly(
    @Body() data: CreditReportRequestAcroOnly,
  ): Promise<ResponseDTO> {
    return { data: await this.scoreAttributesService.getCreditReport(data) };
  }

  @SkipJwtAuth()
  @Post('/one-view/user-risk/credit-report')
  @ApiOperation({ summary: 'Credit report' })
  @ApiResponse({
    status: 201,
    description: 'The credit report has been successfully created.',
  })
  async userRisk(
    @Body() data: ConsumerCreditReportRequestDTO,
  ): Promise<ResponseDTO> {
    return {
      data: await this.oneViewService.initiateConsumerCreditReport(data),
    };
  }

  @SkipJwtAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new Equifax' })
  @ApiResponse({
    status: 201,
    description: 'The Equifax has been successfully created.',
  })
  async create(@Body() equifax: CreateEquifaxDto): Promise<ResponseDTO> {
    return { data: await this.equifaxService.create(equifax) };
  }

  @SkipJwtAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update a Equifax' })
  @ApiResponse({
    status: 200,
    description: 'The Equifax has been successfully updated.',
  })
  async update(
    @Param('id') id: string,
    @Body() equifax: UpdateEquifaxDto,
  ): Promise<ResponseDTO> {
    return await this.equifaxService.update(id, equifax);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Equifax' })
  @ApiResponse({
    status: 200,
    description: 'The Equifax has been successfully deleted.',
  })
  async delete(@Param('id') id: string): Promise<ResponseDTO> {
    return await this.equifaxService.deleteOne({ id });
  }
}
