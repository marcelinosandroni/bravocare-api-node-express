export interface ShiftPersistenceDto {
  [column: string]: unknown;
  shift_id: number;
  facility_id: number;
  facility_name: string;
  shift_date: string;
  start_time: string;
  end_time: string;
}
