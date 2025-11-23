import { DataSource } from 'typeorm';
import { databaseConfig } from './src/config/db.config';

export default new DataSource({
  ...databaseConfig,
  entities: ['src/**/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
