import './Person.dart';

class Women extends Person {
  String interest;
  Women(String sex, int age, String interest) : super(sex, age) {
    this.interest = interest;
  }

  run() {
    print('${this.sex} --- ${this.age} --- ${this.interest}');
  }

  @override
  void foo() {
    print(2);
    super.foo();
  }
}
