import { ShiftMapper } from "./shift-mapper";
import { ShiftRepository } from "./shift-repository";

export class ListAllShiftsQueryHandler {
  constructor(private readonly shiftRepository: ShiftRepository) {}

  // Query return only view model, not domain model
  async handle(): Promise<any> {
    const persistenceShifts = await this.shiftRepository.findAll();
    const shiftViewModel = persistenceShifts.map((shift) => {
      return ShiftMapper.fromPersistenceToViewModel(shift);
    });
    return shiftViewModel;
  }
}
