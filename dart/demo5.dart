void main() {
  var a = 10;

  a++;

  print(a);

  var b = 100;

  print(b--);

  print(b);

  var c = 1000;

  print(--c);

  f();
  w();
  bc();
}

void f() {
  for (int i = 0; i < 10; i++) {
    print(i);
  }

  print('====');
  for (int j = 0; j < 10; ++j) {
    print(j);
  }
  print('====');
  for (int i = 0; i <= 100; i++) {
    if (i % 2 == 0) {
      print(i);
    }
  }

  print('====');
  var a = 0;
  for (int j = 100; j > 0; j--) {
    a += j;
  }

  print(a);

  List l1 = ['张三', '李四', '王五'];

  for (int i = 0; i < l1.length; i++) {
    print(l1[i]);
  }
}

void w() {
  int i = 1;

  while (i < 3) {
    print(i);
    i++;
  }

  int j = 60;
  int n = 0;
  while (j < 100) {
    n += j;
    j++;
  }
  print(n);

  int k = 60;
  int sum = 0;
  do {
    sum += k;
    k++;
  } while (k < 100);

  print(sum);
}

void bc() {
  for (int i = 0; i < 10; i++) {
    if (i == 2) continue;
    print(i);
  }

  int j = 3;

  while (j <= 10) {
    print(j);
    j++;

    if (j == 6) {
      break;
    }
  }
}
