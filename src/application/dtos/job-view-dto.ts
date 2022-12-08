export class JobViewDto {
  remainingNursesNeeded: number;

  constructor(
    public id: number,
    public facility: { id: number; name: string },
    public nurseTypeNeeded: string,
    public totalNumberNursesNeeded: number,
    public hiredNurses: number,
    remainingNursesNeeded?: number
  ) {
    if (typeof remainingNursesNeeded !== "number") {
      this.remainingNursesNeeded =
        this.totalNumberNursesNeeded - this.hiredNurses;
    } else {
      this.remainingNursesNeeded = remainingNursesNeeded;
    }
  }
}
