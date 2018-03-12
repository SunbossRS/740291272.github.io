---
layout: post
title: 在树莓派上编译运行wine
category: USE
cover:  'https://dl.winehq.org/share/images/winehq_logo_glass.png'
tags: 日志 blog 博文
---

Wine （“Wine Is Not an Emulator” 的递归缩写）是一个能够在多种 POSIX-compliant 操作系统（诸如 Linux，Mac OSX 及 BSD 等）上运行 Windows 应用的兼容层。另外英语单词wine是葡萄酒的意思。

<!-- more -->


# git下载源码
```
    mkdir -p ~/qemu/qemu-git_2013-03-23_v1.4.0+ntpl+static/qemu
    cd ~/qemu/qemu-git_2013-03-23_v1.4.0+ntpl+static/qemu
    git clone git://git.qemu.org/qemu.git
    git reset --hard v1.4.0

```

# 打补丁
```
    # 调整后的版本 http://patchwork.ozlabs.org/patch/45206/
    patch -p1 < ../0001-add-usermode-NPTL-support-for-i386_qemu-v1.4.0.patch

    patch -p1 < ../0002-disable-epoll-syscalls_qemu-v1.4.0.patch
```


# 编译 qemu
```
    ./configure --target-list=i386-linux-user --static
    make
```


# 创造X86环境
```
    # 以下命令请用Root账户运行或者使用sudo
        mount -t binfmt_misc none /proc/sys/fs/binfmt_misc
        echo -1 > /proc/sys/fs/binfmt_misc/status
        echo ':i386:M::\x7fELF\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\x03:\xff\xff\xff\xff\xff\xfe\xfe\xff\xff\xff\xff\xff\xff\xff\xff\xff\xfb\xff\xff:/usr/bin/qemu-i386-static:' > /proc/sys/fs/binfmt_misc/register
```


# 准备 chroot 环境
```
    # 以下命令请用Root账户运行或者使用sudo
        debootstrap --arch=i386 --foreign wheezy chroot-wheezy-i386 http://ftp.de.debian.org/debian
    # 以下命令请用普通账户运行
        cp ~/qemu/qemu-git_2013-03-23_v1.4.0+ntpl+static/qemu/i386-linux-user/qemu-i386 ~/chroot-wheezy-i386/usr/bin/qemu-i386-static
        id 
    # 以下命令请用Root账户运行或者使用sudo
        DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true LC_ALL=C LANGUAGE=C LANG=C chroot chroot-wheezy-i386 /debootstrap/debootstrap --second-stage
        echo "deb http://ftp.de.debian.org/debian/ wheezy main" > chroot-wheezy-i386/etc/apt/sources.list.d/wheezy.list
        env -i TERM=xterm /usr/sbin/chroot chroot-wheezy-i386 /bin/su -l root
            apt-get update
            apt-get install libsm6 libxext6 libfreetype6 libpng12-0 libmpg123-0
            adduser --uid 1002 user2
            exit
        mount --bind /home/user2 /home/user2/chroot-wheezy-i386/home/user2
        mount --bind /dev /home/user2/chroot-wheezy-i386/dev
        mount --bind /proc /home/user2/chroot-wheezy-i386/proc
        exit
```


# 安装wine
```
    mkdir wine
    cd wine
    wget http://www.playonlinux.com/wine/binaries/linux-x86/PlayOnLinux-wine-1.5.26-linux-x86.pol
    tar -jxf PlayOnLinux-wine-1.5.26-linux-x86.pol --strip-components=1 wineversion/1.5.26
    mv ~/wine/1.5.26/bin/wine-preloader ~/wine/1.5.26/bin/wine-preloader.renamed
```


# 进入chroot
```
    # 以下命令请用Root账户运行或者使用sudo
    env -i TERM=xterm /usr/sbin/chroot chroot-wheezy-i386 /bin/su -l user2
        # as user2 in chroot
        export WINEPREFIX=~/wineprefix
        export PATH=~/wine/1.5.26/bin:$PATH
        export DISPLAY=localhost:10.0           # this test was done by ssh, locally export DISPLAY=:0 should be right
        winecfg

```

# 测试下
```
        # 在chroot环境下运行
        mkdir ~/notepadpp
        cd ~/notepadpp
        wget http://download.tuxfamily.org/notepadplus/6.3.1/npp.6.3.1.bin.zip
        unzip npp.6.3.1.bin.zip
        cd unicode
        wine notepad++.exe
```


# DeBug

其中0001-add-usermode-NPTL-support-for-i386_qemu-v1.4.0.patch的内容为：



```
diff --git a/configure b/configure
index 8789324..5c48942 100755                                                                                                                               
--- a/configure                                                                                                                                             
+++ b/configure                                                                                                                                             
@@ -3891,6 +3891,7 @@ TARGET_ABI_DIR=""                                                                                                                     
                                                                                                                                                            
 case "$target_arch2" in                                                                                                                                    
   i386)                                                                                                                                                    
+    target_nptl="yes"                                                                                                                                      
   ;;                                                                                                                                                       
   x86_64)                                                                                                                                                  
     TARGET_BASE_ARCH=i386                                                                                                                                  
diff --git a/linux-user/syscall.c b/linux-user/syscall.c                                                                                                    
index 9e31ea7..86ecfbc 100644                                                                                                                               
--- a/linux-user/syscall.c                                                                                                                                  
+++ b/linux-user/syscall.c                                                                                                                                  
@@ -4253,6 +4253,13 @@ static abi_long do_get_thread_area(CPUX86State *env, abi_ulong ptr)                                                                  
     unlock_user_struct(target_ldt_info, ptr, 1);                                                                                                           
     return 0;                                                                                                                                              
 }                                                                                                                                                          
+
+static inline void cpu_set_tls(CPUX86State *env, target_ulong newtls)
+{
+    do_set_thread_area(env, newtls);
+    /* reload gs */
+    cpu_x86_load_seg(env, R_GS, env->segs[R_GS].selector);
+}
 #endif /* TARGET_I386 && TARGET_ABI32 */
 
 #ifndef TARGET_ABI32
@@ -4378,7 +4385,16 @@ static int do_fork(CPUArchState *env, unsigned int flags, abi_ulong newsp,
         init_task_state(ts);
         /* we create a new CPU instance. */
         new_env = cpu_copy(env);
-#if defined(TARGET_I386) || defined(TARGET_SPARC) || defined(TARGET_PPC)
+#if defined(TARGET_I386)
+        new_env->idt.base = target_mmap(0, sizeof(uint64_t) * (env->idt.limit + 1),
+                PROT_READ|PROT_WRITE,
+                MAP_ANONYMOUS|MAP_PRIVATE, -1, 0);
+        memcpy(g2h(new_env->idt.base), g2h(env->idt.base), sizeof(uint64_t) * (env->idt.limit + 1));
+        new_env->gdt.base = target_mmap(0, sizeof(uint64_t) * TARGET_GDT_ENTRIES,
+                PROT_READ|PROT_WRITE,
+                MAP_ANONYMOUS|MAP_PRIVATE, -1, 0);
+        memcpy(g2h(new_env->gdt.base), g2h(env->gdt.base), sizeof(uint64_t) * TARGET_GDT_ENTRIES);
+#elif defined(TARGET_SPARC) || defined(TARGET_PPC)
         cpu_reset(ENV_GET_CPU(new_env));
 #endif
         /* Init regs that differ from the parent.  */

```



0002-disable-epoll-syscalls_qemu-v1.4.0.patch



```

diff --git a/linux-user/syscall.c b/linux-user/syscall.c
index 9e31ea7..dc80c0a 100644
--- a/linux-user/syscall.c
+++ b/linux-user/syscall.c
@@ -8771,7 +8771,7 @@ abi_long do_syscall(void *cpu_env, int num, abi_long arg1,
         break;
 #endif
 #endif
-#if defined(CONFIG_EPOLL)
+#if 0 //defined(CONFIG_EPOLL)
 #if defined(TARGET_NR_epoll_create)
     case TARGET_NR_epoll_create:
         ret = get_errno(epoll_create(arg1));
```



安装的软件
-----------------
- Kernel 4.1.8 with 3G/1G user/kernel memory split: https://forum.winehq.org/viewtopic.php?t=1905
- QEMU 1.4.0 with NPTL patch: https://github.com/AlbrechtL/qemu
- Wine 1.5.26: http://www.playonlinux.com/wine/binaries/linux-x86/PlayOnLinux-wine-1.5.26-linux-x86.pol
- Installed Debian Wheezy i386 repository in a chroot enviroment "/home/pi/chroot-wheezy-i386".
- Binfmt: To wrap the call to QEMU

运行速度
-----
慢到死


相关链接
-----------------
- https://www.raspberrypi.org/forums/viewtopic.php?f=41&t=12727
- https://forum.winehq.org/viewtopic.php?f=8&t=17701&sid=c5501c4a5fb33680caf6a37b47cf62ed
- http://www.forum-raspberrypi.de/Thread-raspbian-windowsprogramme-ausfuehren-mit-qemu-und-wine (德国网站，需要采取措施)
- http://wiki.winehq.org/ARM
