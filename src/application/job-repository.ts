import { JobPersistenceDto } from "./dtos/job-persistence-dto";

export interface JobRepository {
  findAll(): Promise<JobPersistenceDto[]>;
  getHiringJobs(): Promise<JobPersistenceDto[]>;
}
