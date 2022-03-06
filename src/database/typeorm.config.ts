import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenv } from 'dotenv';
import { join } from 'path';
dotenv();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOSTNAME,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '../domain/**/*.entity{.ts,.js}')],
  dropSchema: false,
  migrationsRun: true,
  synchronize: true,
  autoLoadEntities: true,
};

export default typeOrmConfig;
