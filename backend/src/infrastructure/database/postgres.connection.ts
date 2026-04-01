import { Pool } from 'pg';
import { getDbCredentials } from './postgres.secrets';
import { getTenantContext } from './tenant-context';
import { initPlatformPostgres } from './platform.connection';

let defaultPool: Pool | null = null;

export async function initPostgres(): Promise<void> {
  await initPlatformPostgres();

  const connectionString = process.env.DATABASE_URL?.trim();

  const connectionConfig = connectionString
    ? {
        connectionString,
      }
    : await buildConnectionConfigFromSecret();

  defaultPool = new Pool({
    ...connectionConfig,
    ssl: {
      rejectUnauthorized: false,
    },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

  await defaultPool.query('SELECT 1');
}

export function getPgPool(): Pool {
  const context = getTenantContext();

  if (context?.pool) {
    return context.pool;
  }

  if (!defaultPool) {
    throw new Error('Postgres pool not initialized');
  }

  return defaultPool;
}

async function buildConnectionConfigFromSecret() {
  if (!process.env.DB_SECRET_NAME) {
    throw new Error(
      'Postgres config missing. Define DATABASE_URL or DB_SECRET_NAME.',
    );
  }

  const creds = await getDbCredentials();

  return {
    host: creds.host,
    port: creds.port,
    user: creds.username,
    password: creds.password,
    database: creds.dbname,
  };
}
