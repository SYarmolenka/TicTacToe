export const PLAYER_STEP = 'PLAYER_STEP';
export const SET_MODE = 'SET_MODE';
export const UPDATE = 'UPDATE';

export const playerStep = (x, y) => ({
  type: PLAYER_STEP,
  x,
  y
});

export const updateGame = (obj) => ({
  type: UPDATE,
  payload: obj
});

export const setMode = (name, value) => ({
  type: SET_MODE,
  name,
  value
});
