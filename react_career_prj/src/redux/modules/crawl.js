import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import * as CrawlAPI from '../../lib/api/crawl';
import { pender } from 'redux-pender';

const GET_BLOG_POSTS = 'crwal/GET_BLOG_POSTS'; // 블로그 포스트 정보 가져오기

export const getBlogPosts = createAction(GET_BLOG_POSTS, CrawlAPI.getBlogPosts);

const initialState = Map({
  blogPosts: Map({
    date: null,
    category: null,
    title: null,
    author: null,
    hits: 0
  })
});

export default handleActions(
  {
    ...pender({
      type: GET_BLOG_POSTS,
      onSuccess: (state, action) => (console.log('action payload' + action.payload.data), state.set('blogPosts', Map(action.payload.data))),
      onFailure: (state, action) => initialState
    })
  },
  initialState
);

console.log('here is crawl.js');
