export default (name, data, add) => {
  if (!name) return window.localStorage.clear();
  if (data && add) {
    Promise.resolve().then(_ => {
      let result = window.localStorage.getItem(name);
      result = result ? JSON.parse(result) : [];
      return result;
    }).then(result => {
      window.localStorage.setItem(name, JSON.stringify([...result, data]));
    });
  };
  if (!add && !data) {
    return new Promise((resolve, reject) => {
      const data = window.localStorage.getItem(name);
      data ? resolve(JSON.parse(data)) : reject('No data');
    });
  }
  if (!add && data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  };
};
