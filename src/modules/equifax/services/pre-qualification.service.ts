import { HttpException, Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import { URLs } from 'src/common/constans/urls';
import { EquifaxService } from '../equifax.service';
import { CreatePreQualificationDTO } from '../dtos/pre-qualification/pre-qualification.dto';

@Injectable()
export class PreQualificationService {
  private baseUrl: string;
  private scope: string;

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
    private readonly equifaxService: EquifaxService,
  ) {
    this.baseUrl = this.configService.get<string>('equifax.baseUrl');
    this.scope = `${URLs.equifax.business.preQualification.scope}`;
  }

  async createPreQualification(data: CreatePreQualificationDTO): Promise<any> {
    try {
      const token = await this.equifaxService.generateTokenV2(this.scope);

      const url = `${this.baseUrl}${URLs.equifax.business.preQualification.reportRequest}`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      return await this.http.post(url, data, { headers });
    } catch (error) {
      throw new HttpException(
        `Failed to create pre qualification: ${error?.message}`,
        error?.response?.status || 500,
      );
    }
  }
}
