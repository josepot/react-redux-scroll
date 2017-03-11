import IdsManager from './ids-manager';

const idsManager = new IdsManager();
const onGoingScrolls = {};

// Thanks to:
// http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
const EASING_FUNCTIONS = {
  LINEAR: t => t,
  EASE_IN_QUAD: t => t * t,
  EASE_OUT_QUAD: t => t * (2 - t),
  EASE_IN_OUT_QUAD: t => (t < 0.5 ?
    2 * t * t :
    -1 + ((4 - (2 * t)) * t)
  ),
  EASE_IN_CUBIC: t => t ** 3,
  EASE_OUT_CUBIC: t => ((t - 1) ** 3) + 1,
  EASE_IN_OUT_CUBIC: t => (t < 0.5 ?
    4 * (t ** 3) :
    ((t - 1) * ((2 * t) - 2) * ((2 * t) - 2)) + 1
  ),
  EASE_IN_QUART: t => t ** 4,
  EASE_OUT_QUART: t => 1 - ((t - 1) ** 4),
  EASE_IN_OUT_QUART: t => (t < 0.5 ?
    8 * (t ** 4) :
    1 - (8 * ((t - 1) ** 4))
  ),
};

const getCurrentPosition = (from, to, startTime, duration, fn) => {
  const percentageTime = (Date.now() - startTime) / duration;
  if (percentageTime >= 1) return to;

  const percentagePosition = fn(percentageTime);
  return {
    x: from.x + ((to.x - from.x) * percentagePosition),
    y: from.y + ((to.y - from.y) * percentagePosition),
  };
};

const requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
  (fn => window.setTimeout(fn, 20));

const cancelAnimationFrame = window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
  (id => window.clearTimeout(id));

const findUsedIdByContext = context => Object.keys(onGoingScrolls)
  .find(key => onGoingScrolls[key].context === context);

const clearEntry = (id, isCancellation) => {
  idsManager.releaseId(id);
  if (isCancellation) cancelAnimationFrame(onGoingScrolls[id].animationId);
  onGoingScrolls[id].onEnd(isCancellation);
  delete onGoingScrolls[id];
};

const clearCompetingScrolls = (context) => {
  const id = findUsedIdByContext(context);
  if (id) clearEntry(id, true);
};

const getEntity = (context, onEnd) => {
  clearCompetingScrolls(context);
  const id = idsManager.getNewId();
  onGoingScrolls[id] = { id, context, onEnd };
  return onGoingScrolls[id];
};

export default (
  target,
  context = window,
  onEnd = () => null,
  {
    duration = 500,
    easingFunction = 'EASE_IN_OUT_CUBIC',
    xAlignment = null,
    xMargin = 0,
    yAlignment = 'TOP',
    yMargin = 0,
  } = {}
) => {
  const entity = getEntity(context, onEnd);
  const from = {
    x: context.scrollLeft || window.pageXOffset,
    y: context.scrollTop || window.pageYOffset,
  };
  const targetRect = target.getBoundingClientRect();
  const contextWidth = context === window ?
    window.innerWidth :
    context.getBoundingClientRect().width;
  const contextHeight = context === window ?
    window.innerHeight :
    context.getBoundingClientRect().height;

  const to = {
    x: (
      xAlignment === 'LEFT'  ? targetRect.left : // eslint-disable-line no-multi-spaces
      xAlignment === 'RIGHT' ? targetRect.right - contextWidth :
                               0
    ) + from.x + xMargin,
    y: (
      yAlignment === 'TOP'    ? targetRect.top : // eslint-disable-line no-multi-spaces
      yAlignment === 'BOTTOM' ? targetRect.bottom - contextHeight :
                                0
    ) + from.y + yMargin,
  };

  const scrollTo = context === window ?
    window.scroll.bind(window) :
    (x, y) => {
      context.scrollLeft = x; // eslint-disable-line no-param-reassign
      context.scrollTop = y; // eslint-disable-line no-param-reassign
    };

  const movementFn = typeof easingFunction === 'function' ?
    easingFunction :
    (EASING_FUNCTIONS[easingFunction] || EASING_FUNCTIONS.EASE_IN_OUT_CUBIC);

  const start = Date.now();

  const scroll = () => {
    const currentPosition =
      getCurrentPosition(from, to, start, duration, movementFn);
    scrollTo(currentPosition.x, currentPosition.y);
    if (currentPosition.x === to.x && currentPosition.y === to.y) {
      clearEntry(entity.id, false);
    } else {
      entity.animationId = requestAnimationFrame(scroll);
    }
  };
  scroll();

  return () => clearEntry(entity.id, true);
};
