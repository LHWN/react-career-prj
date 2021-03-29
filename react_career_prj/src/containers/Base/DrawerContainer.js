import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { mainListItems, secondaryListItems } from '../../components/listItems';
import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
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
    },
    whiteSpace: 'nowrap'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

const DrawerContainer = (props) => {
  const { visible } = props;
  const classes = useStyles();

  if (!visible) return null;
  return (
    <Drawer
      variant="permanent"
      classes={{
        // paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose)
        paper: clsx(classes.drawerPaperClose, props.open && classes.drawerPaper)
      }}
      open={props.open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={props.handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
      <List>{secondaryListItems}</List>
    </Drawer>
  );
};

export default connect(
  (state) => ({
    visible: state.base.getIn(['header', 'visible'])
  }),
  (dispatch) => ({})
)(DrawerContainer);
