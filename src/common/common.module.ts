import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
import { MailService } from './services/mail/mail.service';

@Module({
  providers: [AxiosAdapter, MailService],
  exports: [AxiosAdapter, MailService],
})
export class CommonModule {}
