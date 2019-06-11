void main() {
  var s1 = 'this is s1';
  var s2 = 'this is s2';

  print(s1);
  print(s2);

  String s3 = 'this is s3';
  String s4 = 'this is s4';

  print(s3);
  print(s4);

  String s5 = '''kkk
    this is s5
    this is s5
    this is s5
  ''';

  print(s5);

  String s6 = 'hello';

  String s7 = 'world';

  print('$s6 $s7');

  print(s6 + ' ' + s7);

  num();
  bol();
  list();
  map();
}

void num() {
  print(1);

  int a = 1;

// double 既可以是整数类型， 也可以是浮点类型
  double b = 25.5;

  print(a);
  print(b);

  var c = a + b;

  print(c);
}

void bol() {
  bool flag1 = true;

  bool flag2 = false;

  print(flag1 && flag2);

  if (flag1)
    print(1);
  else
    print(2);

  var s8 = '123';
  var s9 = 123;

  print(s8 == s9);
}

void list() {
  var l1 = ['a', 'b'];

  print(l1);
  print(l1.length);

  print(l1[0]);

  var l2 = new List();
  l2.add('7');
  l2.add(8);
  l2.add(9);
  l2.add(1);

  print(l2);

  // l2.sort(); error

  print(l2);

  var l3 = new List<String>();

  l3.add('1');
}

void map() {
  var person = {
    'name': '张三',
    'work': ['铲屎官', '攻城狮']
  };

  print(person);

  print(person['name']);
  print(person['work']);

  var p = new Map();

  p['name'] = '李四';
  p['age'] = 22;

  print(p);

  print(p is String);
}
