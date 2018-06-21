---
layout: post
title: php上传文件并将信息写入数据库
category: H&M
tags: 日志 blog 博文 
keywords: 日志, blog, 博文
---

首先建立一个数据库，并建立数据表
```php

<?php
/**
 * Created by PhpStorm.
 * User: ghostgloomy
 * Date: 2018/6/20
 * Time: 下午4:35
 */

$servername = "localhost";
$username = "username";
$password = "password";

// 创建连接
$conn = new mysqli($servername, $username, $password);
// 检测连接
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 创建数据库
$sql = "CREATE DATABASE myDB";
if ($conn->query($sql) === TRUE) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . $conn->error;
}

//创建数据表

$sql = "CREATE TABLE MyGuests (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY(id), 
name VARCHAR(100) NOT NULL,
type VARCHAR(100) NOT NULL,
size VARCHAR(100) NOT NULL,
)";

if ($conn->query($sql) === TRUE) {
    echo "Table MyGuests created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}


$conn->close();

?>

```

然后建立文件上传表单

```html

<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<form action="upload_file.php" method="post" enctype="multipart/form-data">
    <label for="file">文件名：</label>
    <input type="file" name="file" id="file"><br>
    <input type="submit" name="submit" value="提交">
</form>

</body>
</html>
```

最后建立一个上传&&写入数据库的东西
```php
<title>结果</title>
<?php

/**
 * Created by PhpStorm.
 * User: ghostgloomy
 * Date: 2018/6/20
 * Time: 下午4:35
 */


//链接数据库
$servername = "localhost";
$username = "mydb";
$password = "123456";
$dbname = "mydb";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 上传图片
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);     // 获取文件后缀名
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 204800)   // 小于 200 kb
&& in_array($extension, $allowedExts))
{
	if ($_FILES["file"]["error"] > 0)
	{
		echo "错误：: " . $_FILES["file"]["error"] . "<br>";
	}
	else
	{
		echo "上传文件名: " . $_FILES["file"]["name"] . "<br>";
		echo "文件类型: " . $_FILES["file"]["type"] . "<br>";
		echo "文件大小: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
		echo "文件临时存储的位置: " . $_FILES["file"]["tmp_name"] . "<br>";

		//赋值
        $n=$_FILES["file"]["name"];
        $t=$_FILES["file"]["type"];
        $s=$_FILES["file"]["size"];

		//写入数据库

		$sql = "INSERT INTO MyGuests (name, type, size) VALUES ('$n', '$t', '$s')";

        if ($conn->query($sql) === TRUE)
        {
           echo "记录完成";
        }
        else
            {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

            $conn->close();

		if (file_exists("upload/" . $_FILES["file"]["name"]))
		{
			echo $_FILES["file"]["name"] . " 文件已经存在。 ";
		}
		else
		{
			move_uploaded_file($_FILES["file"]["tmp_name"], "upload/" . $_FILES["file"]["name"]);
			echo "文件存储在: " . "upload/" . $_FILES["file"]["name"];
		}
	}
}
else
{
	echo "非法的文件格式或文件过大<br>大小：" , $_FILES["file"]["size"] / 1024  , "Kb<br>" , "最大上传大小200Kb";
}

?>
```
