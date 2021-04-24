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
import { HeaderContainer } from './containers/Base';
import { DrawerContainer } from './containers/Base';
import { MainContainer as Main } from './containers/Main';
import storage from './lib/storage';
import { SatelliteTwoTone } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}));

function App(props) {
  const [open, setOpen] = React.useState(false);
  const { UserActions } = props;

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
        <HeaderContainer open={open} useStyles={useStyles} handleDrawerOpen={handleDrawerOpen}></HeaderContainer>
        <DrawerContainer open={open} useStyles={useStyles} handleDrawerClose={handleDrawerClose}></DrawerContainer>
        <Route path="/" component={Main} exact />
      </div>
      <Route path="/auth" component={Auth} />
      <Route path="/signIn" component={SignIn} />
      <Route exact path="/homepage" component={Homepage} />
    </div>
  );
}

export default connect(null, (dispatch) => ({
  UserActions: bindActionCreators(userActions, dispatch)
}))(App);
