export class Entity<Type> {
  private _id?: number;
  protected isNew = false;

  get id(): number {
    return this._id || 0;
  }

  constructor(protected properties: Type, id?: number) {
    this.properties = properties;
    this._id = id;
    if (!id) {
      this.isNew = true;
    }
  }

  toObject(): Type {
    return this.properties;
  }
}
