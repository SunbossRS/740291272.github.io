---
layout: post
title: HTS 小式
cover: 'http://hts.sp.nitech.ac.jp/skin/logo.png'
category: USE
tags: 日志 blog 博文
---

# 使用方法：

编译软件：

```
git clone https://github.com/gtsusyn/EnglishHTSVoice.git
cd EnglishHTSVoice
cd hts_engine_API-1.04 
./configure --prefix=$INSTALLDIR
make
make install
cd ..
cd flite+hts_engine-1.01 
./configure --prefix=$INSTALLDIR --with-hts-engine-header-path=${INSTALLDIR}/include --with-hts-engine-library-path=${INSTALLDIR}/lib
make
make install
```

测试合成：
```
sh runvoice.sh
```
或者：
```
#!/bin/sh

build/bin/flite_hts_engine \
     -td build/hts_voice_cmu_us_arctic_slt-1.03/tree-dur.inf -tf build/hts_voice_cmu_us_arctic_slt-1.03/tree-lf0.inf -tm build/hts_voice_cmu_us_arctic_slt-1.03/tree-mgc.inf \
     -md build/hts_voice_cmu_us_arctic_slt-1.03/dur.pdf         -mf build/hts_voice_cmu_us_arctic_slt-1.03/lf0.pdf       -mm build/hts_voice_cmu_us_arctic_slt-1.03/mgc.pdf \
     -df build/hts_voice_cmu_us_arctic_slt-1.03/lf0.win1        -df build/hts_voice_cmu_us_arctic_slt-1.03/lf0.win2      -df build/hts_voice_cmu_us_arctic_slt-1.03/lf0.win3 \
     -dm build/hts_voice_cmu_us_arctic_slt-1.03/mgc.win1        -dm build/hts_voice_cmu_us_arctic_slt-1.03/mgc.win2      -dm build/hts_voice_cmu_us_arctic_slt-1.03/mgc.win3 \
     -cf build/hts_voice_cmu_us_arctic_slt-1.03/gv-lf0.pdf      -cm build/hts_voice_cmu_us_arctic_slt-1.03/gv-mgc.pdf    -ef build/hts_voice_cmu_us_arctic_slt-1.03/tree-gv-lf0.inf \
     -em build/hts_voice_cmu_us_arctic_slt-1.03/tree-gv-mgc.inf -k  build/hts_voice_cmu_us_arctic_slt-1.03/gv-switch.inf -o  output-us.wav \
     example.txt

build/bin/flite_hts_engine \
     -td build/hts_voice_cstr_uk_female-1.0/tree-dur.inf -tf build/hts_voice_cstr_uk_female-1.0/tree-lf0.inf -tm build/hts_voice_cstr_uk_female-1.0/tree-mgc.inf \
     -md build/hts_voice_cstr_uk_female-1.0/dur.pdf         -mf build/hts_voice_cstr_uk_female-1.0/lf0.pdf       -mm build/hts_voice_cstr_uk_female-1.0/mgc.pdf \
     -df build/hts_voice_cstr_uk_female-1.0/lf0.win1        -df build/hts_voice_cstr_uk_female-1.0/lf0.win2      -df build/hts_voice_cstr_uk_female-1.0/lf0.win3 \
     -dm build/hts_voice_cstr_uk_female-1.0/mgc.win1        -dm build/hts_voice_cstr_uk_female-1.0/mgc.win2      -dm build/hts_voice_cstr_uk_female-1.0/mgc.win3 \
     -cf build/hts_voice_cstr_uk_female-1.0/gv-lf0.pdf      -cm build/hts_voice_cstr_uk_female-1.0/gv-mgc.pdf    -ef build/hts_voice_cstr_uk_female-1.0/tree-gv-lf0.inf \
     -em build/hts_voice_cstr_uk_female-1.0/tree-gv-mgc.inf -k  build/hts_voice_cstr_uk_female-1.0/gv-switch.inf -o  output-uk.wav \
     -s  48000.0\
     -p  240.0\
     -a  0.55\
     -g  0.0\
     -b  0.2\
     -u  0.5\
     -jm 0.8 \
     example.txt


```
### COPYRIGHT

<pre>

/* ----------------------------------------------------------------- */
/*           The HMM-Based Speech Synthesis Engine "hts_engine API"  */
/*           developed by HTS Working Group                          */
/*           http://hts-engine.sourceforge.net/                      */
/* ----------------------------------------------------------------- */
/*                                                                   */
/*  Copyright (c) 2001-2010  Nagoya Institute of Technology          */
/*                           Department of Computer Science          */
/*                                                                   */
/*                2001-2008  Tokyo Institute of Technology           */
/*                           Interdisciplinary Graduate School of    */
/*                           Science and Engineering                 */
/*                                                                   */
/* All rights reserved.                                              */
/*                                                                   */
/* Redistribution and use in source and binary forms, with or        */
/* without modification, are permitted provided that the following   */
/* conditions are met:                                               */
/*                                                                   */
/* - Redistributions of source code must retain the above copyright  */
/*   notice, this list of conditions and the following disclaimer.   */
/* - Redistributions in binary form must reproduce the above         */
/*   copyright notice, this list of conditions and the following     */
/*   disclaimer in the documentation and/or other materials provided */
/*   with the distribution.                                          */
/* - Neither the name of the HTS working group nor the names of its  */
/*   contributors may be used to endorse or promote products derived */
/*   from this software without specific prior written permission.   */
/*                                                                   */
/* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND            */
/* CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,       */
/* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF          */
/* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE          */
/* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS */
/* BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,          */
/* EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED   */
/* TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,     */
/* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON */
/* ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,   */
/* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY    */
/* OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE           */
/* POSSIBILITY OF SUCH DAMAGE.                                       */
/* ----------------------------------------------------------------- */


############################################################################
###                                                                       ##
###                     Carnegie Mellon University                        ##
###                         Copyright (c) 2003                            ##
###                        All Rights Reserved.                           ##
###                                                                       ##
###  Permission to use, copy, modify,  and licence this software and its  ##
###  documentation for any purpose, is hereby granted without fee,        ##
###  subject to the following conditions:                                 ##
###   1. The code must retain the above copyright notice, this list of    ##
###      conditions and the following disclaimer.                         ##
###   2. Any modifications must be clearly marked as such.                ##
###   3. Original authors' names are not deleted.                         ##
###                                                                       ##
###  THE AUTHORS OF THIS WORK DISCLAIM ALL WARRANTIES WITH REGARD TO      ##
###  THIS SOFTWARE, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY   ##
###  AND FITNESS, IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY         ##
###  SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES            ##
###  WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN   ##
###  AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTUOUS ACTION,          ##
###  ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF       ##
###  THIS SOFTWARE.                                                       ##
###                                                                       ##
############################################################################
###                                                                       ##
###  See http://www.festvox.org/cmu_arctic/ for more details              ##
###                                                                       ##
############################################################################

# ----------------------------------------------------------------- #
#           HTS Voice "CMU ARCTIC SLT"                              #
#           released by HTS Working Group                           #
#           http://hts-engine.sourceforge.net/                      #
# ----------------------------------------------------------------- #
#                                                                   #
#  Copyright (c) 2003-2010  Nagoya Institute of Technology          #
#                           Department of Computer Science          #
#                                                                   #
#                2003-2008  Tokyo Institute of Technology           #
#                           Interdisciplinary Graduate School of    #
#                           Science and Engineering                 #
#                                                                   #
# Some rights reserved.                                             #
#                                                                   #
# This work is licensed under the Creative Commons Attribution 3.0  #
# license.                                                          #
#                                                                   #
# You are free:                                                     #
#  * to Share - to copy, distribute and transmit the work           #
#  * to Remix - to adapt the work                                   #
# Under the following conditions:                                   #
#  * Attribution - You must attribute the work in the manner        #
#    specified by the author or licensor (but not in any way that   #
#    suggests that they endorse you or your use of the work).       #
# With the understanding that:                                      #
#  * Waiver - Any of the above conditions can be waived if you get  #
#    permission from the copyright holder.                          #
#  * Public Domain - Where the work or any of its elements is in    #
#    the public domain under applicable law, that status is in no   #
#    way affected by the license.                                   #
#  * Other Rights - In no way are any of the following rights       #
#    affected by the license:                                       #
#     - Your fair dealing or fair use rights, or other applicable   #
#       copyright exceptions and limitations;                       #
#     - The author's moral rights;                                  #
#     - Rights other persons may have either in the work itself or  #
#       in how the work is used, such as publicity or privacy       #
#       rights.                                                     #
#  * Notice - For any reuse or distribution, you must make clear to #
#    others the license terms of this work. The best way to do this #
#    is with a link to this web page.                               #
#                                                                   #
# See http://creativecommons.org/ for details.                      #
# ----------------------------------------------------------------- #

CSTR UK English Female HTS Voice

Copyright (c) 
2012  The University of Edinburgh 

All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

1: Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.  

2: Redistributions
in binary form must reproduce the above copyright notice, this list of
conditions and the following disclaimer in the documentation and/or
other materials provided with the distribution.  

3: Neither the name of the the copyright holders nor the names of its
contributors may be used to endorse or promote products derived from
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


/* ----------------------------------------------------------------- */
/*           The English TTS System "Flite+hts_engine"               */
/*           developed by HTS Working Group                          */
/*           http://hts-engine.sourceforge.net/                      */
/* ----------------------------------------------------------------- */
/*                                                                   */
/*  Copyright (c) 2005-2010  Nagoya Institute of Technology          */
/*                           Department of Computer Science          */
/*                                                                   */
/*                2005-2008  Tokyo Institute of Technology           */
/*                           Interdisciplinary Graduate School of    */
/*                           Science and Engineering                 */
/*                                                                   */
/* All rights reserved.                                              */
/*                                                                   */
/* Redistribution and use in source and binary forms, with or        */
/* without modification, are permitted provided that the following   */
/* conditions are met:                                               */
/*                                                                   */
/* - Redistributions of source code must retain the above copyright  */
/*   notice, this list of conditions and the following disclaimer.   */
/* - Redistributions in binary form must reproduce the above         */
/*   copyright notice, this list of conditions and the following     */
/*   disclaimer in the documentation and/or other materials provided */
/*   with the distribution.                                          */
/* - Neither the name of the HTS working group nor the names of its  */
/*   contributors may be used to endorse or promote products derived */
/*   from this software without specific prior written permission.   */
/*                                                                   */
/* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND            */
/* CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,       */
/* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF          */
/* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE          */
/* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS */
/* BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,          */
/* EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED   */
/* TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,     */
/* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON */
/* ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,   */
/* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY    */
/* OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE           */
/* POSSIBILITY OF SUCH DAMAGE.                                       */
/* ----------------------------------------------------------------- */







</pre>