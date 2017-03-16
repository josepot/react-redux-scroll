// Action types
export const SCROLL_TO_PARAGRAPH = 'SCROLL_TO_PARAGRAPH';
export const SCROLL_TO_HEADER = 'SCROLL_TO_HEADER';

// Action Creators
export const scrollToParagraph = paragraphId => ({
  type: SCROLL_TO_PARAGRAPH,
  paragraphId,
});
export const scrollToHeader = () => ({ type: SCROLL_TO_HEADER });
