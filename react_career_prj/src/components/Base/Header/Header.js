import React from 'react';
import { AppBar, makeStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
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
  loggedIcon: {
    // backgroundColor: black,
    width: '5',
    height: '5'
  }
}));
const Header = (props) => {
  const classes = useStyles();
  console.log('logged? : ' + props.logged);
  console.log('loggedInfo? : ' + props.loggedUsername);
  console.log('loggedThumbnail? : ' + props.loggedThumbnail);
  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={props.handleDrawerOpen} className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Miracle Morning, LHWN
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {props.logged ? (
            <div>
              {props.loggedUsername}{' '}
              <div className={classes.loggedIcon} onClick={props.handleLogout}>
                Logout
              </div>
            </div>
          ) : (
            <IconButton color="inherit" component={RouterLink} to="/auth">
              <AccountCircleIcon style={{ cursor: 'pointer' }}></AccountCircleIcon>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
