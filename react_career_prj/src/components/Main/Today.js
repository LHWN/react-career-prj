import React, { useEffect, useState } from 'react';

import { makeStyles, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import moment from 'moment';

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
  const [currentTime, setCurrentTime] = useState(moment()); // useState Hook 을 통해 timer 값 Default 설정
  let timer = null;
  useEffect(() => {
    // timer 변수에 인터벌 종료를 위해 저장
    timer = setInterval(() => {
      setCurrentTime(moment()); // 현재 시간을 1000ms = 1s 마다 저장
    }, 1000);
    return () => {
      clearInterval(timer); // 함수 unmount 시 clearInterval 해주기
    };
  }, []);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Today</Title>
      {/* 현재시각 : 시계처럼 만들기 */}
      <Typography component="p" variant="h3" color="primary">
        {currentTime.format('HH:mm:ss')}
      </Typography>
      <Typography component="p" variant="h5">
        {/* 오늘 날짜 가져오기 */}
        {'on '}
        {moment().format('DD')}
        {', '}
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][moment().format('M') - 1]}
        {', '}
        {moment().format('YYYY')}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {/* dday 가져오기 */}
        {'created Date D'}
        {moment('2021-02-19').diff(moment().format('YYYY-MM-DD', 'days'), 'days')}
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
