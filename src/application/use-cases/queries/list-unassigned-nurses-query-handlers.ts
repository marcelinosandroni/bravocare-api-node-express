import { JobPersistenceDto } from "@application/dtos/job-persistence-dto";
import { JobViewDto } from "@application/dtos/job-view-dto";
import { NursePersistenceDto } from "@application/dtos/nurse-persistence-dto";
import { NurseViewDto } from "@application/dtos/nurse-view-dto";
import { JobRepository } from "@application/job-repository";
import { Mapper } from "@application/mapper";
import { Job } from "@domain/job";
import { Nurse } from "@domain/nurse";
import { Result } from "@domain/result";
import { NurseRepository } from "@persistence/nurse-repository";
import { QueryHandler } from "./query-handler";

export class ListUnassignedNursesQueryHandler
  implements QueryHandler<Result<NurseViewDto[]>>
{
  constructor(
    private readonly nurseRepository: NurseRepository,
    private readonly jobRepository: JobRepository,
    private readonly nurseMapper: Mapper<
      Nurse,
      NurseViewDto,
      NursePersistenceDto
    >,
    private readonly jobMapper: Mapper<Job, JobViewDto, JobPersistenceDto>
  ) {}

  async handle(): Promise<Result<NurseViewDto[]>> {
    const nurseQueryResult = await this.nurseRepository.getUnassignedNurses();
    if (nurseQueryResult.isFailure) {
      return Result.failure(nurseQueryResult.error);
    }
    const jobsQueryResult = await this.jobRepository.getHiringJobs();
    const nurses = nurseQueryResult.value.map((nurse) =>
      this.nurseMapper.fromPersistence(nurse).unassign()
    );
    const jobs = jobsQueryResult.map((job) =>
      this.jobMapper.fromPersistence(job)
    );

    console.log({ nurses: nurses.map((nurse) => nurse.toObject()) });
    console.log({
      jobs: jobs.map((job) => job.toObject()).filter((job) => job.isHiring),
    });
    const unassignedNurses = nurses.map((nurse) => ({
      ...nurse.toObject(),
      oportunities: jobs.filter(
        (job) => job.isHiring && job.role === nurse.type
      ).length,
    }));

    const view = nurses.map((nurse) => this.nurseMapper.toViewModel(nurse));

    return Result.success(unassignedNurses as unknown as NurseViewDto[]);
  }
}
