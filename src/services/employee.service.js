import { fetchData, refreshToken } from '../helpers';

export const employeeService = {
  getAll, 
  topup,
};

async function getAll() {
  const resultData = await fetchData({
    path: '/employee',
    method: 'get'
  });

  // check expire token
  if (resultData && resultData.status === 403) {
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
  if (resultData.status === 403) {
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