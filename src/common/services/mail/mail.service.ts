import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { IEmailData } from '../../../common/interfaces/email-data.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  private clientMailGun;

  constructor(private configService: ConfigService) {
    const mailgun = new Mailgun(FormData);
    this.clientMailGun = mailgun.client({
      username: this.configService.get<string>('mailgun.userName'),
      key: this.configService.get<string>('mailgun.key'),
    });
  }

  async sendEmail(emailData: IEmailData): Promise<boolean> {
    try {
      const logoPath = path.join(
        process.cwd(),
        'public',
        'luppa-admin-logo.png',
      );
      const logoData = fs.readFileSync(logoPath);

      const messageData = {
        from: this.configService.get<string>('mailgun.from'),
        to: emailData?.email,
        subject: `LUPPA SPORT: ${emailData?.subject}`,
        template: 'register luppa admin',
        'h:X-Mailgun-Variables': JSON.stringify({
          name: emailData?.name,
          mainMessage: emailData?.mainMessage,
          secondMessage: emailData?.secondMessage,
          action: emailData?.actionTag,
          url: emailData?.url,
        }),
        inline: {
          filename: 'logo.png',
          data: logoData,
        },
      };

      await this.clientMailGun.messages.create(
        this.configService.get<string>('mailgun.domain'),
        messageData,
      );
      return true;
    } catch (error) {
      console.error(`sendEmail: ${error}`);
      return false;
    }
  }
}
