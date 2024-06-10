import { registerAs } from '@nestjs/config';

export default registerAs('throttler', () => ({
  name: process.env.THROTTLER_NAME || 'HROTTLER',
  ttl: parseInt(process.env.THROTTLER_TTL) || 60000,
  limit: parseInt(process.env.THROTTLER_LIMIT) || 10,
}));
