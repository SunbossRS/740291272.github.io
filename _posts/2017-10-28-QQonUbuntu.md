---
layout: post
title: UBUNTU17.10安装2017版QQ
category: Program
cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509273885452&di=2158a89062b955ab0dcfe21ea8df86ac&imgtype=0&src=http%3A%2F%2Fwww.logo11.cn%2Fuploads%2Fallimg%2F160501%2F1_160501115104_1.png'
tags: pc 电脑 软件 
---
# UBUNTU17.10安装2017版QQ

1,下载winehq

**如果你是64位系统，先安装32位指令集（如果还没有安装过):*
```shell
sudo dpkg --add-architecture i386 
```
添加一个软件仓库:
```shell
wget -nc https://dl.winehq.org/wine-builds/Release.key
sudo apt-key add Release.key
sudo apt-add-repository https://dl.winehq.org/wine-builds/ubuntu/
```

更新软件表，下载winehq:
```shell
sudo apt-get update
sudo apt-get install winehq-devel

```
2.下载wineQQ <br>
下载压缩吧，解压即可使用<br> 
百度云链接: https://pan.baidu.com/s/1i4XwtgD 密码: e8k8
<br>
下载完成之后，进入到下载目录，打开命令行终端，将其解压到我们的用户主目录（解压出来的是3个隐藏目录和说明文件）：
```shell
tar xvf wineQQ8.9_19990.tar.xz -C ~/
```

