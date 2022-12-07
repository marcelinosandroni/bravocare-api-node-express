import { ShiftPersistenceDto } from "application/shift-persistence-dto";
import { ShiftRepository } from "application/shift-repository";

export class ShiftMemoryRepository implements ShiftRepository {
  private readonly shifts: ShiftPersistenceDto[] = [];

  constructor() {
    this.shifts.push({
      shift_id: 1,
      facility_id: 1,
      facility_name: "Facility A",
      shift_date: "2021-01-01",
      start_time: "08:00",
      end_time: "16:00",
    });
    this.shifts.push({
      shift_id: 2,
      facility_id: 1,
      facility_name: "Facility A",
      shift_date: "2021-01-02",
      start_time: "08:00",
      end_time: "16:00",
    });
    this.shifts.push({
      shift_id: 3,
      facility_id: 1,
      facility_name: "Facility A",
      shift_date: "2021-01-03",
      start_time: "08:00",
      end_time: "16:00",
    });
    this.shifts.push({
      shift_id: 4,
      facility_id: 1,
      facility_name: "Facility A",
      shift_date: "2021-01-04",
      start_time: "08:00",
      end_time: "16:00",
    });
    this.shifts.push({
      shift_id: 5,
      facility_id: 1,
      facility_name: "Facility A",
      shift_date: "2021-01-05",
      start_time: "08:00",
      end_time: "16:00",
    });
    this.shifts.push({
      shift_id: 6,
      facility_id: 1,
      facility_name: "Facility A",
      shift_date: "2021-01-06",
      start_time: "08:00",
      end_time: "16:00",
    });
    this.shifts.push({
      shift_id: 7,
      facility_id: 1,
      facility_name: "Facility A",
      shift_date: "2021-01-07",
      start_time: "08:00",
      end_time: "16:00",
    });
    this.shifts.push({
      shift_id: 8,
      facility_id: 1,
      facility_name: "Facility A",
      shift_date: "2021-01-08",
      start_time: "08:00",
      end_time: "16:00",
    });
    this.shifts.push({
      shift_id: 9,
      facility_id: 1,
      facility_name: "Facility A",
      shift_date: "2021-01-09",
      start_time: "08:00",
      end_time: "16:00",
    });
    this.shifts.push({
      shift_id: 10,
      facility_id: 1,
      facility_name: "Facility A",
      shift_date: "2021-01-10",
      start_time: "08:00",
      end_time: "16:00",
    });
  }

  async findAll(): Promise<ShiftPersistenceDto[]> {
    return this.shifts;
  }
}
