import CookieUtils from "./CookieUtils";
import ApiUtils from "./ApiUtils";

const FetchUtils = {
  get: (path) => {
    return fetch(ApiUtils.getServerUrl(path), {
      method: 'GET',
      credentials: 'include',
    });
  },
  post: (path, dataObj) => {
    return fetch(ApiUtils.getServerUrl(path), {
      method: 'POST',
      credentials: 'include',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObj)
    });
  },
  authorizedGet: (path) => {
    const accessToken = CookieUtils.getCookie('accessToken');
    return fetch(ApiUtils.getServerUrl(path), {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
  },
  authorizedPostWithRequestData: (path, dataObj) => {
    const accessToken = CookieUtils.getCookie('accessToken');
    return fetch(ApiUtils.getServerUrl(path), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    });
  },
  authorizedUpdateWithRequestData: (path, dataObj) => {
    const accessToken = CookieUtils.getCookie('accessToken');
    return fetch(ApiUtils.getServerUrl(path), {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    });
  },
  authorizedDeleteWithRequestData: (path, dataObj) => {
    const accessToken = CookieUtils.getCookie('accessToken');
    return fetch(ApiUtils.getServerUrl(path), {
      method: 'DELETE',
      credentials: 'include',
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