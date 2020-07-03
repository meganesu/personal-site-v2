---
title: "Managing Focus with React and Jest"
author: "Megan Sullivan"
date: ""
---

## What You Will Learn
* Why focus management is important
* How to use `ref` to move focus in React
* How to write a Jest test for changing focus

## The Backstory

I have a side project that I've been building on and off for the past year: it's [a set of tables to help users understand the original Game Boy instruction set](https://meganesu.github.io/generate-gb-opcodes). (For more background on the project, check out this article I wrote: [Meet the Game Boy Instruction Set](https://meganesu.github.io/blog/game-boy-opcodes).)

Here's the basic structure of how the app fits together. This should make the code examples later on in the post make more sense.

_Insert diagram/tree of what component structure looks like_

* App

## The Problem

For the sake of this article, here's a simplified version of the site I built, without any focus management. Each cell in the table has a button. Clicking the button opens a sidebar and changes the content that renders in the sidebar. Try using your keyboard to click some of the buttons inside the table, and see what happens to your focus.

<iframe height="265" style="width: 100%;" scrolling="no" title="Managing Focus in React" src="https://codepen.io/meganesu/embed/preview/OJVXwer?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/meganesu/pen/OJVXwer'>Managing Focus in React</a> by Megan Sullivan
  (<a href='https://codepen.io/meganesu'>@meganesu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

See how many times you have to press tab after clicking a button before your focus moves into the sidebar? The current experience might be feasible for a sighted user. But users who navigate with a keyboard or screen reader will have to move through so many elements before they can actually tell what content was updated. This isn't ideal, especially considering how many table cells are in the actual project.

A better experience would be if - after a user clicks on one of the buttons in the table - their focus automatically moves into the sidebar. In this post, I'm going to teach you how to implement that focus management using React `ref`.

## Background: How to Use React `ref`

What is a ref?
A ref is a reference to another element in the DOM.

`ref.current` gives you the node being referenced by the ref object

```javascript
const myRef = useRef(initialValue) // Creates a ref object where the .current property is set to initialValue
```

Usually, you'll just pass in null for initialValue, since you're going to pass your reference down to some other component anyway.

When you set the ref prop of a component to your ref object myRef, then React sets the .current property of myRef to the component whose prop you just set.

How do you pass it into a component? What does that actually do?

## The Solution: `ref` in Action

Now that we've got a basic understanding of refs, let's see what they look like within the context of our original problem.

### Step 1: Move Focus When the Sidebar Opens

Here's the expected behavior:

1. User clicks on a button in the TableCell in the table.
1. The Sidebar opens, and the user's focus moves to the h3 in the sidebar.

(Create ref inside of App, and pass down to DetailsSidebar)

How to do:

1. In App, create a ref for the sidebar, and pass it down as a prop into Details Sidebar
    ```javascript
    const sidebarRef = useRef(null);
    // In JSX returned:
    <Sidebar
      sidebarRef={sidebarRef}
      // other props
    />
    ```
1. In Sidebar, assign ref to the element we want to focus on when the sidebar opens (the header). Also need to make it focusable (tab index)!
    ```javascript
    const Sidebar = ({ colors, hideSidebar, sidebarRef }) => ( // add sidebarRef prop
      // ...
      <h1
        ref={sidebarRef} // add this
        tabIndex={-1} // add this
      >
        {colors.output}
      </h1>
      // ...
    )
    ```
1. In App, focus on `sidebarRef` in `updateSidebar()` event handler (called when a button in the table cell is clicked, and we want to move focus into the sidebar). Now you should be able to click on (or press enter on) a button in the table and see your focus move to inside the sidebar! Try it out with a keyboard, then try it with a screen reader.
    ```javascript
    const updateSidebar = (colors) => {
      setActiveCell(colors);
      setShowSidebar(true);
      sidebarRef.current.focus();
    };
    ```

Note: need the sidebar to always be rendered for this focus management to work correctly (otherwise, if the sidebar is closed, the sidebarRef isn't assigned to anything (since h1 isn't rendered yet), and on the first click of a cell button, the focus won't move. You'll have to double-click to get focus to move correctly.)

<iframe height="265" style="width: 100%;" scrolling="no" title="Managing Focus in React (move focus on sidebar open only)" src="https://codepen.io/meganesu/embed/preview/jOPMbGX?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/meganesu/pen/jOPMbGX'>Managing Focus in React (move focus on sidebar open only)</a> by Megan Sullivan
  (<a href='https://codepen.io/meganesu'>@meganesu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Step 2: Move Focus When the Sidebar Closes

1. Click on close button in DetailsSidebar
1. Focus on InstructionCell that was clicked before (create ref inside of InstructionCell button, and pass that ref as param in handleClick function (along with instruction object)).

How to do:

1. Create ref inside of TableCell and assign it to TableCell button element
    ```javascript
    const TableCell = ({ colors, updateSidebar }) => {
      const buttonRef = useRef(null); // add this
      return (
        <td>
          <button
            onClick={() => updateSidebar(colors)}
            ref={buttonRef} // add this
          >
            { colors.output }
          </button>
        </td>
      )
    }
    ```
1. Pass the ref into updateSidebar() when it's called in TableCell onClick handler
    ```javascript
    <button
      onClick={() => updateSidebar(colors, buttonRef)}
      ref={buttonRef} // add this
    >
    ```
1. In App, add state variable for lastCellClicked
    ```javascript
      const [lastCellClicked, setLastCellClicked] = useState(null);
    ```
1. In App updateSidebar() implementation, update lastCellClicked to be buttonRef
    ```javascript
    const updateSidebar = (colors, buttonRef) => {
      setLastCellClicked(buttonRef); // add this
      setActiveCell(colors);
      setShowSidebar(true);
      sidebarRef.current.focus();
    };
    ```
1. In App hideSidebar() implementation, call focus on lastCellClicked (ref of button in TableCell)
    ```javascript
    const hideSidebar = () => {
      setShowSidebar(false);
      lastCellClicked.current.focus();
    };
    ```

Complete solution (focus moves on sidebar open and close):

<iframe height="265" style="width: 100%;" scrolling="no" title="Managing Focus in React (move focus on sidebar open and close)" src="https://codepen.io/meganesu/embed/preview/abOmwbg?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/meganesu/pen/abOmwbg'>Managing Focus in React (move focus on sidebar open and close)</a> by Megan Sullivan
  (<a href='https://codepen.io/meganesu'>@meganesu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Writing Tests

Test the side effects, not the implementation. Don't want to test that a function got called, want to test that the focus moves as expected.

GIVEN the sidebar is closed
WHEN I click on a button
THEN the sidebar opens
AND focus is moved to the header inside the sidebar

WHEN InstructionCell is clicked
THEN focus is moved to the sidebar ref

### Using Jest v24.9.0

```javascript
component = mount(<App />);
const focusedSidebarHeader = component.find('#sidebar-header h2');

expect(focusedSidebarHeader.getDOMNode()).toEqual(document.activeElement);
```

Breakdown of what's going on here:
1. `getDOMNode()` comes from Enzyme
1. `document.activeElement` comes from JSDOM (which is one of Jest's dependencies)

### Using Jest v25+

The update from Jest v24 to v25 includes a big jump in JSDOM versions (v11.5.1 to v15.1.1), which you can see in the [Jest changelog](https://github.com/facebook/jest/blob/master/CHANGELOG.md#chore--maintenance-5). For me, when I upgraded my Jest dependency to the latest version (at the time, v25.2.7), my tests for focus management broke.

From what I was able to trace down, this problem was because JSDOM changed the way they treated `document.activeElement`. (To be completely honest, I couldn't figure out what specifically the change was, and I got tired of digging through codebases, so if you have more information on what happened, please reach out and let me know!)

By combing through linked pull requests, I found this solution from a [PR in the Carbon Design System repo](https://github.com/carbon-design-system/carbon/pull/5456/files). Here's the updated test that I wrote by following that PR:

```javascript
let container;

container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

component = mount(<App />, {
  attachTo: document.querySelector('#container')
});
```

## Next Steps

In this post, you learned about how to manage focus when opening and closing a sidebar, but there are still more improvements that can be made on this design.

The next improvement I'm hoping to make is trapping focus inside the sidebar when it's open. That is, when users have the sidebar open and they repeatedly hit the tab key, their focus should stay inside of the sidebar and not end up back in the rest of the body of the page. I'm planning on using something like the inert polyfill described in this [A11ycasts YouTube Video: Inert Polyfill](https://www.youtube.com/watch?v=fGLp_gfMMGU)

## Resources

- React `ref` documentation: https://reactjs.org/docs/refs-and-the-dom.html
- React `useRef` hook documentation: https://reactjs.org/docs/hooks-reference.html#useref
- React a11y focus control documentation: https://reactjs.org/docs/accessibility.html#focus-control
- Jest Changelog for v25.1.0: https://github.com/facebook/jest/blob/master/CHANGELOG.md#2510
    - Jest PR to update JSDOM: https://github.com/facebook/jest/pull/8851
- JSDOM Changelog: https://github.com/jsdom/jsdom/blob/master/Changelog.md
- JSDOM Issue #2723: https://github.com/jsdom/jsdom/issues/2723
- JSDOM Issue #2586: https://github.com/jsdom/jsdom/issues/2586
- Carbon Design System PR with test changes to work around JSDOM problem: https://github.com/carbon-design-system/carbon/pull/5456/files
- A11ycasts #02: Inert Polyfill: https://www.youtube.com/watch?v=fGLp_gfMMGU
