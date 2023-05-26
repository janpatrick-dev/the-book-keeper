const LocalStorageUtils = {
  get: (key) => {
    return localStorage.getItem(key);
  },
  set: (key, value) => {
    localStorage.setItem(key, value);
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  getParsed: (key) => {
    return JSON.parse(localStorage.getItem(key));
  }
}

export default LocalStorageUtils;