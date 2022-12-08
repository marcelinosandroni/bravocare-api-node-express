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

  static create(properties: ShiftInput, id?: number): Shift {
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
    const durationInMinutes =
      properties.startTime.toHours() < properties.endTime.toHours()
        ? properties.endTime.toMinutes() - properties.startTime.toMinutes()
        : properties.startTime.toMinutes() - properties.endTime.toMinutes();
    if (durationInMinutes < 10) {
      throw new Error("Shift must be at least 10 minutes");
    }
    return new Shift(
      {
        ...properties,
        durationInMinutes,
      },
      id
    );
  }

  private static calculateDurationInMinutes(
    startTime: Date,
    endTime: Date
  ): number {
    return endTime.getTime() - startTime.getTime() / 1_000 / 60;
  }

  calculateOverlapThreshold(other: Shift): number {
    return this.facility.id === other.facility.id ? 30 : 0;
  }

  calculateOverlapMinutes(other: Shift): number {
    if (this.date.toDateString() !== other.date.toDateString()) {
      return 0;
    }

    if (
      this.endTime.getHours() > other.startTime.getHours() &&
      this.endTime.getHours() < other.endTime.getHours()
    ) {
      return Math.round(this.endTime.toMinutes() - other.startTime.toMinutes());
    }

    if (
      other.endTime.getHours() > this.startTime.getHours() &&
      other.endTime.getHours() < this.endTime.getHours()
    ) {
      return Math.round(other.endTime.toMinutes() - this.startTime.toMinutes());
    }

    return 0;
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
