export const PLAYER_STEP = 'PLAYER_STEP';
export const SET_MODE = 'SET_MODE';
export const UPDATE = 'UPDATE';
export const CHANGE_DATA = 'CHANGE_DATA';

export const playerStep = (x, y, field) => ({
  type: PLAYER_STEP,
  x,
  y,
  field
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

export const changeData = (name, value) => ({
  type: CHANGE_DATA,
  name,
  value
});
