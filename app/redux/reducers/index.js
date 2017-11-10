import app from './app/reducer';
import snackbar from './snackbar/reducer';
import intl from './intl/reducer';

import { combineReducers } from 'redux-immutable';

const reducers = {
  app,
  snackbar,
  intl,
};

export default combineReducers({
  ...reducers,
});
