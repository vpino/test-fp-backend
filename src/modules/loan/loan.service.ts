import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Loan } from './entities/loan.entity';
import { CreateLoanDto } from './dtos/create.loan.dto';
import { PersonaService } from '../persona/persona.service';
import { LoanInformationService } from '../loan-information/loan-information.service';
import { MortgageInformationService } from '../mortgage-information/mortgage-information.service';
import { CreditInformationService } from '../credit-information/credit-information.service';
import { FinancialInformationService } from '../financial-information/financial-information.service';
import { EducationInformationService } from '../education-information/education-information.service';
import { LegalInformationService } from '../legal-information/legal-information.service';
import { ClientTagsService } from '../client-tags/client-tags.service';
import { LoanOfferDto, OriginatorDto, PendingOriginatorDto, PendingResponseDto, PersonalLoanResponseDto } from './dtos/response.loan.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoanService extends CrudService<Loan> {
  constructor(
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
    private readonly dataSourceInject: DataSource,
    private personaService: PersonaService,
    private loanInformationService: LoanInformationService,
    private mortgageInformationService: MortgageInformationService,
    private creditInformationService: CreditInformationService,
    private financialInformationService: FinancialInformationService,
    private educationInformationService: EducationInformationService,
    private legalInformationService: LegalInformationService,
    private clientTagsService: ClientTagsService,
  ) {
    super(loanRepository, 'id', dataSourceInject);
  }

  async generate(loanData: CreateLoanDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const personalInformation = await this.personaService.create(loanData.personalInformation);
      const loanInformation = await this.loanInformationService.create(loanData.loanInformation);
      const mortgageInformation = await this.mortgageInformationService.create(loanData.mortgageInformation);
      const creditInformation = await this.creditInformationService.create(loanData.creditInformation);
      const financialInformation = await this.financialInformationService.create(loanData.financialInformation);
      const educationInformation = await this.educationInformationService.create(loanData.educationInformation);
      const legalInformation = await this.legalInformationService.create(loanData.legalInformation);
      const clientTags = await this.clientTagsService.create(loanData.clientTags);

      const loan = this.loanRepository.create({
        ...loanData,
        personalInformation,
        loanInformation,
        mortgageInformation,
        creditInformation,
        financialInformation,
        educationInformation,
        legalInformation,
        clientTags,
      });

      const savedLoan = await queryRunner.manager.save(loan);


      await queryRunner.commitTransaction();

      return await this.generateDynamicResponse(savedLoan.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async generateDynamicResponse(loanId: string): Promise<PersonalLoanResponseDto> {
    const generateLoanOffer = (): LoanOfferDto => {
      const originators: OriginatorDto[] = [
        {
          key: 'lending-club',
          name: 'LendingClub',
          description: 'Low fixed rate personal loans from $1,000 to $40,000',
          images: [{ sizeKey: '150', url: 'aff-tag.evenfinancial.com/images/lendingclub/lendingclub_120.png' }],
          disclaimer: 'Suspendisse rhoncus magna erat, nec rhoncus leo elementum eget.'
        },
        {
          key: 'avant',
          name: 'Avant',
          description: 'Personal loans from $1,000 to $35,000',
          images: [{ sizeKey: '120', url: 'aff-tag.evenfinancial.com/images/avant/avant_120.png' }],
          disclaimer: 'Suspendisse rhoncus magna erat, nec rhoncus leo elementum eget.'
        }
      ];

      const originator = originators[Math.floor(Math.random() * originators.length)];
      const termLength = [24, 36, 48, 60][Math.floor(Math.random() * 4)];
      const maxAmount = Math.floor(Math.random() * 40000) + 1000;
      const minAmount = Math.floor(Math.random() * 1000) + 500;
      const maxApr = parseFloat((Math.random() * (35.99 - 5.99) + 5.99).toFixed(2));
      const minApr = parseFloat((Math.random() * (maxApr - 1) + 1).toFixed(2));
      const meanApr = parseFloat(((maxApr + minApr) / 2).toFixed(2));
      const monthlyPayment = parseFloat((Math.random() * (500 - 100) + 100).toFixed(2));
      const maxMonthlyPayment = parseFloat((monthlyPayment + Math.random() * 50).toFixed(2));
      const minMonthlyPayment = parseFloat((monthlyPayment - Math.random() * 50).toFixed(2));
      const meanMonthlyPayment = parseFloat(((maxMonthlyPayment + minMonthlyPayment) / 2).toFixed(2));
      const maxTotalPayment = maxMonthlyPayment * termLength;
      const minTotalPayment = minMonthlyPayment * termLength;
      const meanTotalPayment = meanMonthlyPayment * termLength;

      return {
        uuid: uuidv4(),
        originator,
        originatorId: null,
        termLength,
        termUnit: 'month',
        maxAmount,
        minAmount,
        maxApr,
        minApr,
        meanApr,
        feeRate: null,
        maxFeeRate: null,
        minFeeRate: null,
        feeFixed: null,
        maxFeeFixed: null,
        minFeeFixed: null,
        allowPrepayment: true,
        prepaymentFee: 0,
        monthlyPayment,
        maxMonthlyPayment,
        minMonthlyPayment,
        meanMonthlyPayment,
        maxTotalPayment,
        minTotalPayment,
        meanTotalPayment,
        terms: null,
        url: `https://offers.evenfinancial.com/ref/${uuidv4()}`,
        preQualified: Math.random() > 0.5,
        preApproved: Math.random() > 0.5,
        sponsored: false,
        aprType: 'fixed',
        recommendationScore: Math.floor(Math.random() * 100),
        amountPrefix: null
      };
    };

    const loanOffers = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, generateLoanOffer);

    const pendingResponses: PendingResponseDto[] = [
      {
        partner: {
          uuid: uuidv4(),
          name: 'Avant',
          description: 'Personal loans from $1,000 to $35,000',
          disclaimer: 'Suspendisse rhoncus magna erat, nec rhoncus leo elementum eget.',
          imageUrl: 'https://images.evenfinancial.com/old/images/avant/avant_120.png'
        },
        productTypes: ['loan']
      }
    ];

    const pendingOriginators: PendingOriginatorDto[] = [
      {
        key: 'avant',
        name: 'Avant',
        description: 'Personal loans from $1,000 to $35,000',
        images: [{ sizeKey: '120', url: 'aff-tag.evenfinancial.com/images/avant/avant_120.png' }],
        disclaimer: 'Suspendisse rhoncus magna erat, nec rhoncus leo elementum eget.'
      }
    ];

    const response: PersonalLoanResponseDto = {
      uuid: loanId,
      leadUuid: uuidv4(),
      loanOffers,
      specialOffers: [],
      savingsOffers: [],
      creditCardOffers: [],
      mortgageOffers: [],
      pendingResponses,
      pendingOriginators,
    };

    return response;
  }

}
