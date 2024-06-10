import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  key: process.env.JWT_KEY,
  expired: process.env.AUTH_EXPIRED || '1h',
  ignoreExpiration: Boolean(process.env.IGNORE_EXPIRATION) || false,
}));
