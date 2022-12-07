let number: boolean | number | string | Symbol | null | undefined;
number = "asdfjadkfl";
number = 10;
number = true;
let list: number[] = [1, 2, 3, 4, 5];

type NumberOrSTring = number | string;
type Person = {
  readonly name: string;
  age: number;
};

let person: Person = {
  name: "John",
  age: 30,
};

person.age = 20;
person.name = "asdlfkjsdkf";

abstract class Animal {
  public legs = 4;
}

class Human extends Animal {
  constructor(public name, private age, protected height) {}
}
