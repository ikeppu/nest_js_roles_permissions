import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { join } from 'path/posix';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

function setupEnvFile() {
  const envFileExpand =
    process.env.NODE_ENV === 'development'
      ? ['.env.test.local', '.env.test']
      : ['.env'];

  envFileExpand.forEach((path: string) => expand(config({ path })));
}
setupEnvFile();

export const getDbConfig = (): PostgresConnectionOptions => {
  return {
    type: 'postgres',
    url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/${process.env.POSTGRES_DB}`,
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    migrations: ['dist/database/migrations/*.js'],
    migrationsTableName: 'migration',
    migrationsTransactionMode: 'each',
    synchronize: false,
    logging:
      process.env.NODE_ENV === 'development' || process.env.DEBUG
        ? true
        : false,
    extra: {
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 5000,
      keepAlive: true,
    },
  };
};

const dataSource = new DataSource(getDbConfig());

export default dataSource;
