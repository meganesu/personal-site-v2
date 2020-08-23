---
title: "A Deep Dive on Managing Focus with React, Jest, and Enzyme"
author: "Megan Sullivan"
date: "2020-08-22"
---

## What You Will Learn

By the end of this article, you will be able to:

* Explain what focus management is and why it's important.
* Use React `ref` to programmatically move focus between elements on a web page.
* Write tests using Jest and Enzyme to check focus management behavior.

## Prerequisites

In order to get the most out of this article, you should already know the basics of how React works. The words "component," "state," and "props" should all sound familiar.

If they don't, here are some resources to help you get up to speed:

* Check out Ali Spittel's post, [A Complete Beginner's Guide to React](https://dev.to/aspittel/a-complete-beginners-guide-to-react-2cl6).
* New to the `useState` hook? Check out Christina Gorton's post, [React Hooks: useState](https://dev.to/coffeecraftcode/react-hooks-usestate-3hfo).

## The Problem

Not everyone who uses a computer can use a mouse. Some users have physical disabilities and need to use keyboard navigation instead. Other users are blind or have low vision and use screen readers to consume and interact with websites. As web developers, it's our responsibility to make sure our products are accessible to all users. That means we need to make sure that our sites are [keyboard compatible](https://www.w3.org/WAI/perspective-videos/keyboard/). That is, a user's keyboard focus should move around the page in a way that makes sense.

Let's look at an example to see what I mean. The CodePen below has some starter code for the React project we'll be working on in this post. The main content is a table that shows what color you get when you mix two other colors.

> This table structure is a simplified version of a project I built recently, a [table of all the Game Boy opcodes](https://meganesu.github.io/generate-gb-opcodes). For more background on that project, check out this article I wrote: [Meet the Game Boy Instruction Set](/blog/game-boy-opcodes).

Each cell in the table has a button. Clicking a button does two things:

1. It opens a sidebar.
1. It updates the text in the sidebar based on which button was clicked.

Try using your keyboard to click some of the buttons inside the table, and see what happens to your focus. You can use the Tab key to move your focus between elements, and you can press the Space or Enter keys to click the currently focused element. (Note: you might need to click on the table first to get your focus inside the actual CodePen result window.)

<iframe style="width: 100%; border: none; min-height: 400px;" title="Managing Focus in React (no focus management)" src="https://codepen.io/meganesu/embed/preview/OJVXwer?height=265&theme-id=dark&default-tab=result" loading="lazy" allowfullscreen="true" >
  See the Pen <a href='https://codepen.io/meganesu/pen/OJVXwer'>Managing Focus in React (no focus management)</a> by Megan Sullivan
  (<a href='https://codepen.io/meganesu'>@meganesu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

See how many times you have to press Tab after clicking a button before your focus moves into the sidebar? The current experience might be feasible for a sighted user who is using a mouse to navigate the page. But keyboard or screen reader users will have to move through a frustrating number of elements before they can actually get to the updated sidebar content. This isn't ideal, especially as the number of table cells grows.

In this post, you'll learn about how to programmatically manage a user's focus to create a more accessible experience. If you prefer learning by doing, you can fork the CodePen and follow along as we go.


## The Requirements

Here's a more accessible user experience: When a user clicks on one of the buttons in the table, their focus should automatically move into the sidebar. Additionally, when a user clicks on the "Close sidebar" button, their focus should automatically go back to the table cell they clicked on in the first place.

The [acceptance criteria](https://existek.com/blog/what-are-acceptance-criteria/) for these two requirements might look something like this:

1. **Given** the sidebar is closed\
**When** I click on a button in a table cell\
**Then** the keyboard focus moves to the header inside the sidebar.

1. **Given** the sidebar is open\
**When** I click on the "Close sidebar" button\
**Then** the keyboard focus moves back to the table cell button.

## A Closer Look at the Starter Code

> "Cut to the chase, Megan. Where's the code?"
>
> If you want to jump right into implementing focus management, you can skip ahead to the next section: [How to Move Focus in React: `ref`](#react-ref)

Before we start implementing focus management features, let's get familiar with the component structure of the [starter code](https://codepen.io/meganesu/pen/OJVXwer):

![A diagram of the app component tree](./app-structure.png)

Here's a breakdown of how all the components fit together:

* **App**: The top-level component, which renders the Table and Sidebar components.
    * The App component keeps track of two state variables:
        * `showSidebar`: a boolean value that is `true` when the sidebar should be open and `false` when it should be closed. The inverse of this value is passed to the Sidebar component as the `isHidden` prop.
        * `activeCell`: an object corresponding to the input and output colors for the TableCell currently displayed in the Sidebar. On page load, it has an initial value of `null`. This object is passed to the Sidebar component as the `colors` prop.
    * The App component also defines two functions, which get passed down to rendered components as props:
        * `updateSidebar(colors)`: a function that sets App's `activeCell` state variable to the object passed in as `colors`. It also sets App's `showSidebar` state variable to `true`. This function gets passed to the Table component as a prop.
        * `hideSidebar()`: a function that sets the value of `showSidebar` in the App state to `false`. It gets passed to the Sidebar component as a prop.
* **Table**: Renders the HTML `table` element and all of the TableCell components.
    * The Table component receives the `updateSidebar` function as a prop from App and passes it down to the TableCell components.
    * The Table component also sets the `colors` object for each TableCell. (Since this is a contrived example, the configuration is hard-coded for each TableCell.)
* **Sidebar**: Renders additional details about the currently selected TableCell.
    * This component renders an `h1` element for the title of the sidebar, a `button` element for closing the sidebar, and a `p` element with the `colors` details for the TableCell that was clicked.
    * When the `isHidden` prop from App is `true`, the Sidebar renders with an additional class that hides the Sidebar by moving it offscreen. When `isHidden` is false, the class is removed, and the Sidebar becomes visible.
* **TableCell**: Renders the `td` element for an individual cell.
    * Inside the `td` element, there is a `button` element. When this button is clicked, the click event handler calls the `updateSidebar` function from props and passes it the `colors` prop for that cell.

### What Happens When the Sidebar Opens?

Here's a breakdown of how the data flows between components when the sidebar opens:

1. The user clicks on the button in a TableCell, which triggers the button's click event handler.
1. The event handler calls `updateSidebar` with the value of the `colors` prop for that TableCell.
1. The `updateSidebar` function - which is defined in the App component - updates the value of `activeCell` in the App state and sets `showSidebar` in the App state to `true`.
1. This state change causes a rerender of the App component, and the Sidebar component gets new prop values for `colors` and `isHidden`.
1. Since `isHidden` is now `false` (the opposite of `showSidebar`), the Sidebar component renders without the "hidden" class, and the Sidebar becomes visible to the user.

### What Happens When the Sidebar Closes?

Here's a breakdown of how the data flows between components when the sidebar closes.

1. The user clicks on the "Close sidebar" button in the Sidebar, which triggers the button's click event handler.
1. The event handler calls the `hideSidebar` function that was passed into the Sidebar as a prop.
1. The `hideSidebar` function - which is defined in the App component - sets `showSidebar` in the App state to `false`.
1. This state change causes a rerender of the App component, and the Sidebar component gets a new prop value for `isHidden`.
1. Since `isHidden` is now `true` (the opposite of `showSidebar`), the Sidebar component renders with the "hidden" class, and the Sidebar slides off the page and out of sight.

<h2 id="react-ref">How to Move Focus in React: <code class="language-text">ref</code></h2>

Now that we know how our starter code works and what we want it to do, we can start implementing our focus management requirements. But how do you move focus in a React app? Enter `ref`.

What is a `ref`? It's short for "reference." It's a way to refer directly to an element in the DOM.

Normally, in React, information only flows through components in one direction: a parent component passes data down to its children as props. But sometimes, you'll need one component (like the TableCell in our example) to be able to talk to another component in a totally different part of the DOM tree (like the Sidebar). `ref` is React's way of letting you do that.

> **Don't overuse `ref`!**
>
> Just because you can use `ref` to get around the normal React data flow doesn't mean you should use it for everything. The React team identified [specific use cases where `ref` comes in handy](https://reactjs.org/docs/refs-and-the-dom.html#when-to-use-refs) (like managing focus for accessibility). If your situation doesn't fall under one of those use cases, think carefully about whether there's another way to achieve your goal without using `ref`.

The process for using `ref` looks like this:

1. Create a new `ref` object.
1. Assign that `ref` object to an element in the `render` function of a component.

Let's take a closer look at each of those steps.

### Step 1: Create a new `ref` object

If you're using functional components, you can create a new `ref` object using the `useRef` hook:

```javascript
useRef(initialValue)
```

Usually, you'll just pass in an initial value of `null`:

```javascript
const myRef = useRef(null)
```

> If you're using class components, the syntax looks a little different. You can refer to the [official React docs about `ref`](https://reactjs.org/docs/refs-and-the-dom.html) for the details.

Now you have a variable for the `ref` you created, which you can pass down to child components via props. (We'll take a closer look at how to do that when we start implementing focus management in the next section.)

But what's actually in that `ref` object? If you log the `myRef` variable to the console, you'll see that it contains an object with a single property called `current`:

```javascript
Object { current: null }
```

The `current` property is what keeps track of the node this `ref` is assigned to. To start, it'll be set to whatever you passed in as `initialValue`. The value of the `current` property will change when you assign the `ref` to an element. Which leads us to...

### Step 2: Assign the `ref` to an element

First, decide which DOM element you want to connect to your `ref`. In our case, this is going to be the element we want focused.

Then, find the place where that element is rendered. Add a `ref` attribute to the element, and set it to the variable you created in step 1.

```javascript
return (
  <button ref={myRef}> // add the ref attribute
    Click me!
  </button>
)
```

Once that component mounts, React will update `myRef.current` to be the DOM element you assigned `myRef` to:

```javascript
Object { current: button }
```

> Now that `myRef.current` is a focusable [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), you can call its [`focus` method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/focus), which will automatically move keyboard focus to that element.

## The Solution

Now that we've got a basic understanding of how `ref` works, let's see how to use it within the context of our original problem: programmatically moving the user's focus.

### Part 1: Move Focus When the Sidebar Opens

Let's start with a quick recap of the first acceptance criterion:

**Given** the sidebar is closed \
**When** I click on a button in a table cell \
**Then** the keyboard focus moves to the header inside the sidebar.

Before we get too deep into the code, let's take a step back and think about the high-level overview of what we need to do:

* Create a new `ref` for the sidebar. Let's call it `sidebarRef`. (So creative!)
* Attach it to the `h1` element in the Sidebar component.
* Call `sidebarRef.current.focus()` when the TableCell button is clicked.

With that big picture in mind, let's get into the code to implement this:

1. Start by adding `useRef` to the list of methods imported from React.
    ```javascript
    import { Fragment, useState, useRef } from 'react';
    ```
    > In CodePen, this import looks a little different:
    > ```javascript
    > const { Fragment, useState, useRef } = React;
    > ```
1. Create `sidebarRef`. Which component should we create it in? We know that we eventually want to attach it to the `h1` in the Sidebar component. We also need to be able to call `sidebarRef.current.focus()` when the TableCell is clicked. Since the App component is a parent of Sidebar, and it's where `updateSidebar` (the function called from the TableCell click handler) is defined, let's create `sidebarRef` inside the App component.
    ```javascript
    const App = () => {
      const [showSidebar, setShowSidebar] = useState(false);
      const [activeCell, setActiveCell] = useState(null);

      const sidebarRef = useRef(null); // add this
      // ...
    }
    ```
1. Now we can pass `sidebarRef` down to the Sidebar component as a prop.
    ```javascript
    const App = () => {
      // ...
      return (
        // ...
        <Sidebar
          colors={activeCell}
          hideSidebar={hideSidebar}
          isHidden={!showSidebar}
          sidebarRef={sidebarRef} // add this
        />
        // ...
      )
    }
    ```
1. In Sidebar, add a `ref` attribute to the element we want to focus on when the sidebar opens (i.e., the `h1` header). Set the value to the new `sidebarRef` prop. Since headers aren't focusable elements by default, we'll also need to add the [`tabIndex` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) to make the `h1` focusable. Give it a value of `-1`. (That way, users won't be able to focus on the header when they're tabbing sequentially through the page, but we'll still be able to programmatically move focus to it.)
    ```javascript
    const Sidebar = ({
      colors,
      hideSidebar,
      isHidden,
      sidebarRef // add this
    }) => {
      // ...
      return(
        // ...
        <h1
          ref={sidebarRef} // add this
          tabIndex={-1} // add this
        >
          {colors.output}
        </h1>
        // ...
      )
    }
    ```
1. Finally, go back to the `updateSidebar` function in the App component. Add a step to move focus to the element assigned to `sidebarRef`.
    > Since `sidebarRef` is defined inside of App, you can access it inside of `updateSidebar`.
    ```javascript
    const App = () => {
      // ...
      const updateSidebar = (colors) => {
        setActiveCell(colors);
        setShowSidebar(true);
        sidebarRef.current.focus(); // add this
      };
      // ...
    }
    ```

Now, the most important part of adding accessibilty features: manual testing! When you view the project in a browser, you should be able to click (or press enter) on a button in the table and see your focus automatically move to the header in the sidebar! Try it out with a keyboard, then [test it with a screen reader](https://webaim.org/articles/screenreader_testing/).

Here's another CodePen with all the changes we've made so far:

<iframe style="width: 100%; border: none; min-height: 400px;" title="Managing Focus in React (move focus on sidebar open only)" src="https://codepen.io/meganesu/embed/preview/jOPMbGX?height=265&theme-id=dark&default-tab=result" loading="lazy" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/meganesu/pen/jOPMbGX'>Managing Focus in React (move focus on sidebar open only)</a> by Megan Sullivan
  (<a href='https://codepen.io/meganesu'>@meganesu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

> **Note:** For this focus management solution to work correctly, you need the sidebar to always be rendered in the DOM.
>
> When I initially built this project, I used [conditional rendering](https://reactjs.org/docs/conditional-rendering.html) to only add the Sidebar component to the DOM if it was visible on the screen. But this caused problems with the focus management behavior.
>
> The first time I clicked a TableCell button, the sidebar would open, but the keyboard focus wouldn't move. It turns out, this was because the Sidebar component wasn't mounted yet, which meant that `sidebarRef.current` wasn't assigned to anything. To get the focus to move into the sidebar, I had to click the TableCell button twice: once to open the sidebar and mount the component, and once to actually move focus once the component was mounted. Not ideal.

### Part 2: Move Focus When the Sidebar Closes

You're halfway done! Hang in there, you're doing great.

Let's take another look at our second acceptance criterion:

**Given** the sidebar is open\
**When** I click on the "Close sidebar" button\
**Then** the keyboard focus moves back to the table cell button.

Like last time, let's take a step back and lay out a high-level overview of what we need to do:

* Create a new `ref` for the TableCell button. Let's call it `buttonRef`. (Another creative name.)
* Attach it to the `button` element in the TableCell component.
* Update the TableCell button click handler to keep track of the last `buttonRef` clicked. We'll use a new React state variable for this. Let's call it `lastCellClicked`.
* Call `lastCellClicked.current.focus()` when the "Close sidebar" button is clicked.

Now let's implement this in code:

1. Create `buttonRef`. Which component should we create it in? Since we want to have a separate `ref` object for each TableCell, let's define `buttonRef` in the TableCell component. That way, each TableCell that mounts will have its own unique `ref` that can be focused independently.
    ```javascript
    const TableCell = ({ colors, updateSidebar }) => {
      const buttonRef = useRef(null); // add this
      // ...
    }
    ```
1. Now attach `buttonRef` to the `button` element in the TableCell component.
    ```javascript
    const TableCell = ({ colors, updateSidebar }) => {
      // ...
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
1. Pass `buttonRef` as an additional argument to `updateSidebar` when it's called in the TableCell `button` click handler. (We'll get to `updateSidebar` in a moment.)
    ```javascript
    const TableCell = ({ colors, updateSidebar }) => {
      // ...
      return (
        // ...
        <button
          onClick={() => updateSidebar(colors, buttonRef)} // add buttonRef
          ref={buttonRef}
        >
        // ...
      )
    }
    ```
1. Create a new state variable to keep track of the last cell clicked. Where should this state variable be created? We know we'll want to update it when `updateSidebar` is called. Since `updateSidebar` is defined in the App component, let's create the new state variable there as well. We can use an initial value of `null`, since when the App first mounts none of the TableCells have been clicked yet.
    ```javascript
    const App = () => {
      const [showSidebar, setShowSidebar] = useState(false);
      const [activeCell, setActiveCell] = useState(null);
      const [lastCellClicked, setLastCellClicked] = useState(null); // add this
      // ...
    }
    ```
1. Now it's time to change `updateSidebar`. First, we can add the new `buttonRef` parameter. Then, we can set `lastCellClicked` to the `buttonRef` that's passed in.
    > To summarize, this means that when a user clicks on a TableCell button and `updateSidebar` is called, `lastCellClicked` will be updated with the `ref` for the TableCell button that was clicked.
    ```javascript
    const App = () => {
      // ...
      const updateSidebar = (colors, buttonRef) => { // add buttonRef parameter
        setLastCellClicked(buttonRef); // add this
        setActiveCell(colors);
        setShowSidebar(true);
        sidebarRef.current.focus();
      };
      // ...
    }
    ```
1. Now that we have a way to determine the most recently clicked TableCell, we can update `hideSidebar` to move focus back to that TableCell button when the "Close sidebar" button is clicked.
    ```javascript
    const App = () => {
      // ...
      const hideSidebar = () => {
        setShowSidebar(false);
        lastCellClicked.current.focus(); // add this
      };
      // ...
    }
    ```

And that should do it! Don't forget to manually test your changes to make sure it's working as expected. Now, when you view the project in a browser, your focus should move into the sidebar when you click a TableCell button, and it should move back to that TableCell button when you close the sidebar. Try it out with a keyboard and with a screen reader. So much nicer than the initial experience!

Here's the final CodePen, with all our focus management changes:

<iframe style="width: 100%; border: none; min-height: 400px;" title="Managing Focus in React (move focus on sidebar open and close)" src="https://codepen.io/meganesu/embed/preview/abOmwbg?height=265&theme-id=dark&default-tab=result" loading="lazy" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/meganesu/pen/abOmwbg'>Managing Focus in React (move focus on sidebar open and close)</a> by Megan Sullivan
  (<a href='https://codepen.io/meganesu'>@meganesu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Writing Tests

As with any new functionality, it's a good idea to write tests along the way, so that you can be sure that things work (and continue to work) as you expect them to.

One tip to keep in mind: you should test the side effects of your application, not the implementation. Instead of checking that a particular function was called, think about what behavior your end user expects and check that.

> **Do yourself a favor!** 
>
> If your tests are too closely tied to the exact implementation of your app, they become brittle. For example, imagine Future You decides to change the way you implemented a feature, without affecting the end result. You'll probably also end up needing to change your tests, even though your end users see the same behavior.
> 
> On the other hand, if your tests are checking for side effects - things you expect your code to have done by the time it finishes running - they'll be more flexible and less likely to fail due to refactoring.

Let's take one last look at our acceptance criteria:

1. **Given** the sidebar is closed\
**When** I click on a button in a table cell\
**Then** the keyboard focus moves to the header inside the sidebar.

1. **Given** the sidebar is open\
**When** I click on the "Close sidebar" button\
**Then** the keyboard focus moves back to the table cell button.

Both of these test scenarios have a similar structure:

* Interact with an element on the page.
* Check that the correct element has focus at the end of the interaction.

### Using Jest v24.9.0

When I first wrote these tests, I was using an older version of Jest, v24.9.0. Here's what the initial tests looked like:

```javascript
const component = mount(<App />);

describe('when a TableCell is clicked', () => {
  let firstTableCellButton;

  beforeAll(() => {
    const firstTableCell = component.find('TableCell').first();
    firstTableCellButton = firstTableCell.find('button');
    firstTableCellButton.simulate('click');
  });

  it('moves focus to the header in the Sidebar', () => {
    const sidebarHeader = component.find('Sidebar h1');
    expect(document.activeElement).toEqual(sidebarHeader.getDOMNode());
  });

  describe('when close sidebar button is clicked', () => {
    beforeAll(() => {
      component.find('Sidebar button').simulate('click');
    });

    it('moves focus back to the last TableCell clicked', () => {
      expect(document.activeElement).toEqual(firstTableCellButton.getDOMNode());
    });
  });
});
```

A few notes that might be helpful:

* [`getDOMNode()`](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/getDOMNode.html) comes from Enzyme. It returns the DOM node for an Enzyme wrapper.
    * For example, `component.find('Sidebar h1')` returns an Enyzme wrapper for the `h1` element in the Sidebar. Calling `component.find('Sidebar h1').getDOMNode()` returns the actual DOM element for the `h1`.
* [`document.activeElement`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement) is a property that returns the DOM element that currently has focus. In our tests, this property comes from [JSDOM](https://github.com/jsdom/jsdom), another library that's a dependency of Jest.

### Using Jest v25+

The update from Jest v24 to v25 includes a big jump in JSDOM versions (v11.5.1 to v15.1.1), which you can see in the [Jest changelog](https://github.com/facebook/jest/blob/master/CHANGELOG.md#chore--maintenance-5). For me, when I upgraded my Jest dependency to the latest version (at the time, v25.2.7), my focus management tests broke.

From what I was able to trace down, this problem was because JSDOM changed the way they treated `document.activeElement`. (To be completely honest, I couldn't figure out what specifically the change was, and I got tired of digging through codebases. If you have more information on what happened, please reach out and let me know!)

By combing through linked pull requests (PRs), I found this fix from a [PR in the Carbon Design System repo](https://github.com/carbon-design-system/carbon/pull/5456/files). Here's what my updated tests looked like after following that pull request:

```javascript
const container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

const component = mount(<App />, {
  attachTo: document.querySelector('#container')
});

describe('when a TableCell is clicked', () => {
  // ...
}
```

To fix the tests, I had to create a fake DOM element and then explicitly mount the App component onto that element. The content of the tests themselves didn't change.

## Next Steps

Congratulations, you made it to the end! 🥳

In this post, you learned about how to programmatically move a user's focus when opening and closing a sidebar. But there are still more ways to improve the accessibility of this design!

The next improvement I'm hoping to make is trapping focus inside the sidebar when it's open. That is, when users have the sidebar open and they repeatedly hit the Tab key, their focus should stay inside of the sidebar and not end up back in the rest of the body of the page. I'm planning on using something like the inert polyfill described in this [A11ycasts YouTube Video: Inert Polyfill](https://www.youtube.com/watch?v=fGLp_gfMMGU).

Until then, [reach out to me on Twitter](https://twitter.com/meganesulli) and let me know what you think about this post! I'm by no means an accessibility expert, and I'm always looking for new things to learn. What other opportunities do you see for accessibility improvements, in this project or in general?

## Resources

The diagrams in this post were created using [Excalidraw](https://excalidraw.com/).

### Accessibility

* [W3C WAI overview on keyboard compatibility](https://www.w3.org/WAI/perspective-videos/keyboard/)

### React Documentation

- [React `ref` documentation](https://reactjs.org/docs/refs-and-the-dom.html)
- [React `useRef` hook documentation](https://reactjs.org/docs/hooks-reference.html#useref)
- [React accessibility documentation about focus control](https://reactjs.org/docs/accessibility.html#focus-control)

### Troubleshooting Jest Upgrade

- [Jest Changelog for v25.1.0](https://github.com/facebook/jest/blob/master/CHANGELOG.md#2510)
    - [Jest PR to update JSDOM](https://github.com/facebook/jest/pull/8851)
- [JSDOM Changelog](https://github.com/jsdom/jsdom/blob/master/Changelog.md)
- [JSDOM Issue #2723: `document.activeElement` not working in 15.2.1](https://github.com/jsdom/jsdom/issues/2723)
- [JSDOM Issue #2586: `Element.focus()` does not set active element on document object](https://github.com/jsdom/jsdom/issues/2586)
- [Carbon Design System PR with test changes to work around JSDOM problem](https://github.com/carbon-design-system/carbon/pull/5456/files)

### Future Improvements

- [A11ycasts #02: Inert Polyfill](https://www.youtube.com/watch?v=fGLp_gfMMGU)
