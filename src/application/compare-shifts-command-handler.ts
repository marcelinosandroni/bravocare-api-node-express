import { CompareShiftViewModel } from "./compare-dto";
import { CompareShiftsCommand } from "./compare-shifts-command";
import { ShiftMapper } from "./shift-mapper";
import { ShiftRepository } from "./shift-repository";

export class CompareShiftsCommandHandler {
  constructor(private readonly shiftRepository: ShiftRepository) {}

  async handle(command: CompareShiftsCommand): Promise<CompareShiftViewModel> {
    const shifts = await this.shiftRepository.findById(
      command.firstShiftId,
      command.secondShiftId
    );
    const [firstShift, secondShift] = shifts;
    const firstEntity = ShiftMapper.fromPersistence(firstShift);
    const secondEntity = ShiftMapper.fromPersistence(secondShift);
    const overlapThreshold =
      firstEntity.calculateOverlapThreshold(secondEntity);
    const overlapMinutes = firstEntity.calculateOverlapMinutes(secondEntity);

    return new CompareShiftViewModel(
      firstEntity,
      secondEntity,
      overlapThreshold,
      overlapMinutes,
      overlapMinutes > overlapThreshold
    );
  }
}
