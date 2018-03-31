export default (name, data) => {
  if (!name) return window.localStorage.clear();
  if (!data) {
    return new Promise((resolve, reject) => {
      const data = window.localStorage.getItem(`tictactoe_${name}`);
      console.log(`tictactoe_${name}`);
      data ? resolve(JSON.parse(data)) : reject('No data');
    });
  } else {
    window.localStorage.setItem(`tictactoe_${name}`, JSON.stringify(data));
  };
};
