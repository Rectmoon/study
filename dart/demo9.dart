class Person {
  String name;
  int age;

  // Person(name, age) {
  //   this.name = name;
  //   this.age = age;
  // }

  Person(this.name, this.age);

  Person.now() {
    print('hello dude');
  }

  void getInfo() {
    print("$name ==== $age");
    print("${this.name} ==== ${this.age}");
  }

  void setInfo(String name, int age) {
    this.name = name;
    this.age = age;
  }
}

void main() {
  Object a = 1;
  Object b = true;

  print(a is int);
  print(b is bool);

  Person p1 = new Person('王五', 18);

  p1.getInfo();
  p1.setInfo('李四', 22);
  p1.getInfo();

  Person p2 = new Person('赵六', 18);
  p2.getInfo();

  Person p3 = new Person.now();

  p3.getInfo();
}
