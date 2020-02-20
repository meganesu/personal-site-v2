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

<iframe height="265" style="width: 100%;" scrolling="no" title="Managing Focus in React" src="https://codepen.io/meganesu/embed/preview/OJVXwer?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/meganesu/pen/OJVXwer'>Managing Focus in React</a> by Megan Sullivan
  (<a href='https://codepen.io/meganesu'>@meganesu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

See how many times you have to press tab after clicking a button before your focus moves into the sidebar? The current experience might be feasible for a sighted user, but users who navigate with assistive technology will have to move through so many elements before they can actually tell what content was updated. This isn't ideal.

## How refs work

What is a ref?

How do you pass it into a component? What does that actually do?

## Refs in action

Now that we've got a basic understanding of refs, let's see what they look like within the context of our original problem.

### Moving focus when the sidebar opens

1. Click on button in InstructionCell
1. Focus on h3 in sidebar. (Create ref inside of App, and pass down to DetailsSidebar)

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
1. In App, focus on sidebarRef in updateSidebar() event handler (called when a button in the table cell is clicked, and we want to move focus into the sidebar). Now you should be able to click on (or press enter on) a button in the table and see your focus move to inside the sidebar! Try it out with a keyboard, then try it with a screen reader.
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

### Moving focus when the sidebar closes

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
