import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import * as AuthAPI from '../../lib/api/auth';
import { pender } from 'redux-pender';

const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO'; // 로그인 정보 설정
const SET_VALIDATED = 'user/SET_VALIDATED'; // validated 값 설정
const LOGOUT = 'user/LOGOUT'; // 로그아웃
const CHECK_STATUS = 'user/CHECK_STATUS'; // 현재 로그인 상태 확인

export const setLoggedInfo = createAction(SET_LOGGED_INFO); // loggedInfo
export const setValidated = createAction(SET_VALIDATED); // validated
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const checkStatus = createAction(CHECK_STATUS, AuthAPI.checkStatus);

const initialState = Map({
  loggedInfo: Map({
    // 현재 로그인중인 유저의 정보
    thumbnail: null,
    username: null
  }),
  logged: false, // 현재 로그인중인지 알려준다
  validated: false // 현재 로그인중인지를 서버 측의 검증을 거쳤음을 의미
});

/**
 * pender : 비동기 리덕스 액션을 관리할 때 필요하다.
 */
export default handleActions(
  {
    [SET_LOGGED_INFO]: (state, action) => state.set('loggedInfo', Map(action.payload)).set('logged', true),
    [SET_VALIDATED]: (state, action) => state.set('validated', action.payload),
    ...pender({
      type: CHECK_STATUS,
      onSuccess: (state, action) => state.set('loggedInfo', Map(action.payload.data)).set('validated', true),
      onFailure: (staet, action) => initialState
    })
  },
  initialState
);
