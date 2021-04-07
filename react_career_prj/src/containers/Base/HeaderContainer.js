import React from 'react';
import { connect } from 'react-redux';
import { StaticRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/modules/user';
import Header from '../../components/Base/Header';
import storage from '../../lib/storage';

const HeaderContainer = (props) => {
  const { visible, open, UserActions, user, useStyles } = props;

  const handleLogout = async () => {
    try {
      await UserActions.logout();
    } catch (e) {
      console.log(e);
    }

    storage.remove('loggedInfo');
    window.location.href = '/'; // 홈페이지로 새로고침
  };

  if (!visible) return null;
  const handleDrawerOpen = props.handleDrawerOpen;

  return (
    <Header
      open={open}
      handleDrawerOpen={handleDrawerOpen}
      handleLogout={handleLogout}
      useStyles={useStyles}
      logged={user.get('logged')}
      loggedUsername={user.getIn(['loggedInfo', 'username'])}
      loggedThumbnail={user.getIn(['loggedInfo', 'thumbnail'])}
    ></Header>
  );
};

export default connect(
  (state) => ({
    visible: state.base.getIn(['header', 'visible']),
    user: state.user
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(HeaderContainer);
