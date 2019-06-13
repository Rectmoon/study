/** 
 * 1. 作为mixins的类只能继承自Object， 不能继承其他类
 * 2. 作为mixins的类不能有构造函数
 * 3. 一个类可以mixins多个mixins类
 * 4. mixins 既不是继承, 也不是接口
*/
class Person {
  String name;
  int age;
  Person(this.name, this.age);
  say() {
    print('how do you do ?');
  }

  run() {
    print('Person is running');
  }
}

class A {
  String str = 'this is A';
  void printA() {
    print('A');
  }

  void run() {
    print('A is running');
  }
}

class B {
  void printB() {
    print('B');
  }

  void run() {
    print('B is running');
  }
}

class C extends Person with B, A {
  C(String name, int age) : super(name, age);
}

main() {
  C c1 = new C('张三', 20);
  print(c1.str);
  c1.printA();
  c1.printB();
  c1.say();
  c1.run();

  print(c1 is A);
  print(c1 is B);
  print(c1 is C);
  print(c1 is Person);
}
