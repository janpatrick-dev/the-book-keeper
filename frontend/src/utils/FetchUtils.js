import CookieUtils from "./CookieUtils";

const FetchUtils = {
  authorizedGet: (path) => {
    const accessToken = CookieUtils.getCookie('accessToken');
    return fetch(path, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
  },
  authorizedPostWithRequestData: (path, dataObj) => {
    const accessToken = CookieUtils.getCookie('accessToken');
    return fetch(path, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    });
  },
  authorizedDeleteWithRequestData: (path, dataObj) => {
    const accessToken = CookieUtils.getCookie('accessToken');
    return fetch(path, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    });
  },
  // fetchNoAuthWithRequestData: (path, method, dataObj) => {
  //   return fetch(path, { 
  //     method,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(dataObj)
  //   });
  // }
}

export default FetchUtils;