---
title: "Managing Focus with React and Jest"
author: "Megan Sullivan"
date: "2020-08-19"
---

## Introduction

* What is focus management? Why does it matter?
    * It helps users who navigate your page with a keyboard or with assistive technology like a screen reader.
* Introduce the sample code. See how hard it is to navigate with your keyboard?
* In this post you will learn how to make that interaction easier by programmatically moving focus when user opens and closes the sidebar.
    * Outline learning goals

## An Overview of the Sample Code

* Walk through the code. Show the component structure diagram. Talk about what happens when you open and close the sidebar.

## The Requirements

* Outline the acceptance criteria. What currently happens when you open/close the sidebar? What is the intended behavior?

## Part 1: Moving Focus When the Sidebar Opens

It's a good idea to write tests for your code, so that you can make sure things don't break in the future. We're going to use the red, green, refactor technique. We're going to start by writing a test for what we want our code to do, then we'll add the implementation to make our test pass. 

### Write the test!

* Take another look at the acceptance criteria.
* Write a test case that matches that (Given, When, Then).
* Run the tests. New test should fail.

### Make the test pass!

* Use React `ref`
* Outline what they're supposed to do in words first. Give them an opportunity to try it before giving them the answer.
* Walk them through the code step by step.
* Run the test, make sure it's passing.
* Manual testing. Run the code in the browser. Try navigating with the keyboard. Now when you click "enter" on a button in the grid, your focus should automatically move to the header in the sidebar.

### Refactor?

## Part 2: Moving Focus When the Sidebar Closes

### Write the test!

* Take another look at the acceptance criteria.
* Write a test case that matches (Given, When, Then).
* Run the tests. New test should fail.

### Make the test pass!

* Outline the steps in words. Give them a chance to try it on their own.
* Show them the step-by-step implementation.
* Run the test, make sure it's passing.
* Manual testing. Run the code in the browser. Try navigating with the keyboard. Open the sidebar, then close it. When the sidebar closes, your focus should move back to the table cell you clicked on.

## Next Steps

This was a first pass at improving the accessibility, but there's still more work to be done! For example, once you open the sidebar, try hitting tab a bunch of times. Your focus still moves out of the sidebar and into the focusable elements in the grid in the background. It might be a better experience for users if their focus cycled back up to the top of the sidebar once they reached the end of the sidebar content. One way achieve that functionality would be to use something like inert polyfill to keep the focus inside the sidebar.

Conclusion: say something final, ask questions. Encourage them to reach out to Twitter. Direct them to additional resources.

## Additional Resources

* Links to things

## Appendix: Testing Focus in Older Versions of Jest (v24.9.0)