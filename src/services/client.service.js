import { fetchData, refreshToken } from '../helpers';

export const clientService = {
  getInfoByTK
};

async function getInfoByTK(id) {
  const resultData = await fetchData({
    path: '/client/tktt/' + id,
    method: 'get'
  });

  // check expire token
  if (resultData && resultData.status === 403) {
    const result = await refreshToken();
    if (result) {
      return await fetchData({
        path: '/client/tktt/' + id,
        method: 'get'
      });
    }
  }

  return resultData;
}
