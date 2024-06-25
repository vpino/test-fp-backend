import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import { URLs } from 'src/common/constans/urls';
import { EquifaxService } from '../equifax.service';
import { DataXInquiryDTO } from '../dtos/chex-advisor/datax-inquiry.dto';
import { Builder } from 'xml2js';

@Injectable()
export class ChexAdvisorService {
  private baseUrl: string;
  private scope: string;

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
    private readonly equifaxService: EquifaxService,
  ) {
    this.baseUrl = this.configService.get<string>('equifax.baseUrl');
    this.scope = `${this.baseUrl}${URLs.equifax.business.chexAdvisor.scope}`;
  }

  async initiateDataXInquiry(data: DataXInquiryDTO): Promise<any> {
    try {
      const token = await this.equifaxService.generateToken(this.scope);

      const url = `${this.baseUrl}${URLs.equifax.business.chexAdvisor.request}`;
      const headers = {
        'Content-Type': 'application/xml',
        Authorization: `Bearer ${token}`,
      };

      const builder = new Builder();
      const xmlData = builder.buildObject(data);

      return await this.http.post(url, xmlData, { headers });
    } catch (error) {
      throw new Error(`Failed to initiate DataX inquiry: ${error?.message}`);
    }
  }
}
