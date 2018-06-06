---
layout: post.html
author: Maximilian Apodaca
title: 8-Bit Simulator
description: Creating a simulator for Ben Eater's Computer.
publishDate: 2018-05-25
---

I recently built a [Ben Eater 8-Bit Computer](https://eater.net) and it is a whole lot of fun to program, I extended the ram which added more functionality but made it teadious to program up to 50 bytes by hand for each program. In addition, I wanted a debugger for the computer. So I set forth to write a [simulator for the computer](https://pumuckl007.github.io/8BitCompiler/).

Compiler
---
The simulator consists of two parts, a compiler and a virtual computer. The compiler is responsible for taking a rudimentary form of assembly and turning it into machine code. The virtual computer can then execute the machine code which is the same for the physical and virtual computers. Below is an example of assembly and compiled machine code.

<div class="two-column">
<div class="column">
```assembly
a:
LDI 12
STA 200
LDI 8
ADD 200
OUT
JMP a
```
</div>
<div class="column">
```machine

05 0C
04 C8
05 08
02 C8
0E 00
07 00
```
</div>
</div>
<span></span>

The compiler works by first going through and finding any labels. These are stored with their name and the line to which they correspond. After that each instruction gets translated into the corresponding machine code and the data is copied from the source. In addition, any references to labels are set to their corresponding line number. This yields the machine code that can be run on the computer.


With this data the computer can now be programmed, which you
 could do by hand or by uploading it with a programmer. This programmer is illustrated in the video below. However the code can also be run on a simulator.

Simulator
---

The simulator is set up to mimic the computer as closely as possible. As a result each component of the computer is mimicked in code and they are connected together by a control word and bus as they are in the computer. As a result the simulator is functionally identical to the computer.

The simulator has each instruction coded as multiple micro instructions. Each of these misconstructions is responsible for acting as the bus between the two registered that are needed. The example below is the add instruction which adds the value of a given address to the A-register.

```JavaScript
step(microInstruction, computer){
    if(microInstruction == 2){
      let bus = computer.memory.getValue();
      computer.dataRegister.setValue(bus);
    } else if(microInstruction == 3){
      let bus = computer.dataRegister.getValue();
      computer.mAR.setValue(bus);
    } else if(microInstruction == 4){
      let bus = computer.memory.getValue();
      computer.bRegister.setValue(bus);
    } else if(microInstruction == 5){
      let bus = computer.sumRegister.getValue(false);
      computer.aRegister.setValue(bus);
    }
}
```

Each individual register stores a value which can be access or modified with a geter seter. Making connections between registers is as easy as passing them into the constructor of another register.

```JavaScript
constructor(width, aRegister, bRegister){
  this.width = width;
  this.mask = Math.pow(2, this.width)-1;
  this.aRegister = aRegister;
  this.bRegister = bRegister;
}

getValue(subtraction){
  if(subtraction){
    let result = this.aRegister.getValue() - this.bRegister.getValue();
    return result & this.mask;
  } else {
    let result = this.aRegister.getValue() + this.bRegister.getValue();
    return result & this.mask;
  }
}
```

The mask is used to keep the value the register returns within the width which is 8 in this case.

Programming the Simulator
---

The simulator can be programmed in assembly for which the instructions are listed below. In addition to writing code you can write comments prefaced with ```*``` as well as create labels with the ```name:``` syntax. Labels can be used in place of any immediate and refer to the following instruction.

After you have written code hit the Build "🔨" button to compile and upload it to the simulator or the Debug "🐞" button to run it in debugger mode. The debugger will stop when the labeled instructions are executed. You can set the clock rate, keep in mind that it takes six clock pulses to execute an instruction.

The structure of memory has been change from Eater's original. The computer now has access to 8 bit immediate making all the instructions 12 bits long. This has the effect of splitting the 8-bit ram in two. The lower half (addresses 0x00 to 0xFF) stores the instruction immediate while the upper half (address 0x100 to 0x1FF) store the opcode itself.

|Mnemonic| Name | Opcode (binary) | Assembly Format | Action |
|--------|------|-----------------|-----------------|--------|
| NOP | No Operation | 0000 | NOP  | The cpu will sit idle for one instruction. |
| LDA | Load A | 0001 | LDA  imm | Loads a value into the A register. The memory address to load from is specified by **imm**. |
| ADD | Add | 0010 | ADD  imm | Adds value in memory to the A register. The memory address is specified by **imm**. |
| SUB | Subtract | 0011 | SUB  imm | Subtracts the value in memory from the A register. The memory address is specified by **imm**. |
| STA | Store A | 0100 | STA  imm | Stores the value of A into memory. The memory address is specified with the immediate. |
| LDI | Load Immediate | 0101 | LDI  imm | Loads **imm** into the A register. |
| JMP | Jump | 0111 | JMP  imm | Unconditionally jumps to memory address. The memory address is specified by **imm**. |
| JEZ | Jump Equal to Zero | 1000 | JEZ  imm | Jumps to specified memory address if the value of the A register equals zero. The jump location is specified by **imm**. |
| JGZ | Jump Greater than Zero | 1001 | JGZ  imm | Jumps to specified memory address if the signed value of the A register is greater than zero. The jump location is specified by **imm**. |
| OUT | Output | 1110 | OUT | Outputs the contents of the A register displaying it on the 7-segment output. |
| HLT | Halt | 1111 | HLT | Halts execution. |


The Simulator
---
<iframe style="height: 40em;" src="https://pumuckl007.github.io/8BitCompiler/"></iframe>
