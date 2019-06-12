void main() {
  List l1 = [1, 2, 3];

  l1.forEach((value) => print(value));

  List l2 = [1, 2, 3, 4];

  var l3 = l2.map((value) {
    if (value >= 2) return value * 2;
  });

  var l4 = l2.map((value) => value > 2 ? value * 3 : value);

  print(l3.toList());
  print(l4);

  exercise1();
  exercise2();
  exercise3();
}

void exercise1() {
  bool isEvenNumber(int n) {
    return n % 2 == 0;
  }

  print(isEvenNumber(3));
  print(isEvenNumber(4));
  printNum(int n) {
    for (int j = 0; j <= n; j++) {
      if (isEvenNumber(j)) print(j);
    }
  }

  printNum(10);
}

void exercise2() {
  (() {
    print('over here');
  })();

  var sum = 0;
  fn(n) {
    sum += n;
    if (n == 0) return;
    fn(n - 1);
  }

  fn(100);
  print(sum);
}

void exercise3() {
  printInfo() {
    var a = 1;
    return () {
      a++;
      print(a);
    };
  }

  var b = printInfo();
  b();
  b();
}
