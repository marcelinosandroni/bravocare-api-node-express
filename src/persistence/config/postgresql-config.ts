import { PoolConfig } from "pg";

export const postgresqlConfig: PoolConfig = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "") || 5432,
  max: 100,
  connectionTimeoutMillis: 60_000,
  idleTimeoutMillis: 60_000,
} as const;
