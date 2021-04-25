import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Title from './Title';
import * as crawlActions from '../../redux/modules/crawl';

const preventDefault = (event) => {
  event.preventDefault();
};

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  authorContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  profile: {
    width: 30,
    height: 30,
    marginRight: 4
  },
  author: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  table: {
    textAlign: 'center'
  },
  blurEffect: {
    filter: 'blur(3px)',
    /**
     * Cross Browsing 을 위한 처리
     */
    '-webkit-filter': 'blur(3px)',
    '-moz-filter': 'blur(3px)',
    '-o-filter': 'blur(3px)',
    '-ms-filter': 'blur(3px)'
  },
  tableContainer: {
    display: 'block',
    position: 'relative',
    zIndex: 1
  },
  signInTextContainer: {
    position: 'absolute',
    zIndex: 2,
    left: '50%',
    top: '50%',
    fontSize: '20px',
    transform: 'translate(-50%, -50%)'
  },
  link: {
    '&: hover': {
      // decora
    }
  }
}));

const Blog = (props) => {
  const classes = useStyles();
  const { posts, user, CrawlActions } = props;
  const blogPosts = posts.get('blogPosts');
  const logged = user.get('logged');
  let postRows = null;

  const getBlogPosts = async () => {
    try {
      await CrawlActions.getBlogPosts();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBlogPosts();
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Blog Posts</Title>
      <div id="tableContainer" className={classes.tableContainer}>
        <Table size="small" className={clsx(logged ? null : classes.blurEffect)}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.table}>Date</TableCell>
              <TableCell className={classes.table}>Category</TableCell>
              <TableCell className={classes.table}>Title</TableCell>
              <TableCell className={classes.table}>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogPosts.map((el) => (
              <TableRow>
                <TableCell className={classes.table}>{el.date}</TableCell>
                <TableCell className={classes.table}>{el.category}</TableCell>
                <TableCell className={clsx(classes.table, classes.link)}>
                  <Link color="inherit" onClick={() => window.open(el.url, '_blank')}>
                    {el.title}
                  </Link>
                </TableCell>
                <TableCell className={classes.authorContainer}>
                  <Avatar alt="profile" src={el.profile} className={classes.profile}></Avatar>
                  <span className={classes.author}>{el.author}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {logged ? null : (
          <div className={classes.signInTextContainer}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              You need to Sign in to see it.
            </Typography>
          </div>
        )}
      </div>
      {/* button 생각해보기 */}
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Click here
        </Link>
      </div>
    </React.Fragment>
  );
};

export default connect(
  (state) => ({
    posts: state.crawl,
    user: state.user
  }),
  (dispatch) => ({
    CrawlActions: bindActionCreators(crawlActions, dispatch)
  })
)(Blog);
