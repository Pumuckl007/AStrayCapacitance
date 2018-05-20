---
layout: post.html
author: Maximilian Apodaca
title: 8-Bit Simulator
description: Placeholder text
publishDate: 2018-05-20
---

Soon after working with [Ben Eater's 8-Bit Computer](https://eater.net) I ran into a limitation of writing the code on paper and then inputting it to the Computer. Coming from programming in Java and JavaScript I am accustomed to using a debugger and wanted that feature on the eater computer. As a result I decided to write a [simulator for the computer](https://pumuckl007.github.io/8BitCompiler/).

Compiler
---
The simulator consists of two parts, a compiler and a virtual computer. The compiler is responsible from taking a rudimentary form of assembly and turning it into machine code which the computer can execute. Below is an example of assembly and compiled machine code.

<div class="two-column">
<div class="column">
```assembly
LDI 12
STA 200
LDI 8
ADD 200
OUT
HLT
```
</div>
<div class="column">
```machine
05 0C
04 C8
05 08
02 C8
0E 00
0F 00
```
</div>
</div>
<span></span>

<iframe style="height: 40em;" src="https://pumuckl007.github.io/8BitCompiler/"></iframe>
