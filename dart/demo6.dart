void main() {
  l();
  s();
  m();
}

void l() {
  List<int> l1 = [1, 2, 3];

  print(l1);

  var l2 = new List();
  l2.add(5);
  l2.add(6);
  print(l2);

  print(l2.length);

  print(l2.isEmpty);

  print(l2.isNotEmpty);

  print(l2.reversed);

  var l3 = l2.reversed.toList();

  print(l3);

  var l4 = new List();
  l4.add('长生殿');
  print(l4);

  l4.addAll(['7', 8, 9]);
  print(l4);

  print(l4.indexOf(7));
  print(l4.indexOf('7'));

  l4.remove('7');
  print(l4);

  l4.removeLast();
  print(l4);

  l4.removeAt(1);
  print(l4);

  List l5 = [1, 2, 3, 4];
  l5.fillRange(0, 3, 'ok');

  print(l5);

  l5.insert(1, 'aaa');
  print(l5);
  l5.insertAll(1, ['jjj', 'kkk']);
  print(l5);

  print(l5.join('--'));

  var l6 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  print(l6.where((v) {
    return v > 7;
  }).toList());

  print(l6.any((v) {
    return v > 4;
  }));

  print(l6.every((v) {
    return v > 5;
  }));
}

void s() {
  var s = new Set();

  s.add('1');
  s.add('1');
  s.add('1');

  print(s);
  print(s.toList());

  var a = [1, 1, 2, 2, 3, 3, 3];
  var s2 = new Set();
  s2.addAll(a);

  print(s2.toList());
}

void m() {
  Map person = {"name": '张三', "age": 20};

  print(person.keys);
  print(person.keys.toList());
  print(person.values);
  print(person.values.toList());

  print(person.isEmpty);
  print(person.isNotEmpty);

  print(person is Map);

  Map o = {"name": '1', "age": 22};

  o.addAll({
    "work": ["美团骑手", "工程师"]
  });

  print(o);

  o.remove('name');
  print(o);

  print(o.containsValue('张三'));
  print(o.containsValue(22));

  o.forEach((k, v) {
    print('$k ===> $v');
  });
}
