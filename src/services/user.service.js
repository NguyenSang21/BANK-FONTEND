import { fetchData } from "../helpers";

export const userService = {
  login
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
