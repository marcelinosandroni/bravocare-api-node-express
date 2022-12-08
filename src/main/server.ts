import dotenv from "dotenv";
dotenv.config();

import { CompareShiftsCommandHandler } from "@application/compare-shifts-command-handler";
import { ListAllShiftsQueryHandler } from "@application/list-all-shifts";
import { PostgresConnection } from "@persistence/postgres";
import { ShiftPostgresRepository } from "@persistence/shift-postgres-repository";
import { CompareShiftsController } from "@presentation/compare-shifts-controller";
import { ListShiftsController } from "@presentation/list-shifts-controller";
import cors from "cors";
import express from "express";
import { logger } from "../application/logger";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const postgresqlConnection = new PostgresConnection();
const shiftPostgresRepository = new ShiftPostgresRepository(
  postgresqlConnection
);
const listAllShiftsQueeryHandler = new ListAllShiftsQueryHandler(
  shiftPostgresRepository
);
const listAllShiftsController = new ListShiftsController(
  listAllShiftsQueeryHandler
);
app.get("/shifts", async (request, response) => {
  const httpResponse = await listAllShiftsController.handle();
  return response.status(httpResponse.statusCode).send(httpResponse.body);
});

// Separate in a Factory
const compareShiftCommandHandler = new CompareShiftsCommandHandler(
  shiftPostgresRepository
);
const compareShiftController = new CompareShiftsController(
  compareShiftCommandHandler
);

// Separate in a Adapter
app.post("/shifts/compare", async (request, response) => {
  const httpResponse = await compareShiftController.handle(request);
  return response.status(httpResponse.statusCode).send(httpResponse.body);
});

// Application
app.listen(3000, () => console.log(`Server started on port 3000`));
logger.info("server started testing log");
