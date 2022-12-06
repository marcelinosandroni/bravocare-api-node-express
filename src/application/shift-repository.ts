import { ShiftPersistenceDto } from "./shift-persistence-dto";

export interface ShiftRepository {
  findAll(): Promise<ShiftPersistenceDto[]>;
}
