const ApiUtils = {
  getServerUrl: (path) => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    return `${SERVER_URL}${path}`;
  }
}
  

export default ApiUtils;