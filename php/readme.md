#指定字符串的方法: 1.双引号;2.单引号;3.heredoc 语法(<<<)
标记符号必须顶头写,否则会得到 Parse error: syntax error, unexpected end of file in 的错误.
其中双引号和 heredoc 语法是插补的，即会计算串中的变量标识符： 1.标识符可以是由任意长度的数字、字母、下划线组成; 2.标识符不能以数字开头; 3.标识符区分大小写，如$tireqty 与$TireQty 是不同的,但函数名称不区分大小写; 4.变量名可以与函数名称相同，但应该尽量避免这种情况，此外不能创建一个与已有函数同名的函数。

#数据类型：
a.普通类型
1.Inter(整数);
2.Float(浮点数，也叫 Double，双精度)，用来表示所有实数;
3.String(字符串);
4.Boolean(布尔值);
5.Array(数组),用来保存具有相同类型的多个数据项;
6.Object(对象)，用来保存类的实例;
b.特殊类型:
NULL(空):没有被赋值、以及被重置或者被赋值为特殊值 NULL 的变量就是 NULL 类型变量
resource(资源):特殊的内置函数(如数据库函数)将返回 resource 类型的变量，它们代表外部资源(如数据库连接)，基本上不能直接操作一个 resource 变量,但是通常它们都将被函数返回,且必须作为参数传递给其他函数;
callable:通常都是可以传递给其他函数的函数。

#变量处理函数

1.测试和设置变量类型
gettype():获取类型
settype():设置类型
is_array():检查变量是否为数组
is_double()、is_float()、is_real()：检测变量是否是浮点数
is_long()、is_int()、is_integer():检测变量是否是整数
is_string():检测变量是否是字符串
is_bool():检测变量是否是布尔值
is_object():检测变量是否是一个对象
is_resource():检测变量是否是一个资源
is_null():检测变量是否为 null
is_scalar():检测变量是否为标量,即整数、布尔值、字符串或浮点数
is_numeric():检测变量是否是任何类型的数字或数字字符串
is_callable():检测变量是否是有效的函数名称

2.测试变量状态
bool isset(mixed var[,mixed var[,...]])检测一组变量是否都被设置了
void unset(mixed var,[mixed var[,...]])销毁一个传进来的变量
bool empty(mixed var) 检查一个变量是否存在以及它的值是否为空和 0

3.变量重解释用于转换变量数据类型如下三个函数可以实现此功能:
int intval(mixed var[,int base=10])
float floatval(mixed var)
string strval(mixed var)

```
$a = 6;
echo gettype($a);
settype($a,'float');
echo gettype($a);
```
