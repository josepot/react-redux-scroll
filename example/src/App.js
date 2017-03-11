import React, { Component } from 'react';
import { scrollToWhen } from '../../lib';
import logo from './logo.svg';
import './App.css';
import { JUMP_TO, JUMP_TO_LAST } from './actions';

const Header = scrollToWhen(JUMP_TO, undefined, { duration: 1000 })(() =>
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to React</h2>
  </div>
);

const LastParagraph = scrollToWhen(
  JUMP_TO_LAST,
  undefined,
  { duration: 3000, easingFunction: 'EASE_IN_OUT_CUBIC', yAlignment: 'BOTTOM' },
  (dispatch, cancelled) => dispatch({ type: 'SCROLL_FINISHED', cancelled })
)('p');

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <LastParagraph className="App-intro">
          Test.To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </LastParagraph>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
