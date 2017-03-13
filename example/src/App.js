import React, { Component } from 'react';
import { scrollToWhen } from '../../lib';
import logo from './logo.svg';
import './App.css';
import { JUMP_TO_HEADER, JUMP_TO_PARAGRAPH } from './actions';

const Header = scrollToWhen(JUMP_TO_HEADER, {
  scrollOptions: { duration: 1000 },
})(() =>
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>Welcome to React</h2>
  </div>
);

const ScrollableParagraph = scrollToWhen(
  ({ type, payload }, { paragraphId }) => (
    type === JUMP_TO_PARAGRAPH && paragraphId === payload ? {
      onEnd: (dispatch, cancelled) =>
        dispatch({ type: 'SCROLL_FINISHED', cancelled }),
      scrollOptions: { yAlignment: 'TOP', duration: 3000 },
    } : undefined
  ),
  { excludedProps: ['paragraphId'] }
)('p');

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id =>
          <ScrollableParagraph paragraphId={id} key={id}>
            This paragraph {id} <br /><br />
            To get started, edit <code>src/App.js</code> and save to reload. <br />
            To get started, edit <code>src/App.js</code> and save to reload. <br />
            To get started, edit <code>src/App.js</code> and save to reload. <br />
            To get started, edit <code>src/App.js</code> and save to reload. <br />
          </ScrollableParagraph>
        )}
      </div>
    );
  }
}

export default App;
