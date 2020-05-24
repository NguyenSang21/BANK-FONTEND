import { fetchData, refreshToken } from '../helpers';

export const transactionService = {
  getAll,
  getTransByUser,
  internalTrans,
  externalTrans,
  getOTP
};

async function getAll(bankA, bankB, startDay, endDay) {
  const resultData = await fetchData({
    path: `/trans?bankA=${bankA}&bankB=${bankB}&startDay=${startDay}&endDay${endDay}`,
    method: 'get'
  });

  // check expire token
  if (resultData && resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/trans?bankA=${bankA}&bankB=${bankB}&startDay=${startDay}&endDay${endDay}`,
        method: 'get'
      });
    }
  }

  return resultData;
}

async function internalTrans(data) {
  const resultData = await fetchData({
    path: '/trans/internal',
    method: 'post',
    data
  });

  // check expire token
  if (resultData && resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/trans/internal',
        method: 'post',
        data
      });
    }
  }

  return resultData;
}

async function externalTrans(data) {
  const resultData = await fetchData({
    path: '/trans/bcc/external',
    method: 'post',
    data
  });

  // check expire token
  if (resultData && resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/trans/bcc/external',
        method: 'post',
        data
      });
    }
  }

  return resultData;
}

async function getTransByUser(username) {
  const resultData = await fetchData({
    path: `/trans/${username}`,
    method: 'get'
  });

  // check expire token
  if (resultData && resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/trans/${username}`,
        method: 'get'
      });
    }
  }

  return resultData;
}

async function getOTP(username, data) {
  const resultData = await fetchData({
    path: `/trans/otp/${username}`,
    method: 'post',
    data
  });

  // check expire token
  if (resultData && resultData.status === 401) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: `/trans/otp/${username}`,
        method: 'post',
        data
      });
    }
  }

  return resultData;
}
