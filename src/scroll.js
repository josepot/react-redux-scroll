const onGoingScrolls = new WeakMap();

// Thanks to:
// http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
export const TIMING_FUNCTIONS = {
  LINEAR: t => t,
  EASE_IN_QUAD: t => t * t,
  EASE_OUT_QUAD: t => t * (2 - t),
  EASE_IN_OUT_QUAD: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  EASE_IN_CUBIC: t => Math.pow(t, 3),
  EASE_OUT_CUBIC: t => Math.pow(t - 1, 3) + 1,
  EASE_IN_OUT_CUBIC: t =>
    t < 0.5 ? 4 * Math.pow(t, 3) : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  EASE_IN_QUART: t => Math.pow(t, 4),
  EASE_OUT_QUART: t => 1 - Math.pow(t - 1, 4),
  EASE_IN_OUT_QUART: t =>
    t < 0.5 ? 8 * Math.pow(t, 4) : 1 - 8 * Math.pow(t - 1, 4)
};

export const ALIGNMENTS = Object.freeze({
  CENTER: 'CENTER',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  TOP: 'TOP',
  BOTTOM: 'BOTTOM'
});

const getCurrentPosition = (from, to, startTime, duration, fn) => {
  const percentageTime =
    duration === 0 ? 1 : (Date.now() - startTime) / duration;
  if (percentageTime >= 1) return to;

  const percentagePosition = fn(percentageTime);
  return {
    x: from.x + (to.x - from.x) * percentagePosition,
    y: from.y + (to.y - from.y) * percentagePosition
  };
};

const requestAnimationFrame = animationFn =>
  (window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    (fn => window.setTimeout(fn, 20)))(animationFn);

const cancelAnimationFrame = animationId =>
  (window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    (id => window.clearTimeout(id)))(animationId);

const clearEntry = (context, isCancellation) => {
  const { animationId, onEnd } = onGoingScrolls.get(context);
  if (isCancellation) cancelAnimationFrame(animationId);
  onEnd(isCancellation);
  onGoingScrolls.delete(context);
};

const getEntity = (context, onEnd) => {
  if (onGoingScrolls.has(context)) {
    clearEntry(context, true);
  }
  const entity = { onEnd };
  onGoingScrolls.set(context, entity);
  return entity;
};

export default (
  target,
  ctx,
  onEnd = () => null,
  {
    duration = 500,
    transitionTimingFunction = 'EASE_IN_QUAD',
    xAlignment = null,
    xMargin = 0,
    yAlignment = 'TOP',
    yMargin = 0
  } = {}
) => {
  const context = ctx || window;
  const entity = getEntity(context, onEnd);

  const from =
    context === window
      ? { x: window.pageXOffset, y: window.pageYOffset }
      : { x: context.scrollLeft, y: context.scrollTop };

  const contextRect =
    context === window
      ? {
          width: window.innerWidth,
          height: window.innerHeight,
          left: 0,
          top: 0,
          scrollLeft: 0,
          scrollTop: 0
        }
      : context.getBoundingClientRect();

  const targetRect = target.getBoundingClientRect();

  const to = {
    x:
      (xAlignment === ALIGNMENTS.CENTER
        ? targetRect.left + (targetRect.width - contextRect.width) / 2
        : xAlignment === ALIGNMENTS.LEFT
          ? targetRect.left // eslint-disable-line no-multi-spaces
          : xAlignment === ALIGNMENTS.RIGHT
            ? targetRect.right - contextRect.width
            : contextRect.left) +
      from.x -
      (contextRect.left + xMargin),
    y:
      (yAlignment === ALIGNMENTS.CENTER
        ? targetRect.top + (targetRect.height - contextRect.height) / 2
        : yAlignment === ALIGNMENTS.TOP
          ? targetRect.top // eslint-disable-line no-multi-spaces
          : yAlignment === ALIGNMENTS.BOTTOM
            ? targetRect.bottom - contextRect.height
            : contextRect.top) +
      from.y -
      (contextRect.top + yMargin)
  };

  const scrollTo =
    context === window
      ? window.scroll.bind(window)
      : (x, y) => {
          context.scrollLeft = x; // eslint-disable-line no-param-reassign
          context.scrollTop = y; // eslint-disable-line no-param-reassign
        };

  const timingFn =
    typeof transitionTimingFunction === 'function'
      ? transitionTimingFunction
      : TIMING_FUNCTIONS[transitionTimingFunction] ||
        TIMING_FUNCTIONS.EASE_IN_QUAD;

  const start = Date.now();

  const scroll = () => {
    const currentPosition = getCurrentPosition(
      from,
      to,
      start,
      duration,
      timingFn
    );
    scrollTo(currentPosition.x, currentPosition.y);
    if (currentPosition.x === to.x && currentPosition.y === to.y) {
      clearEntry(context, false);
    } else {
      entity.animationId = requestAnimationFrame(scroll);
    }
  };
  scroll();
  return () => clearEntry(context, true);
};
