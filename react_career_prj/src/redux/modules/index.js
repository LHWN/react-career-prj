import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import crawl from './crawl';

import { penderReducer } from 'redux-pender';

export default combineReducers({
  base,
  auth,
  user,
  crawl,
  pender: penderReducer
});
