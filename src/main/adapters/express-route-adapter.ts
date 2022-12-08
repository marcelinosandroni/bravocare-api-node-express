import { Controller } from "@presentation/controller";
import { HttpRequest } from "@presentation/http-request";
import { Request, Response } from "express";

/**
 * Adapter to convert the Express http request and response
 * to application request and response
 */
export class ExpressRouteAdapter {
  static adapt(controller: Controller) {
    return async (request: Request, response: Response) => {
      const httpRequest: HttpRequest = {
        body: request.body,
      };
      const httpResponse = await controller.handle(httpRequest);
      response.status(httpResponse.statusCode).send(httpResponse.body);
    };
  }
}
