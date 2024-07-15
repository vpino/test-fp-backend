import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import { URLs } from 'src/common/constans/urls';
import { ExperianService } from '../experian.service';
import { GetTransactionCategoriserDTO } from '../dtos/transaction-categoriser/get-transaction-request.dto';

@Injectable()
export class TransactionCategoriserService {
  private baseUrl: string;

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
    private readonly experianService: ExperianService,
  ) {
    this.baseUrl = this.configService.get<string>('experian.baseUrl');
  }

  async get(data: GetTransactionCategoriserDTO): Promise<any> {
    try {
      const url = `${this.baseUrl}${URLs.experian.transactionCategoriser.get}`;
      const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      };

      return await this.http.post(url, data, { headers });
    } catch (error) {
      throw new Error(`Failed to request data: ${error.message}`);
    }
  }
}
