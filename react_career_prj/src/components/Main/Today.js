import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';

import Title from './Title';

const preventDefault = (event) => {
  event.preventDefault();
};

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

const Today = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Today</Title>
      <Typography component="p" variant="h4">
        {/* dday 가져오기 */}D + 10
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {/* 오늘 날짜 가져오기 */}
        {'on 9, '}
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][new Date().getMonth()]}
        {' ,'}
        {new Date().getFullYear()}
      </Typography>
      {/* 클릭 구현할거 생각하기 */}
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Click here.
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Today;
