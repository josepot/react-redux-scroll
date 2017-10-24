# React Redux Scroll

Scroll management library for react-redux apps.

### Table of Contents

* [Install](#install)
* [Configuration](#configuration)
* [Usage](#usage)
  * [Basic](#basic)
  * [Intermediate](#intermediate)
  * [Complete Examples](#complete-examples)
* [API](#api)
  * [`createScrollMiddleware()`](#createscrollmiddleware)
  * [`scrollToWhen(pattern, [onEnd], [scrollOptions], [excludeProps])`](#scrolltowhenpattern-onend-scrolloptions-excludeprops)
  * [`scrollableArea`](#scrollablearea)
* [FAQ](#faq)
* [Rationale](#rationale)

## Install

`npm install --save react-redux-scroll`

## Configuration

Use `createScrollMiddleware()` to add the middleware to your redux store. For example:

```js
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { createScrollMiddleware } from 'react-redux-scroll';

const devMode = process.env.NODE_ENV !== 'production';

const scrollMiddleware = createScrollMiddleware();
const loggerMiddleware = createLogger();

const getMiddlewares = () => {
  const common = [scrollMiddleware];
  const dev = [loggerMiddleware];
  const prod = [];
  return [...common, ...(devMode ? dev : prod)];
};

const getOtherEnhancers = () => (
  devMode && window.devToolsExtension ? [window.devToolsExtension()] : []
);

const configureStore = reducer => compose(
  applyMiddleware(...getMiddlewares()),
  ...getOtherEnhancers()
)(createStore)(reducer);

export default configureStore;
```

## Usage

### Basic

Imagine that you have a `ErrorMessages` component that's used for
displaying a bunch of form errors. Now, lets say that we want to trigger
a smooth scroll to the DOM element of that component when the action
type `ERRORS_REPORTED` gets dispatched.

```js
import React from 'react';
import { scrollToWhen } from 'react-redux-scroll';
import ErrorMessages from './ErrorMessages';
import FancyForm from './FancyForm';
import { ERRORS_REPORTED } from 'action-types';

const ScrollableErrorMessages =
  scrollToWhen(ERRORS_REPORTED)(ErrorMessages);

export default () =>
  <div>
    <ScrollableErrorMessages />
    <FancyForm />
  </div>;
```

Now, lets pretend that the `FancyForm` and the `ErrorMessages` are inside
an `overflow: scroll` element. Therefore we want the scroll to happen for
that "overflowed" element, instead of the `window`:

```js
import React from 'react';
import { scrollableArea, scrollToWhen } from 'react-redux-scroll';
import ErrorMessages from './ErrorMessages';
import FancyForm from './FancyForm';
import { ERRORS_REPORTED } from 'action-types';

const ScrollableErrorMessages =
  scrollToWhen(ERRORS_REPORTED)(ErrorMessages);

export default scrollableArea(() =>
  <div
    style={{
      overflow: 'scroll',
      width: '400px',
      height: '800px',
    }}
  >
    <ScrollableErrorMessages />
    <FancyForm />
  </div>);
```

### Intermediate

```js
import React from 'react';
import PropTypes from 'prop-types';
import { scrollToWhen } from 'react-redux-scroll';
import { PARAGRAPH_SELECTED } from 'action-types';

const isParagraphSelected = (action, props) => (
  action.type === SCROLL_TO_PARAGRAPH && props.id = action.paragraphId
);

const ScrollableParagraph = scrollToWhen(
  isParagraphSelected, null, null, ['id']
)('p');

const Paragraphs = ({ paragraphsData }) =>
  <div>
    {paragraphsData.map(({ id, content }) =>
      <ScrollableParagraph id={id} key={id}>
        {content}
      </ScrollableParagraph>
    )}
  </div>;

Paragraphs.proptypes = {
  paragraphsData = PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: Proptyes.node.isRequired,
  })),
};

export default Paragraphs;
```

### Complete Examples

There are 2 complete examples in this repo that take advantage of all the different usages of the API:

- [paragraphs](https://github.com/josepot/react-redux-scroll/tree/master/examples/paragraphs): It's a pretty basic one based on the code above.
- [lottery](https://github.com/josepot/react-redux-scroll/tree/master/examples/lottery): This one is more advanced: it demonstarates how to use multiple ScrollAreas and having more than one scroll happneing at the same time.

In order to try the examples, clone this repo, go the example folder that you want to try and do an `npm install`, `npm start`. For example:

```
git clone git@github.com:josepot/react-redux-scroll.git
cd react-redux-scroll/examples/lottery
npm install
npm start
```

## API

### `createScrollMiddleware()`
It returns a [redux middleware](http://redux.js.org/docs/advanced/Middleware.html).

### `scrollToWhen(pattern, [onEnd], [scrollOptions], [excludeProps])`

It returns a Higher Order React Component Function that will trigger scroll to the provided component when the pattern matches the dispatched action.

**Arguments**

#### - `pattern` (*String | Function | Array*):
It will trigger a scroll when a dispatched action matches the pattern. (Very similar to the way that [redux-saga take pattern](https://redux-saga.github.io/redux-saga/docs/api/index.html#takepattern) works).

  - If it's a String: the pattern will match if `action.type === pattern`
  - If it's a Function: the pattern will match if the return value of the function is truthy. This function receives the following arguments: `(action, props, newState, oldState)`. It can also return an object containing a different [`onEnd` function](#---onenddispatch-canceled-void--function) (which will take precedence over the one provided in the second parameter of the `scrollToWhen` function) and/or [`scrollOptions`](#---scrolloptions--object) (object which will get merged with the options provided in the third parameter of the `scrollToWhen` function).
  - If it's an Array:  each item in the array is matched with beforementioned rules, so the mixed array of strings and function predicates is supported.

#### - `[ onEnd(dispatch, canceled): void ]` (*Function*):
A callback function that will get called once the scroll has finished. The first argument is the [redux store `dispatch` function](http://redux.js.org/docs/api/Store.html#dispatch). The second parameter is a boolean flag indicating whether the scroll got cancelled.

#### - `[ scrollOptions ]` (*Object*):
If specified further customizes the behavior of the scroll. The possible options are:
  - `[ duration ]` (Number): Number of milliseconds that it will take for the scroll to complete. Defaults to `500`.
  - `[ transitionTimingFunction ]` (String | Function):
    - If a String, one of:
      * LINEAR
      * EASE_IN_QUAD
      * EASE_OUT_QUAD
      * EASE_IN_OUT_QUAD
      * EASE_IN_CUBIC
      * EASE_OUT_CUBIC
      * EASE_IN_OUT_CUBIC
      * EASE_IN_QUART
      * EASE_OUT_QUART
      * EASE_IN_OUT_QUART
    - If a function: it takes one argument `t` which is a decimal value between 0 and 1 (including both 0 and 1) that represents the proportional amount of time that has passed since the motion started. This function is supposed to returs a value between 0 and 1 that represents the proportional distance that has been completed in `t` time. The only conditions are that if `t` is zero the return value must be zero and that if `t` is 1 the return value must be 1 too.
    - Defaults to: `EASE_IN_QUAD`.
  - `[ xAlignment ]` (String): Either `LEFT` or `RIGHT`, pass `null` or `undefined` if you don't want for the scroll function to change the x position. Defaults to `null`.
  - `[ xMargin ]` (Number): Margin in pixels to the x alignment. Defaults to 0.
  - `[ yMargin ]` (String): Either `TOP` or `BOTTOM`, pass `null` or `undefined` if you don't want for the scroll function to change the x position. Defaults to `null`.
  - `[ yMargin ]` (Number): Margin in pixels to the y alignment. Defaults to 0.

#### - `[ excludeProps ]` (*Array*):
An array of Strings indicating the names of the props that shouldn't be propagated to the enhanced component.

### `scrollableArea`

It returns a Higher Order React Component Function that creates a ScrollableArea for the Scrollable components that it has inside. It's meant to be used for enhancing "overflowing" components. If a Scrollable component is not inside a ScrollableArea, the ScrollableArea defaults to `window`.


## FAQ

### Is there an easy way to disable this library for the SSR build?

Setting the env variable `HAS_SSR` to `true` will accomplish that.

### - What happens when more than one scroll tries to take place as a result of the latest action that was dispatched?

Depends. If the scrolls are for different "Scrolling Areas" all
scrolls will happen simultaneusly, no problem. However, if they belong to the
same "Scrolling Area" (i.e. they are all requesting a `window` scroll)
then the middleware will only allow the first scroll that got subscribed to
happen. In the development env you will get warnings in the console
letting you know that some scrolls were prevented from happening because they
all requested a scroll inside the same scrolling area as a result of the latest
action. In the production environemnt the warning won't appear and just one
scroll will happen.

### - What if a scroll gets triggered while another scroll is still running (in the same scrolling area)?

The running scroll will stop and the new scroll will start.

### - Is there a way to know when a scroll has finished?

Yes. You can use the `onEnd` function.

### - Can I dispatch an action once a scroll has finished?

Yes. The first argument of the `onEnd` function is the `store.dispatch`.
Use it to dispatch another action.

### - Is there a way to know if the scroll got cancelled?

Yes. The second argument of the `onEnd` function is a boolean value that
indicates whether or not the scroll got canceled.

### - Is this library compatible with IE9?

Yes.

### - How many dependencies does this library have?

Zero.

### - What's the minified size of this library?

10Kb.

## Rationale

So, you have your nice and functional React-Redux app: no stateful
components, everything that gets rendered is in response to the
state of your store... And now a new requirement comes in:
"whenever this or that happens we need a smooth scroll towards
that component". Now what? How are we going to make that scroll happen?
Maybe we could add a boolean entry in the state like: `needsToScroll`
and then use the lifecycle event `componentWillReceiveProps` to trigger a scroll
whenever that value changes from `false` to `true`... And hope that no other
component instance is trying to do the same thing. We would also
have to dispatch another action when the scroll finishes to set
that entry back to `false`. And how do we cancel that scroll if now another
acction happened that requires that scroll to be directed somewhere else?
A bit messy, and convoluted, right?

This library helps you manage the scrolls of your app declaratively,
while keeping your presentational components decoupled from the actions
and the state of the app... You won't need to deal with "refs", "classes" or
lifecycle events.
