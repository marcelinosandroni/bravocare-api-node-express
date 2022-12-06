import { ListAllShiftsQueryHandler } from "application/list-all-shifts";
import { Controller } from "./controller";
import { HttpResponse } from "./http-response";

export class ListShiftsController implements Controller {
  constructor(private readonly useCase: ListAllShiftsQueryHandler) {}

  async handle(): Promise<HttpResponse> {
    const shifts = await this.useCase.handle();
    if (!shifts.length) {
      return {
        statusCode: 204,
        body: [],
      };
    }
    return {
      statusCode: 200,
      body: shifts,
    };
  }
}
