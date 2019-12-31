

# 数据卷与挂载目录

### 数据卷

**数据卷用来保存对容器的修改/数据，可供容器之间共享和重用，数据卷独立于容器，不会随着容器删除而删除**

#### 常用命令

1. 创建数据卷

```dockerfile
docker volume create mongodata
```

2. 数据卷列表

```dockerfile
docker volume ls
```

3. 查看数据卷具体信息

```dockerfile
docker volume inspect mongodata
```

4. 删除数据卷

```dockerfile
docker volume rm mongodata
```

5. 清除无主的数据卷

```dockerfile
docker volume prune
```

6. 启动一个容器并挂载一个数据卷到容器的/webapp目录（两种方式：）

```dockerfile
docker run -d -P --name nginx -v my-vol:/webapp nginx
docker run -d -P --name nginx --mount source=my-vol,target=/webapp nginx
```

-  如果本地数据卷或者本地目录尚未创建，-v命令则会自动创建,--mount则会报错

- 如果是容器里的目录不存在，两者都会自动创建

- --mount命令解析

  由多个键=值组成，

  有type=bind/volume/tmpfs,（省略该字段则默认为volume）

  可使用source/src=本机目录文件，（省略该字段则为匿名卷）

  target/destination/dst=容器目录, 可指定readonly)
  

**测试一下两个容器通过数据卷来数据共享**

容器一：

```bash
docker run -d -p 82:80 --name nginx-v -v my-vol-test:/webapp nginx
docker exec -it nginx-v bash
cd webapp/
touch test
```

容器二：

```powershell
docker run -d -p 83:80 --name nginx-v1 --mount src=my-vol-test,target=/mywebapp nginx
```

进入nginx-v1容器，到挂载目录下查看是否有test文件

```bash
docker exec -it nginx-v1 bash
cd mywebapp/
ls
```



### 挂载目录

将一个本地绝对路径挂载到tomcat容器的绝对路径

```bash
docker run -d -p 8082:8080 --name tomcat-mount -v /usr/local/kun/aa:/usr/local/tomcat/webapps/aa tomcat
#或
docker run -d -p 8082:8080 --name tomcat-mount --mount type=bind,src=/usr/local/kun/aa,target=/usr/local/tomcat/webapps/aa tomcat
```

将一个本地绝对路径挂载到nginx容器的绝对路径

```bash
docker run --name docker-nginx -d -p 80:80 -v C:/Users/Rectmoon/Desktop/docker-nginx/conf.d:/etc/nginx/conf.d -v C:/Users/Rectmoon/Desktop/docker-nginx/nginx.conf:/etc/nginx/nginx.conf nginx
```



**注意**

- 容器里必须是绝对路径
- 如果想要访问本地/usr/local/kun/aa下的test.html，容器里的目录/usr/local/tomcat/webapps必须加多一层目录 /usr/local/tomcat/webapps/aa



| Options   | Mean                                                         |
| --------- | ------------------------------------------------------------ |
| -i        | 以交互模式运行容器，通常与 -t 同时使用；                     |
| -t        | 为容器重新分配一个伪输入终端，通常与 -i 同时使用；           |
| -d        | 后台运行容器，并返回容器 ID；                                |
| -e        | 传递环境变量                                                 |
| -P        | 随机映射一个 `49000~49900` 的端口到内部容器开放的网络端口    |
| -p(小写)  | 指定要映射的IP和端口，但是在一个指定端口上只可以绑定一个容器。支持的格式有 `hostPort:containerPort`、`ip:hostPort:containerPort`、 `ip::containerPort` |
| --network | bridge（指定dns、网关）、 host(无需映射端口)、none、container(共享容器模式) |
| --rm      | 容器退出时就能够自动清理容器内部的文件系统                   |
|           |                                                              |

### mysql实例

```bash
docker pull mysql:5.7
docker run --name mysql -d -p 7726:3306 mysql:5.7
docker cp mysql:/etc/mysql/mysql.conf.d/mysqld.cnf D:/workspace/data/mysql/conf
#设置字符集 character-set-server=utf8
docker rm -f mysql
docker run --name mysql -d -p 7726:3306 -v D:/workspace/data/mysql/conf:/etc/mysql/mysql.config.d/ -e MYSQL_ROOT_PASSWORD=1234 mysql:5.7
```



# 指令

### FROM

指定基础镜像

### LABEL

将元数据添加到镜像

```dockerfile
LABEL <key>=<value> <key>=<value> <key>=<value> ...
```

### WORKDIR

指定在创建容器后，终端默认登录进来的工作目录

### ENV：

用来在构建镜像过程中设置环境变量

### ADD

将宿主机目录下的文件拷贝进镜像，ADD命令会自动处理URL和解压tar压缩包, 有两种写法：ADD src dest` 或者 `ADD  ["src", "dest"]

### COPY

拷贝文件、目录到镜像中。具体是将从构建上下文目录中<src原路径>的文件或目录复制到新一层镜像的<目标路径>位置 ，有两种写法：`COPY src dest` 或者 `COPY ["src", "dest"]`

### VOLUME

容器数据卷，用于数据保存和持久化工作

### RUN

容器构建时需要运行的命令

### CMD

支持三种格式

  CMD ["executable","param1","param2"] 使用 exec 执行，推荐方式；

  CMD command param1 param2 在 /bin/sh 中执行，提供给需要交互的应用；

  CMD ["param1","param2"] 提供给 ENTRYPOINT 的默认参数；

指定启动容器时执行的命令，每个 Dockerfile 只能有一条 CMD 命令。如果指定了多条命令，只有最后一条会被执行。

如果用户启动容器时候指定了运行的命令，则会覆盖掉 CMD 指定的命令。

### ENTRYPOINT

两种格式：

  ENTRYPOINT ["executable", "param1", "param2"]

  ENTRYPOINT command param1 param2（shell中执行）。

配置容器启动后执行的命令，并且不可被 docker run 提供的参数覆盖。

每个 Dockerfile 中只能有一个 ENTRYPOINT，当指定多个时，只有最后一个起效

**差异：**

1. CMD指令指定的容器启动时命令可以被docker run指定的命令覆盖；而ENTRYPOINT指令指定的命令不能被覆盖，而是将docker run指定的参数当做ENTRYPOINT指定命令的参数。
2. CMD指令可以为ENTRYPOINT指令设置默认参数，而且可以被docker run指定的参数覆盖；

**如果Dockerfile指定基础镜像中是ENTRYPOINT指定的启动命令，则以基础镜像为基础的Dockerfile中的CMD依然是为基础镜像中的ENTRYPOINT设置默认参数。**

### ONBUILD

当构建一个被继承的DockerFile时运行命令， 父镜像在被子镜像继承后，父镜像的ONBUILD被触发。