import { JobMapper } from "@application/job-mapper";
import { NurseMapper } from "@application/mappers/nurse-mapper";
import { ListUnassignedNursesQueryHandler } from "@application/use-cases/queries/list-unassigned-nurses-query-handlers";
import { JobPostgresqlRepository } from "@persistence/job-postgresql-repository";
import { NursePostgresqlRepository } from "@persistence/nurse-postgresql-repository";
import { PostgresConnection } from "@persistence/postgres";
import { Controller } from "@presentation/controller";
import { ListUnasignedNursesController } from "@presentation/controllers/list-unasigned-nurses-controller";

export class ListUnasignedNursesControllerFactory {
  static create(): Controller {
    const connection = new PostgresConnection();
    const nurseRepository = new NursePostgresqlRepository(connection);
    const jobRepository = new JobPostgresqlRepository(connection);
    const nurseMapper = new NurseMapper();
    const jobMapper = new JobMapper();
    const useCase = new ListUnassignedNursesQueryHandler(
      nurseRepository,
      jobRepository,
      nurseMapper,
      jobMapper
    );
    return new ListUnasignedNursesController(useCase);
  }
}
