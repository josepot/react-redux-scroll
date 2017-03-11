export const JUMP_TO = 'JUMP_TO';
export const JUMP_TO_LAST = 'JUMP_TO_LAST';

export const jumpTo = idx => ({ type: JUMP_TO, payload: idx });
export const jumpToLast = () => ({ type: JUMP_TO_LAST });
