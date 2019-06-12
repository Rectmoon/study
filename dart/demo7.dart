void main() {
  int getNum() {
    return 123;
  }

  var n = getNum();

  print(n);

  List getList() {
    return [1, 2, 3];
  }

  print(getList());

  print(getSum(10));
  printUserInfo('a', 10);
  printUserInfo('a', 20, '222', 'male');
  printUserInfo1('a', 20, interest: '666', sex: 'male');

  fetch(p);
  fetch(() {
    print(getSum(100));
  });
}

int getSum(n) {
  int sum = 0;
  for (int i = 0; i <= n; i++) sum += i;
  return sum;
}

void printUserInfo(String username, int age,
    [String interest = '111', String sex]) {
  print("username => $username, age => $age, interest => $interest");
  if (sex != null)
    print('sex => $sex');
  else
    print('sex is secret');
}

void printUserInfo1(String username, int age,
    {String interest, sex = 'female'}) {
  print("username => $username, age => $age, interest => $interest");
  if (sex != null)
    print('sex => $sex');
  else
    print('sex is secret');
}

void fetch(cb) {
  print('111, $cb');
  cb();
}

void p() {
  print('p');
}
