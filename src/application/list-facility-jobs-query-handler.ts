import { Job } from "@domain/job";
import { Result } from "@domain/result";
import { JobViewDto } from "./dtos/job-view-dto";
import { JobRepository } from "./job-repository";
import { Mapper } from "./mapper";

export class ListFacilityJobsQueryHandler {
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly jobMapper: Mapper<Job, JobViewDto>
  ) {}

  async handle(): Promise<Result<JobViewDto[]>> {
    const jobs = await this.jobRepository.findAll();
    const jobsView = jobs.map<JobViewDto>(
      this.jobMapper.fromPersistenceToViewModel
    );
    return Result.success(jobsView);
  }
}
