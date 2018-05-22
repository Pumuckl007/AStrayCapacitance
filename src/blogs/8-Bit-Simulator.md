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

The compiler works by first going through and finding any labels. These are stored with their name and the line to which they correspond. After that each instruction gets translated into the corresponding machine code and the data is set. In addition, any references to labels are set to the corresponding line number. This yields the machine code that can be run on the computer.


With this data the computer can now be programmed, which you
 could do by hand or by uploading it with a programmer. This programmer is illustrated in the video below. However the code can also be run on a simulator.

Simulator
---

The simulator is set up to mimic the computer as closely as possible. As a result each component of the computer is mimicked in code and they are connected together by a control word and bus as they are in the computer. As a result the simulator is functionally identical to the computer.
<iframe style="height: 40em;" src="https://pumuckl007.github.io/8BitCompiler/"></iframe>
