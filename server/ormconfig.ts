import * as path from 'path';
import { DataSource } from 'typeorm';
import { getConfig } from './src/common/config';

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
  migrations: [path.join(__dirname, 'database/migrations/*{.ts,.js}')],
});

export default PostgresDataSource;
