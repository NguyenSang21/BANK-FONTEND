import { fetchData, refreshToken } from '../helpers';

export const bankService = {
  getBankList,
  getBankByAgentCode
};

async function getBankList() {
  const resultData = await fetchData({
    path: '/bank',
    method: 'get'
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/bank',
        method: 'get'
      });
    }
  }

  return resultData;
}

async function getBankByAgentCode(bankName) {
  const resultData = await fetchData({
    path: `/bank/${bankName}`,
    method: 'get'
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/bank/${bankName}`,
        method: 'get'
      });
    }
  }

  return resultData;
}
