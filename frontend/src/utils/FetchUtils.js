const FetchUtils = {
  fetchWithAuth: (path, method) => {
    return fetch(path, {
      headers: {
        'Authorization': `Bearer ${document.cookie.accessToken}`,
        'Method': method
      }
    });
  }
}

export default FetchUtils;