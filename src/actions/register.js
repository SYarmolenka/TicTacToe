export const CHANGE_REG = 'CHANGE_REG';

export const change = (name, value) => ({
  type: CHANGE_REG,
  name,
  value
});
