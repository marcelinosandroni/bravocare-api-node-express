export interface Mapper<Entity, View = unknown, Persistence = unknown> {
  toViewModel(input: Entity): View;
  toPersistence(input: Entity): Persistence;
  fromPersistence(input: Persistence): Entity;
  fromViewModel(input: View): Entity;
  fromPersistenceToViewModel(input: Persistence): View;
}
