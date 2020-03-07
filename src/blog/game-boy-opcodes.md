---
title: "Understanding All The Game Boy Opcodes"
author: "Megan Sullivan"
date: "March 5, 2020"
---

Like many people my age, I grew up on Nintendo handheld gaming systems. As I've gotten older and that millennial nostalgia has kicked in, I've been able to revisit some of my childhood-favorite titles, thanks to emulators like VisualBoy Advance. Then, last July, I started wondering how those emulators worked, and I decided I wanted to try building one myself.

Well, it's been eight months, and... I still haven't built an emulator. But I *have* built something else: [an interactive table of all the Game Boy opcodes](https://meganesu.github.io/generate-gb-opcodes).

[Insert screenshot?]

## What is this thing?

"Wow Megan, those are some pretty colorful tables, but what actually is this thing?" Great question! These tables are a way of visualizing all the opcodes for the original Game Boy central processing unit (CPU).

"Okay, but what does that actually mean?" Right, let me back up.

### A Crash Course on CPU Instruction Sets

The game on your Game Boy cartridge is really a bunch of bits - 1's and 0's - stored on a memory card. These bits are the program instructions that tell your Game Boy how the game should work. But your Game Boy's tiny little brain - the CPU - can't read all those bits at once. It has to break the program down into smaller chunks, which it will then read one at a time. On the original Game Boy, each of these chunks is eight bits long (which is why you'll sometimes hear people refer to it as an "8-bit system").

But how does the Game Boy CPU know what to do with those chunks? Well, each unique 8-bit chunk (also called an opcode) can be translated to a particular instruction for the CPU. For example, the opcode `01000001` (or `0x41` in [hexadecimal](https://simple.wikipedia.org/wiki/Hexadecimal)) corresponds to the instruction called `LD B, C`, which loads the contents of register C into register B.

A quick sidebar about instruction names: These names aren't for the Game Boy; they're for the humans trying to write Game Boy games. It's easier for humans to remember what `LD B, C` means than it is to remember what `01000001` stands for. That's why these instruction names are also referred to as **mnemonics**.

In an actual Game Boy, each of the bits from a single instruction actually gets sent to various hardware components, and those components behave differently based on whether each bit was a 1 or a 0. But in an emulator, you don't have the physical Game Boy hardware. You're using a programming language to fake (or emulate) the internals of how the Game Boy works. One way to implement the CPU is to have a lookup table that maps opcodes to functions that execute a particular instruction. In JavaScript, that might look something like this:

```javascript
const lookup = {
  // ... other instructions
  0x41: () => { /* Load contents of register C into register B */ }
  // ... other instructions
}
```

The challenge with this approach is that you (the developer building the emulator) need to be able to write a function to implement each of these instructions. And that's pretty tough to do if you don't actually know what the instructions are! That's where my project comes in.

### How to use the opcode tables

The main purpose of the Game Boy opcode tables is to let you easily switch back and forth between a high-level view of the entire CPU instruction set and a low-level view of what a single instruction does.

You can see what opcode an instruction corresponds to by looking at its position in the table. The table rows represent the first four bits of the opcode, and the columns represent the last four bits. For example, if you want to look up the instruction for opcode `0x82`, you'd go to the intersection of the "8x" row and the "x2" column, where you'll find a table cell with the instruction `ADD A, D`. If you click on the table cell, a sidebar will appear to tell you more details about that instruction and how it works.

## Why did you build this?

You might be wondering how I ended up with this project, instead of the emulator I originally set out to make. Well, back in July, I started out by doing as much research as I could about how Game Boys work. I decided that the best way to get started would be to start by just trying to get the boot sequence to work. (You know, the part where the Nintendo logo moves down the screen and plays that "ba-ding!" sound?)

![Game Boy boot sequence, where the Nintendo logo moves from the top of the screen to the center](https://media.giphy.com/media/f9p9GclvDGqcM/giphy.gif)

After some googling, I found a [wiki article with the contents of the bootstrap ROM](https://gbdev.gg8.se/wiki/articles/Gameboy_Bootstrap_ROM). But I still needed some way to know which 8-bit codes mapped to which instructions. I started out trying to map these translations by hand, but it was slow going, and I wanted to automate the process.

One of the resources that I came across and really liked was the [pastraiser Game Boy opcodes table](https://www.pastraiser.com/cpu/gameboy/gameboy_opcodes.html). I liked how easy it was to visualize the full set of CPU instructions. (I'm all about the big picture!) The one downside for me was that this site assumed you already knew what all the opcodes meant. `LD (HL), C`? `DAA`? `SBC A, L`? None of it meant anything to me. I wanted to build something that was more approachable for newcomers to the world of Game Boy emulators.

One of the first things I tried to sketch out was the CPU, in doing my research for how to build a Game Boy emulator, I found that a lot of existing Game Boy resources - while thorough - are confusing or hard to read.

How It Started:

Trying to build a Game Boy emulator, but had a hard time figuring out what all the instructions did. (Started out trying to make an Excel spreadsheet by hand.) Found bits and pieces in different places, and wanted some way to bring all that information together in one place. Found the pastraiser site, but that didn’t have any description of what the actual instructions meant. Liked the table idea because it was easy to visualize all the instructions at once. Used that site as a jumping-off point. Used React because that’s what I’ve been using at work, and I felt comfortable with it.

## What did you learn along the way?

So Megan, what are the four biggest takeaways that you learned while you were building this project? Well reader, I'm so glad you asked! Here they are:

### 1. Use a mobile-first design process.

I didn't really do much up-front design when I was building the MVP of this. I was eager to dig into the code to generate the instructions, and I wasn't thinking about much beyond the implementation details. I essentially just based my design off of what already existed on the pastraiser site. Next time, I'd like to have a more mobile-first approach. The big grids are okay on a desktop view (and even then, only when the browser window is large), but the layout doesn't really translate to a smaller device.

### 2. The open-source community will help you if you ask.

At one point, I was working on focus management, so that the user's focus would move into the sidebar when they clicked on an instruction in the table. I had gotten the implementation working, but I was having trouble figuring out how to write the tests. I opened a GitHub issue and added the "help wanted" label, mostly as a way to remind myself to follow up on this later. I wasn't really expecting anyone to see it.

But someone did see it! GitHub user [theashraf](https://github.com/theashraf) commented on the issue, saying they wanted to help, and then later [submitted a pull request](https://github.com/meganesu/generate-gb-opcodes/pull/21). This was the first time anyone had ever contributed to one of my projects, and it felt *very* cool! They fixed my immediate problem, which was great, and I also got to learn from their code, so now I'll be able to write better tests in the future.

### 3. Sometimes it's a good idea to follow the tangent.

This isn't the project I originally set out to build. But along the way, I started to feel more comfortable with the large set of CPU instructions. So now, even though I still technically haven’t started the emulator, once I do end up picking up that project I’ll be more prepared to hit the ground running.

### 4. But also, know when to call it good and just ship!

I've been done with the MVP of this project for a while now, but I've been holding off on sending it out into the world because there are still a bunch of other features and improvements I want to add. But I recently finished reading [Just F*cking Ship](https://stackingthebricks.com/just-fucking-ship/) by [Amy Hoy](https://twitter.com/amyhoy), and now I'm thinking it's better to get this site out in front of real live humans than it is to hoard it until it's "done" (because we all know that software projects will truly be done).

## Wrapping It Up

There are a bunch of other features that I still want to add to this site, and I hope to keep making incremental improvements. If you're interested, you can check out the GitHub repository.


---

Goal:
* What is this? How do you use it?
* Why did I build this?
* What did I learn?

Each instruction has:

* A unique **opcode** to identify the instruction.  (e.g., `0x41`)
* A (more or less) human-readable name, also called a **mnemonic**.  (e.g., `LD B, C`)
    * This name isn't for the Game Boy; it's for the humans trying to write Game Boy games. It's easier for humans to remember what `LD B, C` means than it is to remember what `01000001` stands for.
* A **function**. (e.g., "load the contents of register C into register B")

You may have heard that computers "think" in binary - a series of 1's and 0's, each called a "bit". That sequence of bits lives in your computer's memory. When your computer is running a program (or your Game Boy is running a game from a cartridge), it's really processing that long sequence of bits, one chunk at a time.  But how does your computer know what those 1's and 0's mean? Well, your computer doesn't read in that entire sequence of bits all at once. It breaks it down into chunks. For the Game Boy, each chunk is eight bits long (which is why you'll sometimes hear people call it an 8-bit processor).

The CPU is like the brain of your computer (or in this case, your Game Boy). It's able to read the 1's and 0's of a program (for us, the data on a game cartridge) and then translate that binary code into an instruction.

* A Game Boy, like most computers, thinks in binary (1's and 0's).
* The Game Boy's CPU (the brain) reads binary from memory in 8-bit chunks.
* Each unique 8-bit chunk (also called an opcode) can be translated to a particular instruction for the CPU. For example, the opcode `01000001` (or `0x41` in hexadecimal) corresponds to the instruction `LD B, C` (which loads the contents of register C into register B).
    * The names of these instructions (also called mnemonics) aren't for the Game Boy; they're for the humans who have to write programs for the Game Boy. It's easier for humans to remember what `LD B, C` means than it is to remember what `01000001` stands for.
* CPU gets a chunk of code (binary) from memory, but how does it know what to do with it?
* In our emulator, the CPU has to have some mapping between the opcode (the 8-bit binary code) and the instruction that gets executed. Like a big dictionary where the keys are opcodes and the values are functions that execute the instruction for that opcode.

* Like any computer, a Game Boy has a certain set of instructions that it understands.
* Each of these instructions has a unique opcode - the eight-bit combination of 0's and 1's. For example, the opcode `01000001` (or `0x41` in hexadecimal) corresponds to the instruction `LD B, C`, which loads the contents of register C into register B.
* "What's an opcode?" An opcode is an instruction that a CPU understands.
