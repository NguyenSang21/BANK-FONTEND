import config from '../config'
import Axios from 'axios';
import { message } from 'antd';

const ACCESS_HEADERS = {
  'Content-Type': 'application/json'
};

/**
 * @param {Object} Object.params
 * @param {Object} Object.data
 * @param {Object} Object.method
 * @param {Object} Object.path
 */
export const fetchData = ({ path, method, data, params }) => {
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
        return res.data
      }
    })
    .catch(error => {
      console.log(error.response);
      // show error to user interface
      message.error(
        (error.response &&
          error.response.data &&
          // eslint-disable-next-line no-mixed-operators
          error.response.data.message) ||
        'Resource Not Found!'
      );
    })
    .finally(() => {
      // always executed
    });
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