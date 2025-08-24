import * as path from 'path';
import { DataSource } from 'typeorm';
import { getConfig } from './common/config';

const { host, postgresPort, user, password, database } = getConfig();

const PostgresDataSource = new DataSource({
  type: 'postgres',
  host,
  port: postgresPort,
  username: user,
  password,
  database,
  synchronize: false,
  logging: true,
  entities: [path.join(__dirname, 'src/**/*.entity{.ts,.js}')],
  migrations: ['dist/database/migrations/*.js'],
});

export default PostgresDataSource;
