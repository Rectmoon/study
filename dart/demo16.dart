String getStringData(String value) {
  return value;
}

int getIntData(int value) {
  return value;
}

T getData<T>(T value) {
  return value;
}

class PrintClass<T> {
  List list = new List<T>();
  void add(T value) {
    this.list.add(value);
  }

  void printInfo() {
    this.list.forEach((value) => print(value));
  }
}

abstract class Cache<T> {
  getByKey(String key);
  void setByKey(String key, T value);
}

class FileCache<T> implements Cache<T> {
  @override
  getByKey(String key) {
    return null;
  }

  @override
  void setByKey(String key, T value) {
    print('文件缓存 key=${key} value=${value} 写入文件中');
  }
}

class MemoryCache<T> implements Cache<T> {
  @override
  getByKey(String key) {
    return null;
  }

  @override
  void setByKey(String key, T value) {
    print('内存缓存 key=${key} value=${value} 写入内存中');
  }
}

void main() {
  print(getData<String>('111'));
  print(getData<int>(222));

  PrintClass p = new PrintClass();
  p.add(1);
  p.add(2);
  p.add('123');
  p.add(true);
  p.printInfo();

  print('==========');

  PrintClass p1 = new PrintClass<String>();
  p1.add('1');
  p1.add('2');
  p1.add('333');
  p1.printInfo();

  print('==========');

  PrintClass p2 = new PrintClass<int>();
  p2.add(11);
  p2.add(22);
  p2.add(33);
  p2.printInfo();

  print('===========');

  MemoryCache m1 = new MemoryCache<String>();
  m1.setByKey('a', 'a页数据');

  MemoryCache m2 = new MemoryCache<Map>();
  m2.setByKey('a', {"name": 'lisi', "age": 20});
}
