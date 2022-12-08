import { JobPersistenceDto } from "@application/dtos/job-persistence-dto";
import { JobRepository } from "@application/job-repository";
import { Connection } from "./connection";

export class JobPostgresqlRepository implements JobRepository {
  constructor(
    private readonly connection: Connection,
    readonly tableName = "jobs",
    readonly facilityTableName = "facilities",
    readonly nurseTableName = "nurse_hired_jobs"
  ) {}

  findAll(): Promise<JobPersistenceDto[]> {
    const query = `
      SELECT j.*, f.facility_name, COUNT(n.job_id) as hired_nurses
      FROM ${this.tableName} j
      INNER JOIN 
      ${this.facilityTableName} f ON j.facility_id = f.facility_id
      INNER JOIN
      ${this.nurseTableName} n ON j.job_id = n.job_id
      GROUP BY n.job_id, j.job_id, f.facility_id
      ORDER BY j.facility_id ASC, j.nurse_type_needed ASC
    `;
    return this.connection.query<JobPersistenceDto>(query);
  }
}
