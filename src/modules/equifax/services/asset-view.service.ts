import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import { URLs } from 'src/common/constans/urls';
import { InitiateRequestDTO } from '../dtos/asset-view/initiate-request.dto';
import { RetrieveRequestDTO } from '../dtos/asset-view/retrieve-request.dto';
import { RefreshRequestDTO } from '../dtos/asset-view/refresh-request.dto';
import { EquifaxService } from '../equifax.service';

@Injectable()
export class AssetViewService {
  private baseUrl: string;
  private scope: string;

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
    private readonly equifaxService: EquifaxService,
  ) {
    this.baseUrl = this.configService.get<string>('equifax.baseUrl');
    this.scope = `${this.baseUrl}${URLs.equifax.business.asset.scope}`;
  }

  async initiateVerification(data: InitiateRequestDTO): Promise<any> {
    try {
      const token = await this.equifaxService.generateToken(this.scope);

      const url = `${this.baseUrl}${URLs.equifax.business.asset.initiate}`;
      const headers = {
        'efx-client-correlation-id': '6fdc859b-7529-42f6-8d10-5f290dbda87e',
        Authorization: `Bearer ${token}`,
        userName: '',
        userValue: '',
        'Content-Type': 'application/json',
      };

      return await this.http.post(url, data, { headers });
    } catch (error) {
      throw new Error(`Failed to initiate verification: ${error?.message}`);
    }
  }

  async retrieveAssetView(data: RetrieveRequestDTO): Promise<any> {
    try {
      const token = await this.equifaxService.generateToken(this.scope);

      const url = `${this.baseUrl}${URLs.equifax.business.asset.retrieve}`;
      const headers = {
        'efx-client-correlation-id': '0e8c39d4-db36-4444-a762-9c424c4bd59a',
        Authorization: `Bearer ${token}`,
        userName: '',
        userValue: '',
        'Content-Type': 'application/json',
      };

      return await this.http.post(url, data, { headers });
    } catch (error) {
      throw new Error(`Failed to retrieve asset view: ${error.message}`);
    }
  }

  async refreshAssetView(data: RefreshRequestDTO): Promise<any> {
    try {
      const token = await this.equifaxService.generateToken(this.scope);

      const url = `${this.baseUrl}${URLs.equifax.business.asset.refresh}`;
      const headers = {
        'efx-client-correlation-id': 'd392da70-6014-4755-abd4-74ef95087944',
        Authorization: `Bearer ${token}`,
        userName: 'sdasd',
        userValue: 'sdasdas',
        'Content-Type': 'application/json',
      };

      return await this.http.post(url, data, { headers });
    } catch (error) {
      throw new Error(`Failed to refresh asset view: ${error.message}`);
    }
  }
}
