import Axios from 'axios';
import moment from 'moment';
import config from '../config';
import { message } from 'antd';
import { fetchData, refreshToken } from '../helpers';

const sha512 = require('js-sha512').sha512;

export const externalService = {
  getRecipientInfo,
  cashin
}

async function getRecipientInfo(bankName, bodyData, agentSecretKey) {

  //const url = `api/v1/${bankName.toLowerCase()}/truyvanthongtin`
  const url = `api/v1/truyvanthongtin`
  const ts = moment().valueOf()
  const joinData = [url, ts, JSON.stringify(bodyData), agentSecretKey].join("|")
  const signature = sha512(joinData)
  const userInfo = JSON.parse(localStorage.getItem('user'))

  const resultData = await fetchData({
    path: `/service`,
    method: 'post',
    ext_headers: {
      ts,
      agent_code: bankName,
      api_signature: signature
    },
    data: bodyData
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/service`,
        method: 'post',
        ext_headers: {
          ts,
          agent_code: bankName,
          api_signature: signature
        },
        data: bodyData
      });
    }
  }
  return resultData
}

async function cashin(bodyData) {
  const resultData = await fetchData({
    path: `/service/cashin`,
    method: 'post',
    data: bodyData
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/service/cashin`,
        method: 'post',
        data: bodyData
      });
    }
  }
  return resultData
}