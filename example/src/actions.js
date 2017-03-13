export const JUMP_TO_PARAGRAPH = 'JUMP_TO_PARAGRAPH';
export const JUMP_TO_HEADER = 'JUMP_TO_HEADER';

export const jumpToParagraph = id => ({ type: JUMP_TO_PARAGRAPH, payload: id });
export const jumpToHeader = () => ({ type: JUMP_TO_HEADER });
