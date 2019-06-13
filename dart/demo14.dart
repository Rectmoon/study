abstract class A {
  printA();
}

abstract class B {
  printB();
}

class C implements A, B {
  @override
  printA() {
    print('A');
  }

  @override
  printB() {
    print('B');
  }
}

main() {
  C c1 = new C();

  c1.printA();
  c1.printB();
}
