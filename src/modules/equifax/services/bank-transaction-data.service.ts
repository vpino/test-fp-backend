import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import { URLs } from 'src/common/constans/urls';
import { EquifaxService } from '../equifax.service';
import { UserRegistrationDTO } from '../dtos/bank-transaction-data/user-registration.dto';

@Injectable()
export class BankTransactionDataService {
  private baseUrl: string;
  private scope: string;

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
    private readonly equifaxService: EquifaxService,
  ) {
    this.baseUrl = this.configService.get<string>('equifax.baseUrl');
    this.scope = `${URLs.equifax.business.bankTransactionData.scope}`;
  }

  async registerUser(data: UserRegistrationDTO): Promise<any> {
    try {
      const token = await this.equifaxService.generateToken(this.scope);

      const url = `${this.baseUrl}${URLs.equifax.business.bankTransactionData.userRegister}`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      return await this.http.post(url, data, { headers });
    } catch (error) {
      throw new Error(`Failed to initiate verification: ${error?.message}`);
    }
  }
}
