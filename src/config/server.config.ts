import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  enviroment: process.env.NODE_ENV || 'develop',
  port: process.env.PORT || 3000,
}));
