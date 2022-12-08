import { Connection } from "./connection";
import { postgresqlConfig } from "./config/postgresql-config";
import { Pool } from "pg";

// mange native postgresql connections
export class PostgresConnection implements Connection {
  /**
   * postgresql connection pool shared in the application
   * default to 100 conections, after that it will wait for a connection to be released
   */
  static pool: Pool;
  static connected = false;
  static connecting = false;

  constructor() {
    PostgresConnection.pool = new Pool(postgresqlConfig);
    PostgresConnection.pool.addListener("error", this.handleError);
    this.connect();
  }

  handleError(error: Error): void {
    PostgresConnection.connected = false;
    console.error("Something terrible happened in the database", error);
  }

  async query<Output>(query: string, params?: unknown[]): Promise<Output[]> {
    const result = await PostgresConnection.pool.query(query, params);
    return result.rows;
  }

  async connect(): Promise<void> {
    if (PostgresConnection.connected || PostgresConnection.connecting) {
      return;
    }
    PostgresConnection.connecting = true;
    try {
      await PostgresConnection.pool.connect();
      PostgresConnection.connected = true;
      PostgresConnection.connecting = false;
      console.log("Connected to postgres database with native driver");
    } catch (error) {
      PostgresConnection.connected = false;
      console.error(`Erro connecting to database`, error);
    }
  }

  async close(): Promise<void> {
    await PostgresConnection.pool.end();
  }
}
