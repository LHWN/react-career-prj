import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { mainListItems, secondaryListItems } from '../../components/Base/Drawer';
import clsx from 'clsx';

const DrawerContainer = (props) => {
  const { visible, useStyles } = props;
  const classes = useStyles();

  if (!visible) return null;
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose)
        // paper: clsx(classes.drawerPaperClose, props.open && classes.drawerPaper)
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
