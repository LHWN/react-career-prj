import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as AuthAPI from '../../lib/api/auth';

const CHANGE_INPUT = 'auth/CHANGE_INPUT'; // input 값 변경
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화
const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS'; // 이메일 중복 확인
const CHECK_USERNAME_EXISTS = 'auth/CHECK_USERNAME_EXISTS'; // 아이디 중복 확인
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER'; // 이메일 가입
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN'; // 이메일 로그인

const LOGOUT = 'auth/LOGOUT'; // 로그아웃

const SET_ERROR = 'auth/SET_ERROR'; // 오류 설정

export const changeInput = createAction(CHANGE_INPUT);
export const initializeForm = createAction(INITIALIZE_FORM);

export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists);
export const checkUsernameExists = createAction(CHECK_USERNAME_EXISTS, AuthAPI.checkUsernameExists);

export const localRegister = createAction(LOCAL_REGISTER, AuthAPI.localRegister);
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin);

export const logout = createAction(LOGOUT, AuthAPI.logout);

export const setError = createAction(SET_ERROR);

const initialState = Map({
  register: Map({
    form: Map({
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    }),
    exists: Map({
      email: false,
      username: false
    }),
    error: null
  }),
  login: Map({
    form: Map({
      email: '',
      password: ''
    }),
    exists: Map({
      email: false
    }),
    error: null
  }),
  result: Map({})
});

// Reducer
export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { form, name, value } = action.payload;
      return state.setIn([form, 'form', name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
      const initialForm = initialState.get(action.payload);
      console.log('initiallizeForm');
      return state.set(action.payload, initialForm);
    },
    [SET_ERROR]: (state, action) => {
      const { form, message } = action.payload;
      return state.setIn([form, 'error'], message);
    },
    ...pender({
      type: CHECK_EMAIL_EXISTS,
      onSuccess: (state, action) => state.setIn(['login', 'exists', 'email'], action.payload.data.exists)
    }),
    ...pender({
      type: CHECK_USERNAME_EXISTS,
      onSuccess: (state, action) => state.setIn(['register', 'exists', 'username'], action.payload.data.exists)
    }),
    ...pender({
      type: LOCAL_LOGIN,
      onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
    ...pender({
      type: LOCAL_REGISTER,
      onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    })
  },
  initialState
);
