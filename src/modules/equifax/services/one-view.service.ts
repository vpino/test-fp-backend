import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import { URLs } from 'src/common/constans/urls';
import { EquifaxService } from '../equifax.service';
import { ConsumerCreditReportRequestDTO } from '../dtos/one-view/consumer-credit-report.dto';

@Injectable()
export class OneViewService {
  private baseUrl: string;
  private scope: string;

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
    private readonly equifaxService: EquifaxService,
  ) {
    this.baseUrl = this.configService.get<string>('equifax.baseUrl');
    this.scope = `${URLs.equifax.business.oneView.scope}`;
  }

  async initiateConsumerCreditReport(
    data: ConsumerCreditReportRequestDTO,
  ): Promise<any> {
    try {
      const token = await this.equifaxService.generateTokenV2(this.scope);

      const url = `${this.baseUrl}${URLs.equifax.business.oneView.consumerCredit}`;
      const headers = {
        'Content-Type': 'application/json',
        'efx-client-correlation-id': 'c2d5439d-1caa-470b-8a81-890331909aa6',
        Authorization: `Bearer ${token}`,
      };

      return await this.http.post(url, data, { headers });
    } catch (error) {
      throw new Error(
        `Failed to initiate consumer credit report: ${error?.message}`,
      );
    }
  }
}
