export type RequiredAllBut<Type, Key extends keyof Type> = Omit<Type, Key> & {
  [Property in Key]?: Type[Property];
};
