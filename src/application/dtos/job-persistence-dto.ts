export class JobPersistenceDto {
  constructor(
    public job_id: number,
    public facility_id: number,
    public facility_name: string,
    public nurse_type_needed: string,
    public total_number_nurses_needed: number,
    public hired_nurses: number,
    public remaining_nurses_needed: number
  ) {}
}
