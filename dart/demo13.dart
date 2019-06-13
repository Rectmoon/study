abstract class Db {
  String uri;
  add(String data);
  delete();
  edit();
  find();
}

class Mysql implements Db {
  Mysql(this.uri);
  @override
  add(String data) {
    print('this is mysql add method ${data}');
  }

  @override
  delete() {
    return null;
  }

  @override
  edit() {
    return null;
  }

  @override
  find() {
    return null;
  }

  @override
  String uri;
}

class Mongo implements Db {
  @override
  add(String data) {
    return null;
  }

  @override
  delete() {
    return null;
  }

  @override
  edit() {
    return null;
  }

  @override
  find() {
    return null;
  }

  @override
  String uri;
}

class Mybatis implements Db {
  @override
  add(String data) {
    return null;
  }

  @override
  delete() {
    return null;
  }

  @override
  edit() {
    return null;
  }

  @override
  find() {
    return null;
  }

  @override
  String uri;
}

main() {
  Mysql msl = new Mysql('abc');
  msl.add('111');
}
