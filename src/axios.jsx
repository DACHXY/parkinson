import _axios from 'axios';

const defaultBaseURL = '0.0.0.0';

function axios(baseURL) {
  const instance = _axios.create({
    baseURL: baseURL || defaultBaseURL,
    timeout: 1000,
  });
  return instance;
}

export { axios };
export default axios();
