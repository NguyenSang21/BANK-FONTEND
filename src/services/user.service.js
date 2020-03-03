import { fetchData, refreshToken } from "../helpers";

export const userService = {
  login,
  create
}

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
  })
}

async function create(data) {
  const resultData = await fetchData({
    path: '/user',
    method: 'post',
    data
  })

  // check expire token 
  if(resultData.status === 401) {
    const result = await refreshToken()
    if(result) {
      return fetchData({
        path: '/user',
        method: 'post',
        data
      })
    }
  }
}