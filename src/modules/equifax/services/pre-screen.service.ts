import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import { URLs } from 'src/common/constans/urls';
import { EquifaxService } from '../equifax.service';

@Injectable()
export class PreScreenService {
  private baseUrl: string;
  private scope: string;

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
    private readonly equifaxService: EquifaxService,
  ) {
    this.baseUrl = this.configService.get<string>('equifax.baseUrl');
    this.scope = `${this.baseUrl}${URLs.equifax.business.preQualification.scope}`;
  }
}
