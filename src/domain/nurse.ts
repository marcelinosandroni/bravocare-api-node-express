import { Entity } from "./entity";
import { RequiredAllBut } from "./require-all-but";

interface NurseProperties {
  name: string;
  type: string;
  isAvailable: boolean;
}

type NurseInput = RequiredAllBut<NurseProperties, "isAvailable">;

export class Nurse extends Entity<NurseProperties> {
  get name() {
    return this.properties.name;
  }

  get type() {
    return this.properties.type;
  }

  get isAvailable(): boolean {
    return this.properties.isAvailable;
  }

  private constructor(properties: NurseProperties, id?: number) {
    super(properties, id);
  }

  static create(properties: NurseInput, id?: number) {
    if (!properties.name) {
      throw new Error("Nurse must have a name.");
    }
    if (!properties.name.trim().length) {
      throw new Error("Nurse name cannot be empty.");
    }
    if (!properties.type) {
      throw new Error("Nurse must have a type.");
    }
    const isAvailable = properties.isAvailable ?? false;
    return new Nurse({ ...properties, isAvailable }, id);
  }

  assign(): this {
    this.properties.isAvailable = false;
    return this;
  }

  unassign(): this {
    this.properties.isAvailable = true;
    return this;
  }

  changeName(name: string): this {
    if (!name) {
      throw new Error("Nurse must have a name.");
    }
    if (!name.trim().length) {
      throw new Error("Nurse name cannot be empty.");
    }
    this.properties.name = name;
    return this;
  }

  changeType(type: string): this {
    if (!type) {
      throw new Error("Nurse must have a type.");
    }
    this.properties.type = type;
    return this;
  }
}
