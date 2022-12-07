import { Connection } from "./connection";
import { postgresqlConfig } from "./config/postgresql-config";
import { Pool, PoolClient, QueryArrayResult, QueryResultRow } from "pg";

// mange native postgresql connections
export class PostgresConnection implements Connection {
  /**
   * postgresql connection pool shared in the application
   * default to 100 conections, after that it will wait for a connection to be released
   */
  static pool: Pool;

  constructor() {
    PostgresConnection.pool = new Pool(postgresqlConfig);
    PostgresConnection.pool.addListener("error", this.handleError);
    this.connect();
  }

  handleError(error: Error): void {
    console.error("Something terrible happened in the database", error);
  }

  async query<Output extends Record<string, unknown>>(
    query: string,
    params?: unknown[]
  ): Promise<Output[]> {
    const result = await PostgresConnection.pool.query<Output>(query, params);
    return result.rows;
  }

  async connect(): Promise<void> {
    try {
      if (PostgresConnection.pool.totalCount) {
        console.log("Pool already connected");
        return;
      }
      await PostgresConnection.pool.connect();
      console.log("Connected to postgres database with native driver");
    } catch (error) {
      console.error(`Erro connecting to database`, error);
    }
  }

  async close(): Promise<void> {
    await PostgresConnection.pool.end();
  }
}
