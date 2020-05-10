import Axios from 'axios';
import moment from 'moment';
import config from '../config';
import { message } from 'antd';

const sha512 = require('js-sha512').sha512;

export const externalService = {
  getRecipientInfo
}

async function getRecipientInfo(bankName, bodyData, agentSecretKey) {

  //const url = `api/v1/${bankName.toLowerCase()}/truyvanthongtin`
  const url = `api/v1/bbc/truyvanthongtin`
  const ts =  moment().valueOf()
  const joinData = [url, ts, JSON.stringify(bodyData), agentSecretKey].join("|")
  const signature = sha512(joinData)

  const requestOptions = {
    method: 'post',
    // url: `${config.apiUrl}/${bankName.toLowerCase()}/truyvanthongtin`,
    url: `${config.apiUrl}/bbc/truyvanthongtin`,
    headers: {
      'ts': ts,
      'api_signature': signature,
      'agent_code': bankName
    },
    data: bodyData
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
    // check if expire token . Call refresh token
    if (error.response && error.response.status) {
      const statusCode = error.response.status;

      switch (statusCode) {
        case 403: // expire token
          break;
        case 401: // Unauthorized
          // nothing to do
          break;
        case 406:
          message.error(
            (error.response &&
              // eslint-disable-next-line no-mixed-operators
              error.response.message_text) ||
              'Resource Not Found!'
          );
          break;
        default:
          // show error to user interface
          message.error(
            (error.response.data &&
              // eslint-disable-next-line no-mixed-operators
              error.response.data.result_message) ||
              'Resource Not Found!'
          );
          break;
      }
    }
    return error.response;
  })
}