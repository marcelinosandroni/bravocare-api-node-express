import { Entity } from "./entity";

interface FacilityProperties {
  name: string;
}

export class Facility extends Entity<FacilityProperties> {
  get name(): string {
    return this.properties.name;
  }

  private constructor(properties: FacilityProperties, id?: number) {
    super(properties, id);
  }

  static create(properties: FacilityProperties, id?: number): Facility {
    if (!properties.name) {
      throw new Error("Facility name is required");
    }
    if (properties.name.length < 3) {
      throw new Error("Facility name must be at least 3 characters");
    }
    return new Facility(properties, id);
  }

  changeName(name: string): void {
    if (!name) {
      throw new Error("name is required");
    }
    this.properties.name = name;
  }
}
