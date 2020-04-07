import { fetchData, refreshToken } from '../helpers';

export const bankService = {
  getBankList
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
