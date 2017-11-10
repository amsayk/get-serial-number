import { SET_SERIALNUMBER } from './constants';

import Store from 'utils/Store';

import sn from 'serial-number';

export function calcSerialNumber() {
  return dispatch => {
    sn(function(err, serialnumber) {
      // Store for later use
      Store.set('serialnumber', serialnumber);

      dispatch({
        type: SET_SERIALNUMBER,
        serialnumber,
      });
    });
  };
}
