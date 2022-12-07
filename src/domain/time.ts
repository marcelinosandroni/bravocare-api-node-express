export class Time {
  private constructor(public readonly value: string) {}

  static create(value: string | number): Time {
    const isMilliseconds = typeof value === "number";
    if (isMilliseconds) {
      return Time.fromMilliseconds(value);
    }
    return new Time(value);
  }

  static fromMilliseconds(milliseconds: number): Time {
    const time = new Date(milliseconds);
    return new Time(time.getUTCHours() + ":" + time.getUTCMinutes());
  }

  toMilliseconds(): number {
    const [hours, minutes] = this.value.split(":");
    const time = new Date();
    time.setUTCHours(parseInt(hours));
    time.setUTCMinutes(parseInt(minutes));
    return time.getTime();
  }

  toMinutes(): number {
    const [hours, minutes] = this.value.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  }

  toHours(): number {
    const [hours, minutes] = this.value.split(":");
    return parseInt(hours) + parseInt(minutes) / 60;
  }

  getHours(): number {
    const [hours, minutes, seconds] = this.value.split(":");
    return parseInt(hours) + parseInt(minutes) / 60 + parseInt(seconds) / 3600;
  }
}
