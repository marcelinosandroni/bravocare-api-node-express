import { Entity } from "./entity";
import { Facility } from "./facility";

interface JobProperties {
  facility: Facility;
  role: string;
  amount: number;
  hired: number;
  remaining: number;
}

export class Job extends Entity<JobProperties> {
  get facility(): Facility {
    return this.properties.facility;
  }

  get role(): string {
    return this.properties.role;
  }

  get amount(): number {
    return this.properties.amount;
  }

  get hired(): number {
    return this.properties.hired;
  }

  get remaining(): number {
    return this.properties.remaining;
  }

  private constructor(properties: JobProperties, id?: number) {
    super(properties, id);
  }

  static create(properties: JobProperties, id?: number): Job {
    if (!properties.facility) {
      throw new Error("Job facility is required");
    }
    if (!properties.role) {
      throw new Error("Job role is required");
    }
    if (properties.role.length < 2) {
      throw new Error("Job role must be at least 2 characters");
    }
    if (!properties.amount) {
      throw new Error("Job amount is required");
    }
    if (properties.amount < 0) {
      throw new Error("Job amount must be equal or greater than 0");
    }
    if (!properties.hired) {
      properties.hired = 0;
    }
    if (!properties.remaining) {
      properties.remaining = properties.amount;
    }
    return new Job(properties);
  }

  changeFacility(facility: Facility): void {
    if (!facility) {
      throw new Error("facility is required");
    }
    this.properties.facility = facility;
  }

  changeRole(role: string): void {
    if (!role) {
      throw new Error("role is required");
    }
    if (role.length < 3) {
      throw new Error("role must be at least 3 characters");
    }
    this.properties.role = role;
  }

  adjustAmount(amount: number): void {
    if (!amount) {
      throw new Error("amount is required");
    }
    if (amount < 0) {
      throw new Error("amount must be greater than 0");
    }
    this.properties.amount = amount;
  }
}
