import { registerAs } from '@nestjs/config';

export default registerAs('equifax', () => ({
  baseUrl: process.env.EQUIFAX_BASE_URL,
  clientId: process.env.EQUIFAX_CLIENT_ID,
  clientSecret: process.env.EQUIFAX_CLIENT_SECRET,
}));
