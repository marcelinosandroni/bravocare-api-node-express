import { ListAllShiftsQueryHandler } from "@application/list-all-shifts";
import { ShiftPostgresRepository } from "@persistence/shift-postgres-repository";
import { ListShiftsController } from "@presentation/list-shifts-controller";
import cors from "cors";
import express from "express";

const app = express();
app.use(express.json());
app.use(cors());

const shiftPostgresRepository = new ShiftPostgresRepository();
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
app.listen(3000, () => console.log(`Server started on port 3000`));
