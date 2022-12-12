import { Router } from "express";
import { ExpressRouteAdapter } from "./adapters/express-route-adapter";
import { ListFacilityJobsControllerFactory } from "./factories/list-facility-jobs-controller-factory";
import { ListUnasignedNursesControllerFactory } from "./factories/list-unasigned-nurses-controller-facotry";

export const router = Router();

router.get(
  "/jobs",
  ExpressRouteAdapter.adapt(ListFacilityJobsControllerFactory.create())
);

router.get(
  "/nurses",
  ExpressRouteAdapter.adapt(ListUnasignedNursesControllerFactory.create())
);
