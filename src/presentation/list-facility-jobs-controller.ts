import { ListFacilityJobsQueryHandler } from "@application/list-facility-jobs-query-handler";
import { Controller } from "./controller";
import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";

export class ListFacilityJobsController implements Controller {
  constructor(private readonly useCase: ListFacilityJobsQueryHandler) {}

  async handle(request: HttpRequest<unknown>): Promise<HttpResponse> {
    const result = await this.useCase.handle();
    if (result.isFailure) {
      return {
        statusCode: 500,
        body: result.error?.message,
      };
    }
    if (result.value.length === 0) {
      return {
        statusCode: 204,
        body: [],
      };
    }
    return {
      statusCode: 200,
      body: result.value,
    };
  }
}
