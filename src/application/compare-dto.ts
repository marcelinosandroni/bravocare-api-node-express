import { Shift } from "@domain/shift";
import { ShiftMapper } from "./shift-mapper";
import { ShiftViewModel } from "./shift-view-model";

export class CompareShiftViewModel {
  public first: ShiftViewModel;
  public second: ShiftViewModel;
  public overlapMinutes: number;
  public overlapThreshold: number;
  public exceededOverlap: boolean;

  constructor(
    first: Shift,
    second: Shift,
    overlapMinutes: number,
    overlapThreshold: number,
    exceededOverlap: boolean
  ) {
    this.first = ShiftMapper.toViewModel(first);
    this.second = ShiftMapper.toViewModel(second);
    this.overlapMinutes = overlapMinutes;
    this.overlapThreshold = overlapThreshold;
    this.exceededOverlap = exceededOverlap;
  }
}
