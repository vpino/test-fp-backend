import { Injectable } from '@nestjs/common';
import { CrudService } from '../../common/services/crud/crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Equifax } from './entities/equifax.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import { URLs } from 'src/common/constans/urls';
import { TokenAssetViewResponse } from './interfaces/token-response.interface';
import { decrypt } from 'src/common/functions/encryption.function';

@Injectable()
export class EquifaxService extends CrudService<Equifax> {
  private baseUrl: string;
  private clientId: string;
  private clientSecret: string;

  constructor(
    @InjectRepository(Equifax) private equifaxRepository: Repository<Equifax>,
    private readonly dataSourceInject: DataSource,
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
  ) {
    super(equifaxRepository, 'id', dataSourceInject);
    this.baseUrl = this.configService.get<string>('equifax.baseUrl');
    this.clientId = decrypt(this.configService.get<string>('equifax.clientId'));
    this.clientSecret = decrypt(
      this.configService.get<string>('equifax.clientSecret'),
    );
  }

  async generateToken(scope: string): Promise<string> {
    const url = `${this.baseUrl}${URLs.equifax.oauth.token}`;
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    const data = new URLSearchParams();
    data.append('client_id', this.clientId);
    data.append('client_secret', this.clientSecret);
    data.append('grant_type', 'client_credentials');
    data.append('scope', scope);

    try {
      const response: TokenAssetViewResponse = await this.http.post(
        url,
        data.toString(),
        { headers },
      );

      return response?.access_token;
    } catch (error) {
      throw new Error(`Failed to generate token: ${error?.message}`);
    }
  }

  async generateTokenV2(scope: string): Promise<string> {
    const url = `${this.baseUrl}${URLs.equifax.oauth.tokenV2}`;

    const encodedCredentials = Buffer.from(
      `${this.clientId}:${this.clientSecret}`,
    ).toString('base64');

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedCredentials}`,
    };

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('scope', scope);

    try {
      const response: TokenAssetViewResponse = await this.http.post(
        url,
        data.toString(),
        { headers },
      );

      return response?.access_token;
    } catch (error) {
      throw new Error(`Failed to generate token V2: ${error?.message}`);
    }
  }
}
