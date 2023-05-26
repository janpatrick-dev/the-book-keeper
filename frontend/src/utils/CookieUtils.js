const CookieUtils = {
  getCookie: (key) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  },
  setCookie: (key, value, minutes) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (minutes * 60 * 1000));
    document.cookie = `${key}=${value}; expires=${expirationDate.toUTCString()}; path=/;`;
  },
  removeCookie: (key) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
  setAccessToken: (token) => {
    CookieUtils.setCookie(
      'accessToken', 
      token, 
      process.env.REACT_APP_ACCESS_TOKEN_EXPIRY
    );
  }
}

export default CookieUtils;