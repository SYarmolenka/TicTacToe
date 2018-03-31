export const CHANGE_MODE = 'CHANGE_MODE';
export const CHANGE_USE_DATA = 'CHANGE_USE_DATA';
export const UPDATE = 'UPDATE';

export const changeMode = (mode) => ({
  type: CHANGE_MODE,
  payload: mode
});

export const userData = (name, value) => ({
  type: CHANGE_USE_DATA,
  name,
  value
});

export const updateMode = (obj) => ({
  type: UPDATE,
  payload: obj
});
