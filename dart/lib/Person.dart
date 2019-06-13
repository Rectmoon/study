class Person {
  static String username = '张三';
  static void show() {
    print(username);
  }

  String name;
  String sex;
  int age;

  Person(this.sex, this.age);

  void printInfo() {
    print('${this.sex}----${this.age}');
  }

  void foo() {
    print(1);
  }
}
