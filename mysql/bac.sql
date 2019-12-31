SELECT * FROM class;
SELECT * FROM teacher;
SELECT 100;
SELECT 'michael';
SELECT 100 * 100;
SELECT 100 * 51 AS 结果;
SELECT t_id AS 编号, t_name AS 姓名 FROM teacher;
SELECT t_id 编号1, t_name 姓名1 FROM teacher;
SELECT t_id '编号 11', t_name '姓名 11' FROM teacher;
SELECT t_name 姓名 FROM teacher;
SELECT DISTINCT 
  t_name 
FROM
  teacher ;

SELECT 
  t_id + t_name AS 编号姓名 
FROM
  teacher ;

SELECT 
  80 + '50' ;

SELECT '张飞' + 2;

SELECT 100 + '60';

SELECT '张三' + 10

SELECT 50 + NULL;

SELECT CONCAT('a','b','c') AS 结果;

SELECT 
  CONCAT(t_id, t_name) AS 编号姓名 
FROM
  teacher ;

DESC teacher;
