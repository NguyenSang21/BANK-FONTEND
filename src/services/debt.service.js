import { fetchData, refreshToken } from '../helpers';

export const debtService = {
  create,
  getDebtList,
};

async function create(data) {
  const resultData = await fetchData({
    path: '/debt',
    method: 'post',
    data
  });

  // check expire token
  if (resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/debt',
        method: 'post',
        data
      });
    }
  }

  return resultData
}

async function getDebtList(username) {
  const resultData = await fetchData({
    path: `/debt/${username}`,
    method: 'get'
  });

  // check expire token
  if (resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/debt/${username}`,
        method: 'get'
      });
    }
  }

  return resultData
}