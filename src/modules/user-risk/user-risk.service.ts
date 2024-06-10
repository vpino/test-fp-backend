
import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserRisk } from './entities/user-risk.entity';
import { getRandomDate, getRandomElement, getRandomInt, getRandomString, getRandomUUID } from 'src/common/functions/random-data.function';
import { ProviderInformationService } from '../provider-information/provider-information.service';
import { AddressInformationService } from '../address-information/address-information.service';
import { ConsumerIdentityService } from '../consumer-identity/consumer-identity.service';
import { EmploymentInformationService } from '../employment-information/employment-information.service';
import { InformationalMessageService } from '../informational-message/informational-message.service';
import { InquiryService } from '../inquiry/inquiry.service';
import { OfacService } from '../ofac/ofac.service';
import { PublicRecordService } from '../public-record/public-record.service';
import { RiskModelService } from '../risk-model/risk-model.service';
import { TradelineService } from '../tradeline/tradeline.service';
import { EndTotalsService } from '../end-totals/end-totals.service';
import { NameService } from '../name/name.service';
import { EnhancedPaymentDataService } from '../enhanced-payment-data/enhanced-payment-data.service';

@Injectable()
export class UserRiskService extends CrudService<UserRisk> {
  constructor(
    @InjectRepository(UserRisk) private userRiskRepository: Repository<UserRisk>,
    private readonly dataSourceInject: DataSource,
    private readonly providerInformationService: ProviderInformationService,
    private readonly addressInformationService: AddressInformationService,
    private readonly consumerIdentityService: ConsumerIdentityService,
    private readonly nameService: NameService,
    private readonly employmentInformationService: EmploymentInformationService,
    private readonly informationalMessageService: InformationalMessageService,
    private readonly inquiryService: InquiryService,
    private readonly ofacService: OfacService,
    private readonly publicRecordService: PublicRecordService,
    private readonly riskModelService: RiskModelService,
    private readonly enhancedPaymentDataService: EnhancedPaymentDataService,
    private readonly tradelineService: TradelineService,

    private readonly endTotalsService: EndTotalsService
  ) {
    super(userRiskRepository, 'id', dataSourceInject);
  }

  async generate(): Promise<any> {
    const entityManager = this.dataSource.manager;
    const queryRunner = entityManager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userRisk = new UserRisk();
      userRisk.modelID = this.generateModelID();
      userRisk.decision = this.generateDecision();
      userRisk.woe = this.generateWoe();
      userRisk.woeDescription = this.generateWoeDescription();
      userRisk.riskID = this.generateRiskID();
      userRisk.riskTier = this.generateRiskTier();

      const providerInformation = this.generateProviderInformation(userRisk);
      const createdProviderInfo = await this.providerInformationService.createTransactional(providerInformation);
      userRisk.providerInformation = [createdProviderInfo];

      const addressInformation = this.generateAddressInformation(userRisk);
      const createdAddressInformation = await this.addressInformationService.createTransactional(addressInformation);
      userRisk.addressInformation = [createdAddressInformation];

      const nameConsumerIdentity = this.generateConsumerIdentity()
      const createNameCustomer = await this.nameService.createTransactional(nameConsumerIdentity);

      const consumerIdentity = await this.consumerIdentityService.createTransactional({ names: [createNameCustomer]})
      userRisk.consumerIdentity = [consumerIdentity];

      const employmentInformation = await this.employmentInformationService.createTransactional(this.generateEmploymentInformation(userRisk));
      userRisk.employmentInformation = [employmentInformation];

      const informationalMessage = await this.informationalMessageService.createTransactional(this.generateInformationalMessage(userRisk));
      userRisk.informationalMessage = [informationalMessage];

      const inquiry = await this.inquiryService.createTransactional(this.generateInquiry(userRisk));
      userRisk.inquiry = [inquiry];

      const ofac = await this.ofacService.createTransactional(this.generateOfac(userRisk));
      userRisk.ofac = [ofac];

      const publicRecord = await this.publicRecordService.createTransactional(this.generatePublicRecord(userRisk));
      userRisk.publicRecord = [publicRecord];

      const riskModel = await this.riskModelService.createTransactional(this.generateRiskModel(userRisk));
      userRisk.riskModel = [riskModel];

      const createdTradeLine = this.generateTradeline(userRisk)

      const enhancedPaymentData = createdTradeLine.enhancedPaymentData

      createdTradeLine.enhancedPaymentData = await this.enhancedPaymentDataService.createTransactional(enhancedPaymentData);
      // const tradeline = await this.tradelineService.createTransactional(createdTradeLine);
      // userRisk.tradeline = [tradeline];

      const endTotals = await this.endTotalsService.createTransactional(this.generateEndTotals(userRisk));
      userRisk.endTotals = [endTotals];

      await entityManager.save(userRisk);
      await queryRunner.commitTransaction();

      return {
        modelID: userRisk.modelID,
        decision: userRisk.decision,
        woe: userRisk.woe,
        woe_description: userRisk.woeDescription,
        riskID: userRisk.riskID,
        risk_tier: userRisk.riskTier,
        provider_information: {
          subscriberCode: userRisk.providerInformation[0].subscriberCode,
          subscriberName: userRisk.providerInformation[0].subscriberName,
          terms: userRisk.providerInformation[0].terms
        },
        addressInformation: userRisk.addressInformation.map((info) => {
          return {
            city: info.city,
            dwellingType: info.dwellingType,
            firstReportedDate: info.firstReportedDate,
            lastReportingSubscriberCode: info.lastReportingSubscriberCode,
            lastUpdatedDate: info.lastUpdatedDate,
            source: info.source,
            state: info.state,
            streetName: info.streetName,
            streetPrefix: info.streetPrefix,
            streetSuffix: info.streetSuffix,
            timesReported: info.timesReported,
            unitId: info.unitId,
            unitType: info.unitType,
            zipCode: info.zipCode
          }
        }),
        consumerIdentity: {
          name: userRisk.consumerIdentity[0].names.map((name) => {
            return {
              firstName: name.firstName,
              surname: name.surname,
              type: name.type
            }
          })
        },
        employmentInformation: userRisk.employmentInformation.map((employment) => {
          return {
            firstReportedDate: employment.firstReportedDate,
            lastUpdatedDate: employment.lastUpdatedDate,
            name: employment.name,
            source: employment.source
          }
        }),
        informationalMessage: userRisk.informationalMessage.map ((info) => {
          return {
            messageNumber: info.messageNumber,
            messageNumberDetailed: info.messageNumberDetailed,
            messageText: info.messageText
          }
        }),
        inquiry: userRisk.inquiry.map( (inquiri) => {
          return {
            amount: inquiri.amount,
            date: inquiri.date,
            subscriberCode: inquiri.subscriberCode,
            subscriberName: inquiri.subscriberName,
            terms: inquiri.terms,
            type: inquiri.type
          }
        }),
        ofac: userRisk.ofac.map((ofac) => {
          return {
            messageNumber: ofac.messageNumber,
            messageText: ofac.messageText
          }
        }),
        publicRecord: userRisk.publicRecord.map( (record) => {
          return {
            courtCode: record.courtCode,
            courtName: record.courtName,
            ecoa: record.ecoa,
            evaluation: record.evaluation,
            filingDate: record.filingDate,
            referenceNumber: record.referenceNumber,
            status: record.status,
            statusDate: record.statusDate
          }
        }),
        riskModel: userRisk.riskModel.map ((risk) => {
          return {
            evaluation: risk.evaluation,
            modelIndicator: risk.modelIndicator,
            score: risk.score,
            scoreFactors: risk.scoreFactors.map((score) => {
              return {
                importance: score.importance,
                code: score.code
              }
            })
          }
        }),
        endTotals: userRisk.endTotals.map( (end) => {
          return {
            totalSegments: end.totalSegments,
            totalLength: end.totalLength
          }
        }),
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  generateModelID() {
    return `Country_mode_${getRandomInt(1, 1000)}`;
  }

  generateDecision() {
    const decisions = ['approve', 'failed', 'in review'];
    return getRandomElement(decisions);
  }

  generateWoe() {
    return `variable_${getRandomInt(1, 100)}`;
  }

  generateWoeDescription() {
    return getRandomString(10);
  }

  generateRiskID() {
    return getRandomUUID();
  }

  generateRiskTier() {
    const tiers = ['tier 1', 'tier 2', 'tier 3'];
    return getRandomElement(tiers);
  }

  generateProviderInformation(userRisk: UserRisk) {
    const providerInformation = {
      userRisk,
      subscriberCode: getRandomString(7),
      subscriberName: getRandomString(6),
      terms: getRandomInt(1, 200).toString(),
    }

    return providerInformation
  }

  generateAddressInformation(userRisk: UserRisk) {
    const addressInformation = {
      userRisk,
      city: getRandomString(8),
      dwellingType: getRandomElement(['A', 'S']),
      firstReportedDate: getRandomDate(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0],
      lastUpdatedDate: getRandomDate(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0],
      source: getRandomElement(['1', '2']),
      state: getRandomString(2),
      streetName: getRandomString(6),
      streetPrefix: getRandomString(5),
      streetSuffix: getRandomString(3),
      timesReported: getRandomInt(0, 5).toString(),
      unitId: getRandomString(2),
      unitType: getRandomString(3),
      zipCode: getRandomInt(10000, 99999).toString(),
    }

    return addressInformation;
  }

  generateConsumerIdentity() {
    const data = {
      firstName: getRandomString(6),
      surname: getRandomString(6),
      type: getRandomElement(['N', 'S', 'A']),
    };
    return data;
  }

  generateEmploymentInformation(userRisk: UserRisk) {
    const data = {
      userRisk,
      firstReportedDate: getRandomDate(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0],
      lastUpdatedDate: getRandomDate(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0],
      name: getRandomString(8),
      source: getRandomElement(['1', '2']),
    };
    return data;
  }

  generateInformationalMessage(userRisk: UserRisk) {
    const data = {
      userRisk,
      messageNumber: getRandomInt(1, 100).toString(),
      messageNumberDetailed: getRandomInt(1000, 9999).toString(),
      messageText: getRandomString(15),
    };
    return data;
  }

  generateInquiry(userRisk: UserRisk) {
    const data = {
      userRisk,
      amount: 'UNKNOWN',
      date: getRandomDate(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0],
      subscriberCode: getRandomString(7),
      subscriberName: getRandomString(10),
      terms: 'UNK',
      type: getRandomInt(1, 100).toString(),
    };
    return data;
  }

  generateOfac(userRisk: UserRisk) {
    const data = {
      userRisk,
      messageNumber: getRandomInt(1000, 9999).toString(),
      messageText: getRandomString(30),
    };
    return data;
  }

  generatePublicRecord(userRisk: UserRisk) {
    const data = {
      userRisk,
      courtCode: getRandomString(7),
      courtName: getRandomString(15),
      ecoa: getRandomInt(1, 9).toString(),
      evaluation: getRandomString(1),
      filingDate: getRandomDate(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0],
      referenceNumber: getRandomString(10),
      status: getRandomInt(1, 20).toString(),
      statusDate: getRandomDate(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0],
    };
    return data;
  }

  generateRiskModel(userRisk: UserRisk) {
    const data = {
      userRisk,
      evaluation: getRandomString(1),
      modelIndicator: getRandomString(2),
      score: getRandomInt(300, 850).toString(),
      scoreFactors: [
        { importance: '1', code: getRandomInt(1, 50).toString() },
        { importance: '2', code: getRandomInt(1, 50).toString() },
        { importance: '3', code: getRandomInt(1, 50).toString() },
      ],
    };
    return data;
  }

  generateTradeline(userRisk: UserRisk) {
    const data = {
      userRisk,
      accountNumber: getRandomString(14),
      accountType: getRandomInt(1, 20).toString(),
      amount1: getRandomInt(1, 10000).toString(),
      amount1Qualifier: getRandomString(1),
      balanceDate: getRandomDate(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0],
      delinquencies30Days: getRandomInt(0, 5).toString(),
      delinquencies60Days: getRandomInt(0, 5).toString(),
      delinquencies90to180Days: getRandomInt(0, 5).toString(),
      derogCounter: getRandomInt(0, 5).toString(),
      ecoa: getRandomInt(1, 9).toString(),
      enhancedPaymentData: {
        enhancedAccountCondition: getRandomString(2),
        enhancedAccountType: getRandomString(2),
        enhancedPaymentHistory84: getRandomString(10),
        enhancedPaymentStatus: getRandomString(2),
        enhancedTerms: getRandomString(3),
        enhancedTermsFrequency: getRandomString(1),
        originalLoanAmount: getRandomInt(1, 10000).toString(),
        paymentLevelDate: getRandomDate(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0],
      },
      evaluation: getRandomString(1),
      kob: getRandomString(2),
      monthsHistory: getRandomInt(1, 60).toString(),
      openDate: getRandomDate(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0],
      openOrClosed: getRandomString(1),
      paymentHistory: getRandomString(10),
      revolvingOrInstallment: getRandomString(1),
      status: getRandomInt(1, 20).toString(),
      statusDate: getRandomDate(new Date(2020, 0, 1), new Date()).toISOString().split('T')[0],
      subscriberCode: getRandomString(7),
      subscriberName: getRandomString(10),
      terms: getRandomString(3),
    };
    return data;
  }

  generateEndTotals(userRisk: UserRisk) {
    const data = {
      userRisk,
      totalSegments: getRandomInt(1, 100).toString(),
      totalLength: getRandomInt(1, 10000).toString(),
    };
    return data;
  }
}
