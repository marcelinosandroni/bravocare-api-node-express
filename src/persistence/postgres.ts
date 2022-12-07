import { Connection } from "./connection";
import { postgresqlConfig } from "./config/postgresql-config";
import { Pool, PoolClient, QueryArrayResult, QueryResultRow } from "pg";

// mange native postgresql connections
export class PostgresConnection implements Connection {
  public pool: Pool;

  constructor() {
    this.pool = new Pool(postgresqlConfig);
    this.connect();
    this.pool.addListener("error", this.handleError);
  }

  handleError(error: Error): void {
    console.error("Something terrible occued in database connection", error);
  }

  async query<Output extends Record<string, unknown>>(
    query: string,
    params?: unknown[]
  ): Promise<Output[]> {
    const result = await this.pool.query<Output>(query, params);
    console.log({
      total: this.pool.totalCount,
      idle: this.pool.idleCount,
      waiting: this.pool.waitingCount,
    });
    return result.rows;
  }

  async connect(): Promise<void> {
    try {
      await this.pool.connect();
      console.log("Connected to postgres database with native driver");
    } catch (error) {
      console.error(error);
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
