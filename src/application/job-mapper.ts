import { Facility } from "@domain/facility";
import { Job } from "@domain/job";
import { JobPersistenceDto } from "./dtos/job-persistence-dto";
import { JobViewDto } from "./dtos/job-view-dto";
import { Mapper } from "./mapper";

export class JobMapper implements Mapper<Job> {
  toViewModel(job: Job): JobViewDto {
    return new JobViewDto(
      job.id,
      { id: job.facility.id, name: job.facility.name },
      job.role,
      job.amount,
      job.hired,
      job.remaining
    );
  }

  toPersistence(job: Job): JobPersistenceDto {
    return new JobPersistenceDto(
      job.id,
      job.facility.id,
      job.facility.name,
      job.role,
      job.amount,
      job.hired,
      job.amount
    );
  }

  fromPersistence(persistence: JobPersistenceDto): Job {
    const facility = Facility.create(
      {
        name: persistence.facility_name,
      },
      persistence.facility_id
    );
    return Job.create(
      {
        facility,
        role: persistence.nurse_type_needed,
        amount: persistence.total_number_nurses_needed,
        hired: persistence.hired_nurses,
        remaining: persistence.remaining_nurses_needed,
      },
      persistence.job_id
    );
  }

  fromViewModel(view: JobViewDto): Job {
    const facility = Facility.create(
      { name: view.facility.name },
      view.facility.id
    );
    return Job.create(
      {
        facility,
        role: view.nurseTypeNeeded,
        amount: view.totalNumberNursesNeeded,
        hired: view.hiredNurses,
        remaining: view.remainingNursesNeeded,
      },
      view.id
    );
  }

  fromPersistenceToViewModel(persistence: JobPersistenceDto): JobViewDto {
    return new JobViewDto(
      persistence.job_id,
      { id: persistence.facility_id, name: persistence.facility_name },
      persistence.nurse_type_needed,
      persistence.total_number_nurses_needed,
      Number(persistence.hired_nurses)
    );
  }
}
