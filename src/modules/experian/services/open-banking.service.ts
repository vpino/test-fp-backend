import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import { URLs } from 'src/common/constans/urls';
import { ExperianService } from '../experian.service';
import { VerifyIncomeDTO } from '../dtos/open-banking/verify-income.request.dto';
import { AffordabilityCheckDTO } from '../dtos/open-banking/affordability-check.dto';
import { CreditScoreRequestDTO } from '../dtos/open-banking/credit-score.dto';

@Injectable()
export class OpenBankingService {
  private baseUrl: string;

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
    private readonly experianService: ExperianService,
  ) {
    this.baseUrl = this.configService.get<string>('experian.baseUrl');
  }

  async incomeVerifications(data: VerifyIncomeDTO): Promise<any> {
    try {
      const url = `${this.baseUrl}${URLs.experian.openBanking.verifyIncome}`;
      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      };

      return await this.http.post(url, data, { headers });
    } catch (error) {
      throw new Error(`Failed to request incomeVerifications data: ${error.message}`);
    }
  }

  async abilityPay(data: AffordabilityCheckDTO): Promise<any> {
    try {
      const url = `${this.baseUrl}${URLs.experian.openBanking.abilityPay}`;
      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      };

      return await this.http.post(url, data, { headers });
    } catch (error) {
      throw new Error(`Failed to request abilityPay data: ${error.message}`);
    }
  }

  async getCreditScore(data: CreditScoreRequestDTO): Promise<any> {
    try {
      const targetUrl = URLs.experian.openBanking.targetUrlBankScore

      const url = `${this.baseUrl}${URLs.experian.openBanking.bankScore}${targetUrl}`

      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      };

      return await this.http.post(url, data, { headers });
    } catch (error) {
      throw new Error(`Failed to request bankScore data: ${error.message}`);
    }
  }}
