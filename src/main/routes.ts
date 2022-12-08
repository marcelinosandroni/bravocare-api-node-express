import { Router } from "express";
import { ExpressRouteAdapter } from "./adapters/express-route-adapter";
import { ListFacilityJobsControllerFactory } from "./factories/list-facility-jobs-controller-factory";

export const router = Router();

router.get(
  "/jobs",
  ExpressRouteAdapter.adapt(ListFacilityJobsControllerFactory.create())
);
