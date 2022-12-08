export interface Mapper<Entity, View = unknown> {
  toViewModel(input: Entity): View;
  toPersistence(input: Entity): unknown;
  fromPersistence(input: unknown): unknown;
  fromViewModel(input: unknown): unknown;
  fromPersistenceToViewModel(input: unknown): View;
}
