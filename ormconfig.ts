import { DataSource } from 'typeorm';
import { databaseConfig } from './src/config/db.config';

export default new DataSource({
    ...databaseConfig,
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
});
