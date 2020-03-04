import { notification as notifAntd } from 'antd';
import { notificationConstants } from '../constants';

const initialState = {};
/**
 *
 * @param {Object} state
 * @param {Object} action
 */
export const notification = (state = initialState, action) => {
  switch (action.type) {
    case notificationConstants.NOTIF_SUCCESS:
      notifAntd.success({
        message: 'Thông báo',
        description: action.message
      });
      return { status: true };
    case notificationConstants.NOTIF_FAILURE:
      notifAntd.error({
        message: 'Thông báo',
        description: action.message
      });
      return { status: false };
    default:
      return state;
  }
};
