import { Entity } from "./entity";
import { Facility } from "./facility";
import { Time } from "./time";

interface ShiftProperties {
  facility: Facility;
  date: Date;
  startTime: Time;
  endTime: Time;
  durationInMinutes: number;
}

type ShiftInput = Omit<ShiftProperties, "durationInMinutes">;

export class Shift extends Entity<ShiftProperties> {
  get facility(): Facility {
    return this.properties.facility;
  }

  get date(): Date {
    return this.properties.date;
  }

  get startTime(): Time {
    return this.properties.startTime;
  }

  get endTime(): Time {
    return this.properties.endTime;
  }

  private constructor(properties: ShiftProperties, id?: number) {
    super(properties, id);
  }

  static create(properties: ShiftInput): Shift {
    if (!properties.facility) {
      throw new Error("Shift facility is required");
    }
    if (!properties.date) {
      throw new Error("Shift date is required");
    }
    if (!properties.startTime) {
      throw new Error("Shift start time is required");
    }
    if (!properties.endTime) {
      throw new Error("Shift end time is required");
    }
    if (properties.startTime >= properties.endTime) {
      throw new Error("Shift start time must be before end time");
    }
    const durationInMinutes =
      properties.endTime.toMinutes() - properties.startTime.toMinutes();
    if (durationInMinutes < 10) {
      throw new Error("Shift must be at least 10 minutes");
    }
    return new Shift({
      ...properties,
      durationInMinutes,
    });
  }

  private static calculateDurationInMinutes(
    startTime: Date,
    endTime: Date
  ): number {
    return endTime.getTime() - startTime.getTime() / 1_000 / 60;
  }

  correctFacility(facility: Facility): void {
    if (!facility) {
      throw new Error("facility is required");
    }
    this.properties.facility = facility;
  }

  changeDate(date: Date): void {
    if (!date) {
      throw new Error("date is required");
    }
    this.properties.date = date;
  }

  adjustStartTime(startTime: Time): void {
    if (!startTime) {
      throw new Error("start time is required");
    }
    if (startTime.toMilliseconds() >= this.endTime.toMilliseconds()) {
      throw new Error("start time must be before end time");
    }
    const durationInMinutes = this.endTime.toMinutes() - startTime.toMinutes();
    if (durationInMinutes < 10) {
      throw new Error("Shift must be at least 10 minutes");
    }
    this.properties.startTime = startTime;
    this.properties.durationInMinutes = durationInMinutes;
  }

  adjustEndTime(endTime: Time): void {
    if (!endTime) {
      throw new Error("end time is required");
    }
    if (endTime.toMilliseconds() <= this.startTime.toMilliseconds()) {
      throw new Error("end time must be after start time");
    }
    const durationInMinutes = endTime.toMinutes() - this.startTime.toMinutes();
    if (durationInMinutes < 10) {
      throw new Error("Shift must be at least 10 minutes");
    }
    this.properties.endTime = endTime;
    this.properties.durationInMinutes = durationInMinutes;
  }
}
