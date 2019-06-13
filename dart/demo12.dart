import 'lib/Animal.dart';

class Dog extends Animal {
  @override
  eat() {
    print('dog is eating');
  }

  @override
  run() {
    // TODO: implement run
    print('dog is running');
  }

  say() {}
}

class Cat extends Animal {
  @override
  eat() {
    // TODO: implement eat
    print('cat is eating');
  }

  @override
  run() {
    // TODO: implement run
    print('cat is running');
  }
}

main() {
  Dog d1 = new Dog();
  d1.eat();
  d1.run();

  Cat c1 = new Cat();

  c1.eat();
  c1.run();

  Animal d2 = new Dog();
  d2.eat();

  Animal c2 = new Cat();
  c2.run();
}
