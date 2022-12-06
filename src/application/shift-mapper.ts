import { Shift } from "domain/shift";
import { ShiftPersistenceDto } from "./shift-persistence-dto";
import { ShiftViewModel } from "./shift-view-model";

export class ShiftMapper {
  static toPersistence(shift: Shift): ShiftPersistenceDto {
    return {
      shift_id: shift.id,
      facility_id: shift.facility.id,
      shift_date: shift.date.toTimeString(),
      start_time: shift.startTime.value,
      end_time: shift.endTime.value,
    };
  }

  static toViewModel(shift: Shift): ShiftViewModel {
    return {
      id: shift.id,
      facilityId: shift.facility.id,
      date: shift.date.toISOString(),
      startTime: shift.startTime.value,
      endTime: shift.endTime.value,
    };
  }

  static fromPersistenceToViewModel(
    persistence: ShiftPersistenceDto
  ): ShiftViewModel {
    return new ShiftViewModel(
      persistence.shift_id,
      persistence.facility_id,
      persistence.shift_date,
      persistence.start_time,
      persistence.end_time
    );
  }
}
