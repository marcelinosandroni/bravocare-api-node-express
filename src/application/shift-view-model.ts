export class ShiftViewModel {
  constructor(
    public readonly id: number,
    public readonly facilityId: number,
    public readonly date: string,
    public readonly startTime: string,
    public readonly endTime: string
  ) {}
}
