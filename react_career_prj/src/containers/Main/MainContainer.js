import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Chart from '../../components/Main/Chart';
import Today from '../../components/Main/Today';
import Blog from '../../components/Main/Blog';
import Copyright from '../../components/Main/Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  appBarSpacer: theme.mixins.toolbar,
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

const MainContainer = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper className={fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid>
          {/* Today */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Today />
            </Paper>
          </Grid>
          {/* Recent Blog Post */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Blog />
            </Paper>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </main>
  );
};

export default MainContainer;
