---
title: "Managing Focus with React and Jest"
author: "Megan Sullivan"
date: ""
---

## What you will learn:
* Why focus management is important
* How to use `ref` to move focus in React
* How to write a Jest test for changing focus

## The problem:
I have a sidebar that opens up when you click on a button. For keyboard and screenreader users, when they press the button their focus should move into the sidebar.

_Insert diagram/tree of what component structure looks like_

_CodePen with slimmed down example WITHOUT moving focus_

* Simple sidebar and table
* Clicking a button in the table changes the contents in the sidebar.

## How refs work

What is a ref?

How do you pass it into a component? What does that actually do?

## Refs in action

Now that we've got a basic understanding of refs, let's see what they look like within the context of our original problem.

### Moving focus when the sidebar opens

1. Click on button in InstructionCell
1. Focus on h3 in sidebar. (Create ref inside of App, and pass down to DetailsSidebar)

### Moving focus when the sidebar closes

1. Click on close button in DetailsSidebar
1. Focus on InstructionCell that was clicked before (create ref inside of InstructionCell button, and pass that ref as param in handleClick function (along with instruction object)).

## Writing Tests

Test the side effects, not the implementation. Don't want to test that a function got called, want to test that the focus moves as expected.

GIVEN the sidebar is closed
WHEN I click on a button
THEN the sidebar opens
AND focus is moved to the header inside the sidebar

WHEN InstructionCell is clicked
THEN focus is moved to the sidebar ref

```javascript
const focusedSidebarHeader = component.find('#sidebar-header h2');

expect(focusedSidebarHeader.getDOMNode()).toEqual(document.activeElement);
```

Breakdown of what's going on here:
1. `getDOMNode()` comes from Enzyme
1. `document.activeElement` comes from ? (Enzyme? Jest?)

## Resources

- React `ref` documentation: https://reactjs.org/docs/refs-and-the-dom.html
- React a11y focus control documentation: https://reactjs.org/docs/accessibility.html#focus-control
