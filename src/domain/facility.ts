interface FacilityProperties {
  id: number;
  name: string;
}

export class Facility {
  private properties: FacilityProperties;

  get id(): number {
    return this.properties.id;
  }

  get name(): string {
    return this.properties.name;
  }

  private constructor(properties: FacilityProperties) {
    this.properties = properties;
  }

  static create(properties: FacilityProperties): Facility {
    if (!properties.id) {
      throw new Error("Facility id is required");
    }
    if (properties.id < 0) {
      throw new Error("Facility id must be greater than 0");
    }
    if (!properties.name) {
      throw new Error("Facility name is required");
    }
    if (properties.name.length < 3) {
      throw new Error("Facility name must be at least 3 characters");
    }
    return new Facility(properties);
  }

  changeName(name: string): void {
    if (!name) {
      throw new Error("name is required");
    }
    this.properties.name = name;
  }
}
