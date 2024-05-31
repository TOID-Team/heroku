import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: process.env.POSTGRES_PASSWORD,

  entities: ['src/entities/*.ts'],
  logging: true,
  synchronize: true,
});
