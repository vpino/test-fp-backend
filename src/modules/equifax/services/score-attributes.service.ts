import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { ConfigService } from '@nestjs/config';
import { URLs } from 'src/common/constans/urls';
import { validate } from 'class-validator';
import { EquifaxService } from '../equifax.service';

@Injectable()
export class ScoreAttributesService {
  private baseUrl: string;
  private scope: string;

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
    private readonly equifaxService: EquifaxService,
  ) {
    this.baseUrl = this.configService.get<string>('equifax.baseUrl');
    this.scope = `${URLs.equifax.business.scoreAttributes.scope}`;
  }

  async getCreditReport<T>(data: T): Promise<any> {
    try {
      const token = await this.equifaxService.generateTokenV2(this.scope);

      const url = `${this.baseUrl}${URLs.equifax.business.scoreAttributes.creditReport}`;
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      await this.validateDto(data);

      return await this.http.post(url, data, { headers });
    } catch (error) {
      throw new Error(`Failed to get credit report: ${error?.message}`);
    }
  }

  private async validateDto<T>(dto: T): Promise<void> {
    const errors = await validate(dto as any);
    if (errors.length > 0) {
      throw new BadRequestException(
        `Validation failed: ${this.formatValidationErrors(errors)}`,
      );
    }
  }

  private formatValidationErrors(errors: any[]): string {
    return errors
      .map((err) => Object.values(err.constraints).join(', '))
      .join(', ');
  }
}
