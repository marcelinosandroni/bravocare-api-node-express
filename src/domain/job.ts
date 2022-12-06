import { Facility } from "./facility";

interface JobProperties {
  id: number;
  facility: Facility;
  role: string;
  amount: number;
}

export class Job {
  get id(): number {
    return this.properties.id;
  }

  get facility(): Facility {
    return this.properties.facility;
  }

  get role(): string {
    return this.properties.role;
  }

  get amount(): number {
    return this.properties.amount;
  }

  private constructor(private properties: JobProperties) {}

  static create(properties: JobProperties): Job {
    if (!properties.id) {
      throw new Error("Job id is required");
    }
    if (properties.id < 0) {
      throw new Error("Job id must be greater than 0");
    }
    if (!properties.facility) {
      throw new Error("Job facility is required");
    }
    if (!properties.role) {
      throw new Error("Job role is required");
    }
    if (properties.role.length < 3) {
      throw new Error("Job role must be at least 3 characters");
    }
    if (!properties.amount) {
      throw new Error("Job amount is required");
    }
    if (properties.amount < 0) {
      throw new Error("Job amount must be greater than 0");
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
