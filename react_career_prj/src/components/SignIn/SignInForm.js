import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import debounce from 'lodash/debounce';
import queryString from 'query-string';
import { ContactSupportOutlined } from '@material-ui/icons';

import { isEmail } from 'validator';
import storage from '../../lib/storage';
import * as authActions from '../../redux/modules/auth';
import * as userActions from '../../redux/modules/user';
import SignInError from '../../components/SignIn/SignInError';

const InsertFormPositioner = styled.div`
  /* width: 100%; */
  /* display: flex;
    justify-content: center;
    align-items: center; */

  display: flex;
  justify-content: center;
  align-items: center;

  :root {
    --color-shadow-inset: inset 0 1px 0 rgba(225, 228, 232, 0.2);
  }
`;

const InsertFormContainer = styled.div`
  width: 300px;

  .largeText {
    text-align: center;
    font-size: 24px;
    font-weight: 300;
  }

  .mediumText {
    text-align: center;
    font-size: 16px;
    font-weight: 300;
  }

  .smallText {
    text-align: center;
    font-size: 14px;
    font-weight: 300;
  }
`;

const InsertForm = styled.div`
  /* width: 300px; */

  border: 1px solid #eaecef;
  border-radius: 5px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: #f6f8fa;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .accountLabel {
    font-weight: 600;
    display: block;
    margin-bottom: 7px;
    text-align: left;
    font-size: 14px;
    color: #24292e;
  }

  .input-block {
    margin-top: 5px;
    margin-bottom: 15px;
    width: 100%;
    padding: 5px 12px;
    font-size: 14px;
    line-height: 20px;
    color: #24292e;
    vertical-align: middle;
    background-color: #fff;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    outline: none;
    box-shadow: --color-shadow-inset;
    box-sizing: border-box;
  }

  .btn {
    width: 90%;
  }
`;

const RequestAccountLink = styled.div`
  padding: 15px 20px;

  text-align: center;
  border: 1px solid #d1d5da;
  border-radius: 5px;
  box-sizing: border-box;
  margin-top: 16px;

  p {
    margin-top: 0;
  }

  .requestAccText {
    color: #0366d6;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginButton = styled.div`
  background-color: #2ea44f;
  text-align: center;
  color: #fff;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid;
  border-radius: 6px;
`;

class SignInForm extends Component {
  setError = (message) => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: 'login',
      message
    });
  };

  validate = {
    email: (value) => {
      if (!isEmail(value)) {
        this.setError('잘못된 이메일 형식입니다.');
        return false;
      }
      return true;
    }
  };

  /**
   * debounce 라이브러리 : 특정 함수가 반복적으로 호출될 때 바로 실행하지 않고, 주어진 시간(ms)만큼 쉬어줘야 함수가 실행된다.
   * 함수가 호출되면 300ms 이후에 실행되는데, 만일 그 사이에 새로운 함수가 또 호출되면 기존에 대기시켰던 호출을 없애고, 새로운 호출을 대기시킨다.
   */
  checkEmailExists = debounce(async (email) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkEmailExists(email);
      if (this.props.exists.get('email')) {
        this.setError('유효한 계정입니다.');
      } else {
        this.setError(null);
      }
    } catch (e) {
      console.log(e);
    }
  }, 300);

  componentDidMount() {
    const { location } = this.props;
    const query = queryString.parse(location.search);

    if (query.expired !== undefined) {
      this.setError('세션이 만료되었습니다. 다시 로그인하세요.');
    }
  }

  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm('login');
  }

  handleChange = (e) => {
    console.log(this.props);
    const { AuthActions } = this.props;
    const { name, value } = e.target;

    AuthActions.changeInput({
      name,
      value,
      form: 'login'
    });

    // 검증 작업
    if (name === 'email') {
      const validation = this.validate[name](value);
      if (!validation) return;
    }

    // 이메일 존재여부 확인
    const check = name === 'email' ? this.checkEmailExists : () => {};
    check(value);
  };

  handleLocalLogin = async () => {
    const { form, AuthActions, UserActions, history } = this.props;
    const { email, password } = form.toJS();

    console.log('input acc' + email + password);
    console.log('this.props' + JSON.stringify(this.props));

    try {
      await AuthActions.localLogin({ email, password });
      const loggedInfo = this.props.result.toJS();

      UserActions.setLoggedInfo(loggedInfo);
      history.push('/');
      storage.set('loggedInfo', loggedInfo);
    } catch (e) {
      console.log('login error!');
      this.setError('잘못된 계정입니다.');
    }
  };

  render() {
    const { handleChange, handleLocalLogin } = this;
    const { error } = this.props;

    console.log('error:' + error);

    return (
      <InsertFormPositioner>
        <InsertFormContainer>
          <h1 className="largeText">Sign in to My Career!</h1>
          <InsertForm>
            <label for="login_field" className="accountLabel">
              Username or email address
            </label>
            <input
              type="text"
              name="email"
              id="login_field"
              className="input-block"
              autocapitalize="off"
              autocorrect="off"
              autocomplete="username"
              autofocus="autofocus"
              onChange={handleChange}
            ></input>
            <label for="password" className="accountLabel">
              Password
            </label>
            <input type="password" name="password" id="password" className="input-block" autocomplete="current-password" onChange={handleChange}></input>
            {error && <SignInError>{error}</SignInError>}
            <LoginButton onClick={handleLocalLogin}>Sign in</LoginButton>
          </InsertForm>
          <RequestAccountLink>
            <p className="mediumText">Do you want to see my career?</p>
            <a
              className="mediumText"
              className="requestAccText"
              href="mailto:wlsekffo1674@naver.com
                          ?subject=Request%20for%20an%20account.
                          &body=Dear%20Hyewon%0D%0A%0D%0A
                          I%20am%20writing%20to%20request%20an%20account%20that%20I%20can%20access.%0D%0A
                          I%20will%20be%20waiting%20for%20your%20reply.%20Thank%20you.%0D%0A%0D%0A
                          Best%20Regards.%0D%0A"
            >
              Send me an email!
            </a>
          </RequestAccountLink>
        </InsertFormContainer>
      </InsertFormPositioner>
    );
  }
}

// export default connect(
//   (state) => ({
//     form: state.auth.getIn(['login', 'form']),
//     error: state.auth.getIn(['login', 'error']),
//     exists: state.auth.getIn(['login', 'exists']),
//     result: state.auth.get('result')
//   }),
//   (dispatch) => ({
//     AuthActions: bindActionCreators(authActions, dispatch),
//     UserActions: bindActionCreators(userActions, dispatch)
//   })
// )(SignInForm);

export default withRouter(
  connect(
    (state) => ({
      form: state.auth.getIn(['login', 'form']),
      error: state.auth.getIn(['login', 'error']),
      exists: state.auth.getIn(['login', 'exists']),
      result: state.auth.get('result')
    }),
    (dispatch) => ({
      AuthActions: bindActionCreators(authActions, dispatch),
      UserActions: bindActionCreators(userActions, dispatch)
    })
  )(SignInForm)
);
