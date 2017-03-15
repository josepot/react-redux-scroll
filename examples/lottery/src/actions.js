// Action types
export const DIGIT_DISPLAYED = 'DIGIT_DISPLAYED';
export const MAX_RANGE_CHANGED = 'MAX_RANGE_CHANGED';
export const NUMBER_GENERATED = 'NUMBER_GENERATED';
export const RESET = 'RESET';

// Action Creators
export const onDisplayDigit = () => ({ type: DIGIT_DISPLAYED });

export const onMaxRangeChange = newMaxRange => ({
  type: MAX_RANGE_CHANGED, payload: newMaxRange,
});

export const onGenerateNumber = (range) => {
  const numbers = Math.floor(Math.random() * (range + 1))
    .toString(10)
    .split('');

  const missingZeros = range.toString(10).length - numbers.length;
  for (let i = 0; i < missingZeros; i += 1) numbers.unshift('0');

  return { type: NUMBER_GENERATED, payload: numbers.join('') };
};

export const onReset = () => ({ type: RESET });
