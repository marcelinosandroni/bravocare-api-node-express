import { CompareShiftsCommandHandler } from "@application/compare-shifts-command-handler";
import { Controller } from "./controller";
import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";

interface CompareShiftsRequest {
  firstShiftId: number;
  secondShiftId: number;
}

export class CompareShiftsController implements Controller {
  constructor(private readonly useCase: CompareShiftsCommandHandler) {}

  async handle(
    request: HttpRequest<CompareShiftsRequest>
  ): Promise<HttpResponse> {
    if (!request.body.firstShiftId || !request.body.secondShiftId) {
      return {
        statusCode: 400,
        body: {
          error: "firstShiftId and secondShiftId are required",
        },
      };
    }

    const { firstShiftId, secondShiftId } = request.body;
    const result = await this.useCase.handle({ firstShiftId, secondShiftId });
    return {
      statusCode: 200,
      body: result,
    };
  }
}
