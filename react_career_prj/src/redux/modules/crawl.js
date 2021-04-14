import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import * as CrawlAPI from '../../lib/api/crawl';
import { pender } from 'redux-pender';

const GET_BLOG_POSTS = 'crawl/GET_BLOG_POSTS'; // 블로그 포스트 정보 가져오기

export const getBlogPosts = createAction(GET_BLOG_POSTS, CrawlAPI.getBlogPosts);

// const initialState = Map({
//   blogPosts: List([
//     Map({
//       date: null,
//       category: null,
//       title: null,
//       author: null,
//       hits: 0
//     })
//   ])
// });

const initialState = Map({
  blogPosts: false
});

export default handleActions(
  {
    // [GET_BLOG_POSTS]: (state, action) => state.set('blogPosts', true)
    ...pender({
      type: GET_BLOG_POSTS,
      onSuccess: (state, action) => {
        state.set('blogPosts', true);
      },
      onFailure: (state, action) => {
        console.log('onFailure');
        state.set(initialState);
      }
    })
  },
  initialState
);
