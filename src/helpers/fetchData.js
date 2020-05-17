import config from '../config';
import Axios from 'axios';
import { message } from 'antd';

/**
 * @param {Object} Object.params
 * @param {Object} Object.data
 * @param {Object} Object.method
 * @param {Object} Object.path
 * @param type
 */
export const fetchData = ({ path, method, data, params, ext_headers }, type) => {
  // get current token
  const userInfo = JSON.parse(localStorage.getItem('user')) || {};
  // headers
  let ACCESS_HEADERS = null;
  // check call refresh token or other call
  if (type === 'REFRESH_TOKEN') {
    ACCESS_HEADERS = {
      'Content-Type': 'application/json',
      'x-refresh-token': userInfo.refreshToken || '',
      username: userInfo.username
    };
  } else {
    ACCESS_HEADERS = {
      'Content-Type': 'application/json',
      'x-access-token': userInfo.accessToken || ''
    };
  }

  if (ext_headers) {
    ACCESS_HEADERS = { ...ACCESS_HEADERS, ...ext_headers}
  }

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
        if (res.data.result_code > 600) {
          message.error(res.data.result_message)
        }
        return res.data;
      }
    })
    .catch(async error => {
      console.log(error.response);
      // check if expire token . Call refresh token
      if (error.response && error.response.status) {
        const statusCode = error.response.status;

        switch (statusCode) {
          case 403: // expire token
            break;
          case 401: // Unauthorized
            // nothing to do
            break;
          default:
            // show error to user interface
            message.error(
              (error.response.data &&
                // eslint-disable-next-line no-mixed-operators
                error.response.data.message) ||
                'Resource Not Found!'
            );
            break;
        }
      }

      return error.response;
    })
    .finally(() => {
      // always executed
    });
};

export const refreshToken = async () => {
  const result = await fetchData(
    {
      method: 'get',
      path: '/auth/getNewToken'
    },
    'REFRESH_TOKEN'
  );

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
