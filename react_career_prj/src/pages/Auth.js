import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignInWrapper from '../components/SignIn/SignInWrapper';
import * as baseActions from '../redux/modules/base';

class Auth extends Component {
  // 페이지에 진입할 때 헤더를 비활성화
  componentWillMount() {
    this.props.BaseActions.setHeaderVisibility(false);
  }

  // 페이지에 벗어날 때 다시 활성화
  componentWillUnmount() {
    this.props.BaseActions.setHeaderVisibility(true);
  }

  render() {
    return <SignInWrapper></SignInWrapper>;
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Auth);
