import { Result } from "@domain/result";
import { ShiftPersistenceDto } from "./shift-persistence-dto";

export interface ShiftRepository {
  findAll(): Promise<ShiftPersistenceDto[]>;
  findById(...id: number[]): Promise<Result<ShiftPersistenceDto[]>>;
}
