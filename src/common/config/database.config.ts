import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { join } from 'path';

export const typeOrmConfigOptions = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: +process.env.DATABASE_PORT,
    autoLoadEntities: true,
    entities: [join(__dirname, '../../**/**/*.entity{.ts,.js}')],
    synchronize: true,
    logging: true,
    logger: 'file',
  };
};

export default registerAs('database', () => ({
  config: typeOrmConfigOptions(),
}));
