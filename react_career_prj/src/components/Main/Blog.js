import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Avatar from '@material-ui/core/Avatar';

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
  }
}));

const Blog = (props) => {
  const classes = useStyles();
  const { posts, CrawlActions } = props;

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

  const blogPosts = posts.get('blogPosts');
  let postRows = null;

  return (
    <React.Fragment>
      <Title>Recent Blog Posts</Title>
      <Table size="small">
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
              <TableCell className={classes.table}>{el.title}</TableCell>
              <TableCell className={classes.authorContainer}>
                <Avatar alt="profile" src={el.profile} className={classes.profile}></Avatar>
                <span className={classes.author}>{el.author}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    posts: state.crawl
  }),
  (dispatch) => ({
    CrawlActions: bindActionCreators(crawlActions, dispatch)
  })
)(Blog);
