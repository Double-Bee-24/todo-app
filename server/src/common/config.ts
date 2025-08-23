import 'dotenv/config';
import typia from 'typia';
import type { EnvObject } from 'src/types/EnvObject.type';

export const getConfig = () => {
  const { env } = process;

  // process.env returns strings and typia doesn't parse, only validate the data,
  // so we should coerce types that should be numbers manually
  const transformed = {
    ...env,
    PORT: Number(env.PORT) || 5000,
    POSTGRES_PORT: Number(env.POSTGRES_PORT) || 5432,
  };

  const validatedEnv = typia.assert<EnvObject>(transformed);

  return {
    env: validatedEnv.NODE_ENV,
    port: validatedEnv.PORT || 5000,
    user: validatedEnv.POSTGRES_USER,
    password: validatedEnv.POSTGRES_PASSWORD,
    database: validatedEnv.POSTGRES_DB,
    host: validatedEnv.POSTGRES_HOST,
    postgresPort: validatedEnv.POSTGRES_PORT,
  };
};
