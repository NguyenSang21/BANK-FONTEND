import { fetchData, refreshToken } from '../helpers';

export const debtService = {
  create,
  getDebtList,
  removeDebt,
};

async function create(data) {
  const resultData = await fetchData({
    path: '/debt',
    method: 'post',
    data
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/debt',
        method: 'post',
        data
      });
    }
  }

  return resultData;
}

async function getDebtList(username) {
  const resultData = await fetchData({
    path: `/debt/${username}`,
    method: 'get'
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/debt/${username}`,
        method: 'get'
      });
    }
  }

  return resultData;
}

async function removeDebt(id, data) {
  const resultData = await fetchData({
    path: `/debt/${id}`,
    method: 'delete',
    data
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/debt/${id}`,
        method: 'delete'
      });
    }
  }

  return resultData;
}