import { fetchData, refreshToken } from '../helpers';

export const userService = {
  login,
  getInfo,
  create,
  changePass,
  getAccountList,
  getListClient,
  getAccountByType,
  sendOTP,
  resetPassword,
};

/**
 *
 * @param {Object} data.username
 * @param {Object} data.password
 */
function login(data) {
  return fetchData({
    path: '/auth/login',
    method: 'post',
    data
  });
}

async function create(data) {
  const resultData = await fetchData({
    path: '/client',
    method: 'post',
    data
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/user',
        method: 'post',
        data
      });
    }
  }

  return resultData;
}

async function getListClient() {
  const resultData = await fetchData({
    path: '/client',
    method: 'get'
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/client',
        method: 'get'
      });
    }
  }

  return resultData;
}

async function changePass(data) {
  const result = await fetchData({
    path: '/auth/change/password',
    method: 'post',
    data
  });
  return result;
}

async function getAccountList() {
  const userInfo = JSON.parse(localStorage.getItem('user'));

  const result = await fetchData({
    path: `/user/all/${userInfo.username}`,
    method: 'get'
  });

  // check expire token
  if (result && result.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/user/all/${userInfo.username}`,
        method: 'get'
      });
    }
  }

  return result;
}

async function getAccountByType(username, type) {
  const resultData = await fetchData({
    path: `/user/${type}/${username}`,
    method: 'get'
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/user/${type}/${username}`,
        method: 'get'
      });
    }
  }

  return resultData;
}

async function getInfo(username) {
  const resultData = await fetchData({
    path: `/user/${username}`,
    method: 'get'
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/user/${username}`,
        method: 'get'
      });
    }
  }

  return resultData;
}

async function sendOTP(username) {
  const resultData = await fetchData({
    path: `/auth/service/otp/${username}`,
    method: 'get'
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/auth/service/otp/${username}`,
        method: 'get'
      });
    }
  }

  return resultData;
}

async function resetPassword(data) {
  const resultData = await fetchData({
    path: `/auth/reset`,
    method: 'put',
    data
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/auth/reset`,
        method: 'put'
      });
    }
  }

  return resultData;
}