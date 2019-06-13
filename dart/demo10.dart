import './lib/Person.dart';

main() {
  print(Person.username);
  Person.show();

  Person p1;
  Person p2 = new Person('男', 25);

  p1?.printInfo();
  p2?.printInfo();

  Person p3 = new Person('女', 29);
  if (p3 is Person) {
    p3.name = '李四';
  }
  print(p3.name);

  Person p4 = new Person('女', 20);
  p4.printInfo();
  p4
    ..name = '赵六'
    ..age = 24
    ..printInfo();
}
