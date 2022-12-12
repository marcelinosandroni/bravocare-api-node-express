import { NurseViewDto } from "@application/dtos/nurse-view-dto";
import { QueryHandler } from "@application/use-cases/queries/query-handler";
import { Result } from "@domain/result";
import { Controller } from "@presentation/controller";
import { HttpResponse } from "@presentation/http-response";

export class ListUnasignedNursesController implements Controller {
  constructor(private readonly useCase: QueryHandler<Result<NurseViewDto[]>>) {}
  async handle(): Promise<HttpResponse> {
    const useCaseResult = await this.useCase.handle();
    if (useCaseResult.isFailure) {
      return {
        statusCode: 500,
        body: useCaseResult.error?.message,
      };
    }
    if (useCaseResult.value.length === 0) {
      return {
        statusCode: 204,
        body: [],
      };
    }
    return {
      statusCode: 200,
      body: useCaseResult.value,
    };
  }
}
