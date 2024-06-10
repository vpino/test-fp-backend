import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  userName: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD ?? 'fuap',
  database: process.env.POSTGRES_DATABASE,
  entities: [
    __dirname + '/modules/**/entities/*.entity{.ts,.js}',
    __dirname + '/common/entities/*.entity{.ts,.js}'
  ],
  synchronize: process.env.SYNCHRONIZE ? true : false,
  logging: process.env.LOGGING?.split(',') ?? ['error, query'],
  migrationsTableName: 'migration',
  migrations: ['src/migration/*.ts'],
  ssl: process.env.MODE,
}));
