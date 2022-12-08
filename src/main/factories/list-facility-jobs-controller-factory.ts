import { JobMapper } from "@application/job-mapper";
import { ListFacilityJobsQueryHandler } from "@application/list-facility-jobs-query-handler";
import { JobPostgresqlRepository } from "@persistence/job-postgresql-repository";
import { PostgresConnection } from "@persistence/postgres";
import { ListFacilityJobsController } from "@presentation/list-facility-jobs-controller";

/**
 * Factory to create all the dependencies for the ListFacilityJobsController
 *
 * The complete flow requires the following dependencies:
 * - Connection to the database
 * - Repository to access the database
 * - Mapper to convert between the domain, view and the database
 * - Query handler to execute the query
 * - Controller to handle the request
 */
export class ListFacilityJobsControllerFactory {
  static create(): ListFacilityJobsController {
    const connection = new PostgresConnection();
    const jobRepository = new JobPostgresqlRepository(connection);
    const mapper = new JobMapper();
    const useCase = new ListFacilityJobsQueryHandler(jobRepository, mapper);
    return new ListFacilityJobsController(useCase);
  }
}
