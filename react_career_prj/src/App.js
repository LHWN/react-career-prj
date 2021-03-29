import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Auth } from './pages';
import Homepage from './components/Home';
import SignIn from './components/SignIn/SignInWrapper';
import HeaderContainer from './containers/Base/HeaderContainer';
import { CssBaseline, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import DrawerContainer from './containers/Base/DrawerContainer';

function App() {
  const [open, setOpen] = React.useState(false);
  console.log('0:' + open);
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

export default App;
