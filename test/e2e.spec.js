import * as React from 'react';
import TestRenderer from 'react-test-renderer';
import { applyMiddleware, createStore } from 'redux';
import {
  TIMING_FUNCTIONS,
  scrollableArea,
  scrollToWhen,
  createScrollMiddleware
} from '../src';

window.scroll = (x, y) => {
  window.pageXOffset = x;
  window.pageYOffset = y;
};

const store = createStore(
  () => [],
  [],
  applyMiddleware(createScrollMiddleware())
);

const ACTION = 'MOVE_TO';
const moveTo = idx => ({ type: ACTION, idx });

const Area = scrollableArea('div');

const TestComponent = ({ withScrollabeArea, Scrollable }) => {
  const Wrapper = withScrollabeArea ? Area : React.Fragment;
  return (
    <Wrapper>
      <Scrollable id={0} data-id={0} ref={Function.prototype} />
      <Scrollable id={1} data-id={1} ref={Function.prototype} />
      <Scrollable id={2} data-id={2} ref={Function.prototype} />
      <Scrollable id={3} data-id={3} ref={Function.prototype} />
      <Scrollable id={4} data-id={4} ref={Function.prototype} />
      <Scrollable id={5} data-id={5} ref={Function.prototype} />
    </Wrapper>
  );
};

const prepareTest = (withScrollabeArea, scrollOptions, onEnd) => {
  window.pageXOffset = 0;
  window.pageYOffset = 0;
  window.innerWidth = 100;
  window.innerHeight = 100;
  const Scrollable = scrollToWhen(
    ({ type, idx }, { id }) => type === ACTION && idx === id,
    onEnd,
    scrollOptions,
    ['id']
  )('p');
  let context = window;
  return TestRenderer.create(
    <TestComponent
      Scrollable={Scrollable}
      withScrollabeArea={withScrollabeArea}
    />,
    {
      createNodeMock: element => {
        if (element.type === 'div') {
          return (context = {
            getBoundingClientRect: () => ({
              top: 0,
              bottom: 100,
              left: 0,
              right: 100,
              height: 100,
              width: 100
            }),
            scrollLeft: 0,
            scrollTop: 0
          });
        } else if (element.type === 'p') {
          const id = element.props['data-id'];
          return {
            getBoundingClientRect: () => {
              const scrollTop =
                context === window ? context.pageYOffset : context.scrollTop;
              return {
                top: id * 100 - scrollTop,
                bottom: (id + 1) * 100,
                left: 0,
                right: 100,
                height: 100,
                width: 100
              };
            }
          };
        }
        return null;
      }
    }
  );
};

const wait = ms => new Promise(res => setTimeout(res, ms));

describe('react-redux-scroll', () => {
  it('duration 0', () => {
    prepareTest(false, { duration: 0 });
    expect(window.pageYOffset).toBe(0);
    store.dispatch(moveTo(3));
    expect(window.pageYOffset).toBe(300);

    const { root } = prepareTest(true, { duration: 0 });
    const area = root.findByType(Area);
    expect(area.instance._domNode.scrollTop).toBe(0);
    store.dispatch(moveTo(3));
    expect(area.instance._domNode.scrollTop).toBe(300);
  });

  it('duration 200', async () => {
    const { root } = prepareTest(true, {
      duration: 200,
      transitionTimingFunction: TIMING_FUNCTIONS.LINEAR
    });
    const area = root.findByType(Area);

    expect(area.instance._domNode.scrollTop).toBe(0);
    store.dispatch(moveTo(5));
    let scrollTop = await wait(110).then(
      () => area.instance._domNode.scrollTop
    );
    expect(scrollTop).toBeGreaterThanOrEqual(240);
    expect(scrollTop).toBeLessThan(275);
    scrollTop = await wait(100).then(() => area.instance._domNode.scrollTop);
    expect(scrollTop).toBe(500);
  });

  it('cancell scroll', async () => {
    const { root } = prepareTest(true, {
      duration: 200,
      transitionTimingFunction: TIMING_FUNCTIONS.LINEAR
    });
    const area = root.findByType(Area);

    expect(area.instance._domNode.scrollTop).toBe(0);
    store.dispatch(moveTo(5));
    let scrollTop = await wait(110).then(
      () => area.instance._domNode.scrollTop
    );
    expect(scrollTop).toBeGreaterThanOrEqual(240);
    expect(scrollTop).toBeLessThan(275);
    store.dispatch(moveTo(1));
    scrollTop = await wait(210).then(() => area.instance._domNode.scrollTop);
    expect(scrollTop).toBe(100);
  });
});
