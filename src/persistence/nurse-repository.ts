import { NursePersistenceDto } from "@application/dtos/nurse-persistence-dto";
import { Result } from "@domain/result";

export interface NurseRepository {
  findAll(): Promise<NursePersistenceDto[]>;
  getUnassignedNurses(): Promise<Result<NursePersistenceDto[]>>;
}
