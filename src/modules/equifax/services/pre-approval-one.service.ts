import { HttpException, Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import { URLs } from 'src/common/constans/urls';
import { EquifaxService } from '../equifax.service';
import { CreateReportRequestDTO } from '../dtos/pre-approval-one/report-request.dto';

@Injectable()
export class PreApprovalOneService {
  private baseUrl: string;
  private scope: string;

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
    private readonly equifaxService: EquifaxService,
  ) {
    this.baseUrl = this.configService.get<string>('equifax.baseUrl');
    this.scope = `${URLs.equifax.business.preApprovalOne.scope}`;
  }

  async createReportRequest(data: CreateReportRequestDTO): Promise<any> {
    try {
      const token = await this.equifaxService.generateTokenV2(this.scope);

      const url = `${this.baseUrl}${URLs.equifax.business.preApprovalOne.reportRequest}`;
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      return await this.http.post(url, data, { headers });
    } catch (error) {
      throw new HttpException(
        `Failed to create report request: ${error?.message}`,
        error?.response?.status || 500,
      );
    }
  }
}
