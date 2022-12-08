import { Result } from "@domain/result";
import { CompareShiftViewModel } from "./compare-dto";
import { CompareShiftsCommand } from "./compare-shifts-command";
import { ShiftMapper } from "./shift-mapper";
import { ShiftRepository } from "./shift-repository";

export class CompareShiftsCommandHandler {
  constructor(private readonly shiftRepository: ShiftRepository) {}

  async handle(
    command: CompareShiftsCommand
  ): Promise<Result<CompareShiftViewModel>> {
    if (command.firstShiftId === command.secondShiftId) {
      return Result.failure(new Error("Shifts must be different to compare"));
    }
    const shiftsResult = await this.shiftRepository.findById(
      command.firstShiftId,
      command.secondShiftId
    );
    if (shiftsResult.isFailure) {
      return Result.failure(shiftsResult.error);
    }
    const [firstShift, secondShift] = shiftsResult.value;
    if (!firstShift || !secondShift) {
      const notFoundIds = Object.values(command).filter(
        (id) => ![firstShift?.shift_id, secondShift?.shift_id].includes(id)
      );
      return Result.failure(
        new Error(`Shifts with id ${notFoundIds.join(" and ")} not found`)
      );
    }
    const firstEntity = ShiftMapper.fromPersistence(firstShift);
    const secondEntity = ShiftMapper.fromPersistence(secondShift);
    const overlapThreshold =
      firstEntity.calculateOverlapThreshold(secondEntity);
    const overlapMinutes = firstEntity.calculateOverlapMinutes(secondEntity);

    const viewModel = new CompareShiftViewModel(
      firstEntity,
      secondEntity,
      overlapMinutes,
      overlapThreshold,
      overlapMinutes > overlapThreshold
    );
    return Result.success(viewModel);
  }
}
