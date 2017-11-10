import { INIT } from 'vars';

import { SET_SERIALNUMBER } from './constants';

import Store from 'utils/Store';

import { Record } from 'immutable';

export class AppState extends Record({
  serialnumber: null,
}) {}

const initialState = new AppState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SERIALNUMBER: {
      return state.merge({
        serialnumber: action.serialnumber,
      });
    }
    case INIT: {
      return state.merge({
        serialnumber: Store.get('serialnumber', null),
      });
    }
    default:
      return state;
  }
}
