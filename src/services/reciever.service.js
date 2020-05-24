import { fetchData, refreshToken } from '../helpers';

export const recieverService = {
  getReciverList,
  createReciver,
  updateReciver,
  deleteReciver
};

async function getReciverList(username) {
  const resultData = await fetchData({
    path: '/reciever/' + username,
    method: 'get'
  });

  // check expire token
  if (resultData && resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/reciever/' + username,
        method: 'get'
      });
    }
  }

  return resultData;
}

async function createReciver(data) {
  const resultData = await fetchData({
    path: '/reciever',
    method: 'post',
    data
  });

  // check expire token
  if (resultData && resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/reciever',
        method: 'post',
        data
      });
    }
  }

  return resultData;
}

async function updateReciver(username, data) {
  const resultData = await fetchData({
    path: `/reciever/${username}`,
    method: 'put',
    data
  });

  // check expire token
  if (resultData && resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/reciever/${username}`,
        method: 'put',
        data
      });
    }
  }

  return resultData;
}

async function deleteReciver(username, data) {
  const resultData = await fetchData({
    path: `/reciever/${username}`,
    method: 'delete',
    data
  });

  // check expire token
  if (resultData && resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/reciever/${username}`,
        method: 'delete',
        data
      });
    }
  }

  return resultData;
}