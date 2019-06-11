void main() {
  int a = 29;
  int b = 10;

  print(a + b);
  print(a * b);
  print(a ~/ b);

  print(a == b);
  print(a > b);
  print(a >= b);

  calc();
  transform();
}

void calc() {
  int a = 10;
  int b = 3;

  int c = a + b;

  print(c);

  int d;

  d ??= 23;

  print(d);
}

void transform() {
  String str = '123';
  String str1 = '123.4';

  var n = int.parse(str);
  var n2 = double.parse(str1);
  print(n is int);
  print(n2 is double);
  print(str is String);

  String str3 = '';

  try {
    var n3 = double.parse(str3);
    print(n3);
  } catch (e) {
    print('error');
    var n3 = 'ok';
    print(n3);
  }

// =================

  var i = 19;

  var s1 = i.toString();
  print(s1);

  var s2 = 'xxx';
  var s3;

  if (s2.isEmpty) {
    print('jj');
  } else {
    print('xx');
  }

  print(s3 == null);

  var n4 = 0 / 0;
  print(n4);

  if (n4.isNaN) {
    print('NAN');
  }
}
