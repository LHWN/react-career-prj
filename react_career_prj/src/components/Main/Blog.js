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

import Title from './Title';
import * as crawlActions from '../../redux/modules/crawl';

const preventDefault = (event) => {
  event.preventDefault();
};

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3)
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
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Hits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogPosts.map((el) => (
            <TableRow>
              <TableCell>{el.date}</TableCell>
              <TableCell>{el.category}</TableCell>
              <TableCell>{el.title}</TableCell>
              <TableCell>{el.author}</TableCell>
              <TableCell>{el.hits}</TableCell>
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
