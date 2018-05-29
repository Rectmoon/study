<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Juliny's Php Study</title>
</head>

<body>
  <h1>Juliny's Free LifeStyle</h1>
  <h2>Order Results</h2>

  <?php
    echo '<p>Order processed at '.date('H:i, jS F Y').'</p>';
    $tireqty = $_POST['tireqty'];
    $oilqty = $_POST['oilqty'];
    $sparkqty = $_POST['sparkqty'];
    echo '<p>Your order is as follows: </p>';
    echo htmlspecialchars($tireqty).' tires<br />';
    echo htmlspecialchars($oilqty).' bottles of oil<br />';
    echo htmlspecialchars($sparkqty).' spark plugs<br />';
    echo "$tireqty tires<br />";

    // 此文件由4部分组成:1.html,2.php标记,3.php语句,4.空格
  ?>
<?php
  echo <<<theEnd
  This uses the "here document" syntax to output
  multiple lines with $variable interpolation. Note
  that the here document terminator must appear on a
  line with just a semicolon. no extra whitespace!
theEnd;
/**
 * 指定字符串的方法:
 * 1.双引号;2.单引号;3.heredoc语法(<<<)
 * 其中双引号和heredoc语法是插补的，即会计算串中的变量
* 标识符：
* 1.标识符可以是由任意长度的数字、字母、下划线组成;
* 2.标识符不能以数字开头;
* 3.标识符区分大小写，如$tireqty与$TireQty是不同的,但函数名称不区分大小写;
* 4.变量名可以与函数名称相同，但应该尽量避免这种情况，此外不能创建一个与已有函数同名的函数。
* 
  数据类型：
    普通类型
    1.Inter(整数);
    2.Float(浮点数，也叫Double，双精度)，用来表示所有实数;
    3.String(字符串);
    4.Boolean(布尔值);
    5.Array(数组),用来保存具有相同类型的多个数据项;
    6.Object(对象)，用来保存类的实例;
    特殊类型:
    NULL(空):没有被赋值、以及被重置或者被赋值为特殊值NULL的变量就是NULL类型变量
    resource(资源):特殊的内置函数(如数据库函数)将返回resource类型的变量，它们代表外部资源(如数据库连接)，基本上不能直接操作一个resource变量,但是通常它们都将被函数返回,且必须作为参数传递给其他函数;
    callable:通常都是可以传递给其他函数的函数。
 * 
*/

// 标记符号必须顶头写,否则会得到Parse error:  syntax error, unexpected end of file in的错误
?>
</body>

</html>