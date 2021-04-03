import React, { useEffect, Component } from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './redux/modules/user';
import clsx from 'clsx';

import { CssBaseline, makeStyles } from '@material-ui/core';
import { Home, Auth } from './pages';
import Homepage from './components/Home';
import SignIn from './components/SignIn/SignInWrapper';
import HeaderContainer from './containers/Base/HeaderContainer';
import DrawerContainer from './containers/Base/DrawerContainer';
import storage from './lib/storage';

function App(props) {
  const [open, setOpen] = React.useState(false);
  const { UserActions } = props;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex'
    }
  }));
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // App 이 불러와졌을 때 로컬스토리지에 있던 유저 정보를 사용
  const initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬 스토리지에서 가져온다.
    if (!loggedInfo) return; // 로그인 정보가 없으면 여기서 멈춘다.

    // const { UserActions } = this.props;
    UserActions.setLoggedInfo(loggedInfo);
    try {
      await UserActions.checkStatus();
    } catch (e) {
      storage.remove('loggedInfo');
      window.location.href = '/auth/login?expired';
    }
  };

  useEffect(() => {
    initializeUserInfo();
  });

  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <HeaderContainer open={open} handleDrawerOpen={handleDrawerOpen}></HeaderContainer>
        <DrawerContainer open={open} handleDrawerClose={handleDrawerClose}></DrawerContainer>
      </div>
      <Route path="/auth" component={Auth} />
      {/* <Route path="/" component={Homepage} exact /> */}
      <Route path="/signIn" component={SignIn} />
      <Route exact path="/homepage" component={Homepage} />
    </div>
  );
}

export default connect(null, (dispatch) => ({
  UserActions: bindActionCreators(userActions, dispatch)
}))(App);
