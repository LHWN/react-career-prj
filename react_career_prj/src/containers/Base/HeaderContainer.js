import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Base/Header';

const HeaderContainer = (props) => {
  const { visible, open } = props;

  console.log('1:' + props.open + props.visible);
  if (!visible) return null;
  const handleDrawerOpen = props.handleDrawerOpen;
  return <Header open={open} handleDrawerOpen={handleDrawerOpen}></Header>;
};

export default connect(
  (state) => ({
    visible: state.base.getIn(['header', 'visible'])
  }),
  (dispatch) => ({})
)(HeaderContainer);
