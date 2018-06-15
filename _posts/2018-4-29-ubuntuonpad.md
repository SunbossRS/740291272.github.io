---
layout: post
title: Winodws平板电脑安装Ubuntu
category: USE
cover:  'http://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=ubuntu&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&cs=3058318617,884800824&os=612160492,391095497&simid=3470897156,535123453&pn=4&rn=1&di=29575677120&ln=1971&fr=&fmq=1524961396288_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=http%3A%2F%2Fbizhi.zhuoku.com%2F2010%2F05%2F11%2FUbuntu%2F1920x1200.png&rpstart=0&rpnum=0&adpicid=0'
tags: 日志 blog 博文
---

准备一个8G的U盘，写入系统镜像

[Ubuntu16.04下载]()

手动引导GRUB2进入本地Ubuntu操作系统
  安装完毕重启我们将发现无法进入到操作系统，而是进入了EFI SHELL模式，早在意料之中，因为这类平板的CPU不支持64位的UEFI引导，但并不意味着不支持64位操作系统。

  此时我们还是进入BIOS使用之前的U盘引导启动，进入GRUB菜单后不要选择，点击键盘中的"c"按钮，进入GRUB2命令行模式。

  进入该模式后，输入“ls”列出硬盘分区。

  此时会看到类似(hd0,gtp1)或(hd1,msdos1)之类的项。这是你的硬盘分区。其中hd0为根目录所在的磁盘，IDE硬盘用hd开始，SCSI硬盘用sd开头。软盘用fd开头。命名和linux不大一样。是从0算起。

  我们需要找出linux内核所在分区。

  使用"`ls (hdX,gtpX)/boot`"，其中的“X”请手动替换为上一步出现过的数字，这里肯定要有逗号","的，如果出现一大串结果，显示了你的linux内核文件，说明就是这个分区。记录X的值。

  假设你在执行"`ls (hd0,gtp2)/boot`"的时候出现值，那么下一步执行：`set root=(hd0,gtp2)`然后输入需要输入内核路径，“`linux /boot/vmlinuz root=/dev/mmcblk0p2`”其中号为内核版本，输入`/boot/vmlinuz`后按tab键可以进行自动补全。mmcblk0p2为根目录所在的分区,其中“mmcblk0”是第二步查看分区记录的值，后面的"p2"是我猜的，你顺着p1\p2\p3猜测一下，能执行就对了。完整的命令例子如下：
```bash
linux (hd0,gpt2)/boot/vmlinuz-3.13-xxxx root=/dev/mmcblk0p5
initrd /initrd.img
boot
```
  最后成功进入本地Ubuntu系统，这一步如果不成功的话就多尝试一下，修改上面涉及的各个值，祝你好运。

最后一步
  到这步已经成功了一半了，但是没人愿意每次启动都使用USB的GRUB引导并手动输入引导命令，这会很麻烦。进入本地Ubuntu后，调出终端，继续输入如下命令：
```bash
sudo apt-get update
sudo apt-get -y purge grub-efi-amd64 grub-efi-amd64-bin grub-efi-amd64-signed
sudo apt-get -y install grub-efi-ia32-bin grub-efi-ia32 grub-common grub2-common
sudo grub-install --target=i386-efi /dev/mmcblk0p2 --efi-directory=/boot/efi/ --boot-directory=/boot/ # 这里的“mmcblk0p2 ”就是上一步你执行成功的那个值
sudo grub-mkconfig -o /boot/grub/grub.cfg
```