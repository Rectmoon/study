// TypeScript装饰器的类型有：类装饰器、访问器装饰器、属性装饰器、方法装饰器、参数装饰器，但是没有函数装饰器(function)。

// =====================================================
//  1.类装饰器
// =====================================================
/* 
  类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
    如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明
*/

function Path(path: string) {
  return function(target: Function, ...args: any[]) {
    // console.log(target) // Service1
    // console.log(args) // []
    !target.prototype.$Meta && (target.prototype.$Meta = {})
    target.prototype.$Meta.baseUrl = path
  }
}

@Path('/hello')
class Service1 {
  [x: string]: any
  constructor() {}
}

console.log(Service1.prototype.$Meta) // 输出：{ baseUrl: '/hello' }
let hello = new Service1()
console.log(hello.$Meta) // 输出：{ baseUrl: '/hello' }

// =====================================================
// 2 方法装饰器
// =====================================================
/* 
方法装饰会在运行时传入下列3个参数：
  1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
  2、成员的名字。
  3、成员的属性描述符。
*/

function GET(url: string) {
  return function(target: any, methodName: string, descriptor: PropertyDescriptor) {
    // console.log(target)
    !target.$Meta && (target.$Meta = {})
    target.$Meta[methodName] = url
  }
}

class Service2 {
  constructor() {}
  @GET('xx')
  getUser() {}
}

console.log((<any>Service2).prototype.$Meta)

// =====================================================
// 3 方法参数装饰器
// =====================================================
/* 
参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
    1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    2、参数的名字。
    3、参数在函数参数列表中的索引。
*/

function PathParam(paramName: string) {
  return function(target: any, methodName: string, paramIndex: number) {
    !target.$Meta && (target.$Meta = {})
    target.$Meta[paramIndex] = paramName
  }
}

class Service3 {
  constructor() {}

  getUser(@PathParam('userId') userId: string, @PathParam('password') password: string) {}
}

console.log((<any>Service3).prototype.$Meta) // {0: "userId", 1: "password"}

// =====================================================
// 4 属性装饰器
// =====================================================
/* 
属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
    1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    2、成员的名字。
*/

function DefaultValue(value: string) {
  return function(target: any, propertyName: string) {
    target[propertyName] = value
  }
}

class Service4 {
  @DefaultValue('world') greeting: string | undefined
}

console.log(new Service4().greeting) // 输出: world

// =====================================================
// 4 访问器装饰器（几乎同方法装饰器，装饰器的结构也一样，只是作用在getter和setter上）
// =====================================================
/* 
访问器装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
    对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
    成员的名字。
    成员的属性描述符。
*/
function configurable(value: boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value
  }
}

class Point {
  private _x: number
  private _y: number
  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }
  @configurable(false) get x() {
    return this._x
  }
  @configurable(false) get y() {
    return this._y
  }
}

// =====================================================
// 装饰器的执行顺序
// =====================================================
/* 
  1.类属性装饰器
  2.访问器装饰器
  3.函数参数装饰器 函数参数装饰器2
  3.函数参数装饰器 函数参数装饰器1
  4.类的函数装饰器
  5.类的装饰器
*/

function logCls(params: string) {
  return function(target: any) {
    console.log('5.类的装饰器')
  }
}

function logMehod(params: string) {
  return function(target: any, key: string, descriptor: { [propsName: string]: any }) {
    console.log('4.类的函数装饰器')
  }
}

function logParams(params: string) {
  return function(target: any, name: string) {
    console.log('1.类属性装饰器')
  }
}

function logGetterSetter(params: boolean) {
  return function(target: any, name: string) {
    console.log('2.访问器装饰器')
  }
}

function logQuery(params: string) {
  return function(target: any, key: string, index: number) {
    console.log('3.函数参数装饰器', params)
  }
}

@logCls('类的装饰器')
class Person {
  @logParams('属性装饰器')
  public name: string | undefined

  @logGetterSetter(false) get x() {
    return this.name
  }

  @logMehod('函数装饰器')
  getData(@logQuery('函数参数装饰器1') age: number, @logQuery('函数参数装饰器2') gender: string) {
    console.log('----')
  }
}
