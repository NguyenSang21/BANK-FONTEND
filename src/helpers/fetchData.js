import config from '../config';
import Axios from 'axios';
import { message } from 'antd';

/**
 * @param {Object} Object.params
 * @param {Object} Object.data
 * @param {Object} Object.method
 * @param {Object} Object.path
 */
export const fetchData = ({ path, method, data, params }) => {
  // get current token
  const userInfo = JSON.parse(localStorage.getItem('user')) || {};
  // headers
  const ACCESS_HEADERS = {
    'Content-Type': 'application/json',
    'x-access-token': userInfo.accessToken || '',
  };

  const requestOptions = {
    method: method,
    url: `${config.apiUrl}${path}${matchParams(params || {})}`,
    headers: ACCESS_HEADERS,
    data
  };

  return Axios(requestOptions)
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Error');
      } else {
        return res.data;
      }
    })
    .catch(async error => {
      console.log(error.response);

      if (error.response) {
        // show error to user interface
        message.error(
          (error.response.data &&
            // eslint-disable-next-line no-mixed-operators
            error.response.data.message) ||
            'Resource Not Found!'
        );
      }

      return error.response;
    })
    .finally(() => {
      // always executed
    });
};

export const refreshToken = async () => {
  const result = await fetchData({
    method: 'get',
    path: '/auth/gettoken'
  });

  if (result && result.success) {
    let userInfo = JSON.parse(localStorage.getItem('user'));
    userInfo['accessToken'] = result.accessToken;
    localStorage.setItem('user', JSON.stringify(userInfo));

    return true;
  }

  return false;
};

/**
 *
 * @param {*} params
 */
const matchParams = params => {
  return `${Object.keys(params).length ? '?' : ''}${Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')}`;
};
