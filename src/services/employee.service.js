import { fetchData, refreshToken } from '../helpers';

export const employeeService = {
  getAll,
  topup,
  unlock,
  lock
};

async function getAll() {
  const resultData = await fetchData({
    path: '/employee',
    method: 'get'
  });

  // check expire token
  if (resultData && resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/employee',
        method: 'get'
      });
    }
  }

  return resultData;
}

async function topup(data) {
  const resultData = await fetchData({
    path: '/employee/topup',
    method: 'post',
    data
  });

  // check expire token
  if (resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/employee/topup',
        method: 'post',
        data
      });
    }
  }

  return resultData;
}

async function lock(id) {
  const resultData = await fetchData({
    path: `/employee/lock/${id}`,
    method: 'put'
  });

  // check expire token
  if (resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/employee/lock/${id}`,
        method: 'put',
      });
    }
  }

  return resultData;
}

async function unlock(id) {
  const resultData = await fetchData({
    path: `/employee/unlock/${id}`,
    method: 'post'
  });

  // check expire token
  if (resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/employee/unlock/${id}`,
        method: 'post',
      });
    }
  }

  return resultData;
}