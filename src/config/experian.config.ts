import { registerAs } from '@nestjs/config';

export default registerAs('experian', () => ({
  baseUrl: process.env.EXPERIAN_BASE_URL,
  clientId: process.env.EXPERIAN_CLIENT_ID,
  clientSecret: process.env.EXPERIAN_CLIENT_SECRET,
}));
