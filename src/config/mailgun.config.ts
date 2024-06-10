import { registerAs } from '@nestjs/config';

export default registerAs('mailgun', () => ({
  key: process.env.MAILGUN_API_KEY,
  userName: process.env.MAILGUN_USER_NAME,
  from: process.env.MAILGUN_FROM,
  domain: process.env.MAILGUN_EMAIL_DOMAIN,
}));
