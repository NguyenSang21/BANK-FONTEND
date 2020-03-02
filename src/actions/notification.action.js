import { notificationConstants } from '../constants';

export const loadingActions = {
  failure,
  success
};

function failure() {
  return { type: notificationConstants.NOTIF_FAILURE };
}

function success() {
  return { type: notificationConstants.NOTIF_SUCCESS };
}