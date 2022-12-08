import { ShiftPersistenceDto } from "@application/shift-persistence-dto";
import { ShiftRepository } from "@application/shift-repository";
import { Result } from "@domain/result";
import { Shift } from "@domain/shift";
import { Connection } from "./connection";

// Manage native postgresql operations
export class ShiftPostgresRepository implements ShiftRepository {
  constructor(
    private readonly connection: Connection,
    private readonly tableName: string = "question_one_shifts",
    private readonly facilityTableName = "facilities"
  ) {}

  async findAll(): Promise<ShiftPersistenceDto[]> {
    // get all shifts columns with facility name on facility table
    const query = `
      SELECT s.*, f.facility_name FROM ${this.tableName} s 
      INNER JOIN ${this.facilityTableName} f 
      ON s.facility_id = f.facility_id
    `;
    return this.connection.query<ShiftPersistenceDto>(query);
  }

  async findById(...id: number[]): Promise<Result<ShiftPersistenceDto[]>> {
    const query = `
      SELECT s.*, f.facility_name FROM ${this.tableName} s 
      INNER JOIN ${this.facilityTableName} f 
      ON s.facility_id = f.facility_id
      WHERE s.shift_id = ANY($1)
    `;
    // const query = `
    // SELECT * FROM ${this.tableName} WHERE shift_id = ANY($1)`;
    try {
      const response = await this.connection.query<ShiftPersistenceDto>(query, [
        id,
      ]);
      console.log({ response });
      return Result.success(response);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return Result.failure(error);
      }
      return Result.failure(new Error(String(error) || "Unknown error"));
    }
  }

  async create(shift: Shift): Promise<unknown> {
    const query = `
      INSERT INTO shifts (facility_id, shift_data, start_time, end_time) 
      VALUES ($1, $2, $3, $4) 
      RETURNING id
    `;
    const result = await this.connection.query(query, [
      shift.facility.id,
      shift.date,
      shift.startTime.value,
      shift.endTime.value,
    ]);
    console.log({ result });

    return result;
  }
}
