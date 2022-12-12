import { NursePersistenceDto } from "@application/dtos/nurse-persistence-dto";
import { Result } from "@domain/result";
import { Connection } from "./connection";
import { NurseRepository } from "./nurse-repository";

export class NursePostgresqlRepository implements NurseRepository {
  constructor(
    private readonly connection: Connection,
    readonly tableName = "nurses",
    readonly hiredNursesTableName = "nurse_hired_jobs"
  ) {}

  async getUnassignedNurses(): Promise<Result<NursePersistenceDto[]>> {
    try {
      const query = `
        SELECT n.* FROM ${this.tableName} n 
        WHERE n.nurse_id NOT IN
        (select nurse_id from ${this.hiredNursesTableName} h)
      `;
      const queryResult = await this.connection.query<NursePersistenceDto>(
        query
      );
      return Result.success(queryResult);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return Result.failure(error);
      }
      return Result.failure(new Error("Unknown error"));
    }
  }

  findAll(): Promise<NursePersistenceDto[]> {
    const query = `
      SELECT * FROM nurses
    `;
    return this.connection.query<NursePersistenceDto>(query);
  }
}
