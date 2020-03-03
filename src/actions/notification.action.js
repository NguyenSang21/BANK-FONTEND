import { notificationConstants } from '../constants';

export const notificationActions = {
  failure,
  success
};

function failure(message) {
  return { type: notificationConstants.NOTIF_FAILURE, message };
}

function success(message) {
  return { type: notificationConstants.NOTIF_SUCCESS, message };
}