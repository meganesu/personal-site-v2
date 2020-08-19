---
title: "Meet the Game Boy Instruction Set"
author: "Megan Sullivan"
date: "2020-03-07"
---

Like many people my age, I grew up on Nintendo handheld gaming systems. As I've gotten older and that millennial nostalgia has kicked in, I've been able to revisit some of my childhood-favorite titles, thanks to emulators like VisualBoy Advance. Then, last July, I started wondering how those emulators worked, and I decided I wanted to try building one myself.

Well, it's been eight months, and... I still haven't built an emulator. But I *have* built something else: [an interactive table of all the Game Boy opcodes](https://meganesu.github.io/generate-gb-opcodes).

## What is this thing?

"Wow Megan, those are some pretty colorful tables, but what actually is this thing?" Great question! These tables are a way of visualizing all the opcodes for the original Game Boy central processing unit (CPU).

"Okay, but what does that actually mean?" Right, let me back up.

### A Crash Course on CPU Instruction Sets

The game on your Game Boy cartridge is really a bunch of bits - 1s and 0s - stored on a memory card. These bits are the program instructions that tell your Game Boy how the game should work. But your Game Boy's tiny little brain - the CPU - can't read all those bits at once. It has to break the program down into smaller chunks, which it will then read one at a time. On the original Game Boy, each of these chunks is eight bits long (which is why you'll sometimes hear people refer to it as an "8-bit system").

But how does the Game Boy CPU know what to do with those chunks? Well, each unique 8-bit chunk (also called an opcode) can be translated to a particular instruction for the CPU. For example, the opcode `01000001` (or `0x41` in [hexadecimal](https://simple.wikipedia.org/wiki/Hexadecimal)) corresponds to the instruction called `LD B, C`, which tells the CPU to load the contents of register C into register B. 

If that sounded like a bunch of nonsense, don't worry. The main takeaway is that each unique 8-bit value has a corresponding CPU instruction. Although while I have you here, a quick sidebar about instruction names: These names like `LD B, C` aren't for the Game Boy; they're for the humans trying to write Game Boy games. It's easier for humans to remember what `LD B, C` means than it is to remember what `01000001` stands for. That's why these instruction names are also referred to as **mnemonics**.

So now you know what the CPU is *supposed* to do, but how does it actually *do* it? In an actual Game Boy, each of the bits from a single instruction gets sent to various hardware components, and those components behave differently based on whether each bit was a 1 or a 0. But in an emulator, you don't have the physical Game Boy hardware. You're using a programming language to fake (or emulate) the internals of how the Game Boy works. One way to implement the CPU is to have a lookup table that maps opcodes to functions that execute a particular instruction. In JavaScript, that might look something like this:

```javascript
const lookup = {
  // ... other instructions
  0x41: () => { /* Load contents of register C into register B */ }
  // ... other instructions
}
```

The challenge with this approach is that you (the developer building the emulator) need to be able to write a function to implement each of these instructions. And that's pretty tough to do if you don't actually know what the instructions are! That's where my project comes in.

### How to Use the Opcode Tables

The main purpose of the Game Boy opcode tables is to let you easily switch back and forth between a high-level view of the entire CPU instruction set (i.e., the whole table) and a low-level view of what a single instruction does (i.e., an individual table cell).

You can see what opcode a particular instruction corresponds to by looking at its position in the table. The table rows represent the first four bits of the opcode, and the columns represent the last four bits. So if you want to look up the instruction for opcode `0x82`, you'd go to the intersection of the "8x" row and the "x2" column, where you'll find a table cell with the instruction `ADD A, D`. If you click on the table cell, a sidebar will appear to tell you more details about that instruction and how it works.

## Why did you build this?

Back in July, when I started trying to build an emulator, I was doing a lot of research. As I was looking into the specifics of the Game Boy CPU, I came across two great resources:

* The [pastraiser Game Boy opcodes table](https://www.pastraiser.com/cpu/gameboy/gameboy_opcodes.html).
* An archived version of the [Nintendo Game Boy Programming Manual](https://archive.org/details/GameBoyProgManVer1.1/mode/2up).

I loved the pastraiser site because of how easy it was to visualize the full set of CPU instructions. (I'm all about the big picture!) But I struggled to make use of the tables, because it wasn't clear from just the mnemonic what each instructions was actually supposed to do. Luckily, the Nintendo Game Boy Programming Manual had pretty detailed documentation on the CPU instruction set. I saw an opportunity to combine these two resources into something that would be more useful to newcomers to Game Boy emulation. And thus, a new and improved version of the opcode tables was born!

## What did you learn along the way?

This is the first time I've ever actually finished a side project, so I'd say the most important thing I learned was how to stick with a long-term goal. I've got lots of thoughts on that subject, which I'm saving for a future blog post. In the meantime, here are some of my other takeaways from this project:

### 1. Use a mobile-first design process.

I didn't really do much up-front design when I started building this. I was eager to dig into the code to generate the instructions, and I wasn't thinking about much beyond the implementation details. I essentially just based my design off of what already existed on the pastraiser site. Next time, I'd like to have a more mobile-first approach. The big grids are okay on a desktop view (and even then, only when the browser window is large), but the layout doesn't really translate to a smaller device.

### 2. The open-source community will help you if you ask.

At one point, I was working on focus management, so that the user's focus would move into the sidebar when they clicked on an instruction in the table. I had gotten the implementation working, but I was having trouble figuring out how to write the tests. I opened a GitHub issue and added the "help wanted" label, mostly as a way to remind myself to follow up on this later. I wasn't really expecting anyone to see it.

But someone did see it! GitHub user [theashraf](https://github.com/theashraf) commented on the issue, saying they wanted to help, and then later [submitted a pull request](https://github.com/meganesu/generate-gb-opcodes/pull/21). This was the first time anyone had ever contributed to one of my projects, and it felt *very* cool! They fixed my immediate problem, which was great, and I also got to learn from their code, so now I'll be able to write better tests in the future.

### 3. Sometimes it's a good idea to follow the tangent.

This isn't the project I originally set out to build. But along the way, I started to feel more comfortable with the large set of CPU instructions. So now, even though I still technically haven’t started building an emulator, once I do end up picking up that project I’ll be more prepared to hit the ground running.

### 4. But also, know when to call it good and just ship!

I've been done with the MVP of this project for a while now, but I've been holding off on sending it out into the world because there are still a bunch of other features and improvements I want to add. But I recently finished reading [Just F*cking Ship](https://stackingthebricks.com/just-fucking-ship/) by [Amy Hoy](https://twitter.com/amyhoy), and now I'm thinking it's better to get this site out in front of real live humans than it is to hoard it until it's "done" (because we all know that software projects will never truly be done).

## Now what?

There's still more work to do on this project, but I'm excited to get this minimum viable product in front of you. If you're interested in what updates I have planned for the future, you can check out the [GitHub issues page for this project](https://github.com/meganesu/generate-gb-opcodes/issues). And feel free to reach out to me on Twitter to let me know what you think of what I've built so far!

Trying to build your own Game Boy emulator, but not sure where to start? I started a [Twitter thread with some of the resources I've found helpful](https://twitter.com/meganesulli/status/1146306829418262528?s=20). Let me know if you find other good ones! Hopefully you'll be able to add my project to your own list of helpful resources 😉
