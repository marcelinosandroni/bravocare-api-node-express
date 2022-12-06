import { ShiftPersistenceDto } from "@application/shift-persistence-dto";
import { ShiftRepository } from "@application/shift-repository";
import { Shift } from "@domain/shift";
import { Pool, PoolClient } from "pg";

export class ShiftPostgresRepository implements ShiftRepository {
  private readonly pool = new Pool({
    user: "test",
    password: "test",
    database: "exam",
    host: "localhost",
    port: 5432,
    max: 100,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 60_000,
  });

  private client!: PoolClient;

  tableName = "question_one_shifts";

  constructor() {
    this.connect();
  }

  async findAll(): Promise<ShiftPersistenceDto[]> {
    const queryResult = await this.pool.query<ShiftPersistenceDto>(
      `SELECT * FROM ${this.tableName}`
    );
    console.log({
      total: this.pool.totalCount,
      idle: this.pool.idleCount,
      waiting: this.pool.waitingCount,
    });
    return queryResult.rows;
  }

  async connect(): Promise<void> {
    try {
      this.client = await this.pool.connect();
      console.log("Connected to postgres database");
    } catch (error) {
      console.error(error);
    }
  }

  async disconnect(): Promise<void> {
    await this.pool.end();
  }

  async create(shift: Shift): Promise<number> {
    const result = await this.pool.query(
      "INSERT INTO shifts (facility_id, shift_data, start_time, end_time,) VALUES ($1, $2, $3, $4) RETURNING id",
      [
        shift.facility.id,
        shift.date,
        shift.startTime.value,
        shift.endTime.value,
      ]
    );
    console.log({ result });

    return result.rows[0];
  }
}
