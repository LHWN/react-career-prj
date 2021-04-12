import React from 'react';
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

// Generate Post Data
const createData = (id, data, category, title, author, hits) => {
  return { id, data, category, title, author, hits };
};

const rows = [
  createData(0, '09 April, 2021', 'IT > React', 'useMemo 사용해보기', 'LHWN', 36),
  createData(1, '09 April, 2021', 'IT > React', 'useMemo 사용해보기', 'LHWN', 36),
  createData(2, '09 April, 2021', 'IT > React', 'useMemo 사용해보기', 'LHWN', 36),
  createData(3, '09 April, 2021', 'IT > React', 'useMemo 사용해보기', 'LHWN', 36),
  createData(4, '09 April, 2021', 'IT > React', 'useMemo 사용해보기', 'LHWN', 36),
  createData(5, '09 April, 2021', 'IT > React', 'useMemo 사용해보기', 'LHWN', 36)
];

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

  console.log('CrawlActions' + JSON.stringify(posts));
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>{row.hits}</TableCell>
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
