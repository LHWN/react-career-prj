import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import * as CrawlAPI from '../../lib/api/crawl';
import { pender } from 'redux-pender';

const GET_BLOG_POSTS = 'crwal/GET_BLOG_POSTS'; // 블로그 포스트 정보 가져오기

export const getBlogPosts = createAction(GET_BLOG_POSTS, CrawlAPI.getBlogPosts);

const initialState = Map({
  blogPosts: List([
    Map({
      date: null,
      category: null,
      title: null,
      author: null,
      hits: 0
    })
  ])
});

export default handleActions(
  {
    ...pender({
      type: GET_BLOG_POSTS,
      onSuccess: (state, action) => {
        const blogPosts = state.get('blogPosts');
        console.log('inner success');

        // state.set('blogPosts', Map(action.payload.data));
        state.set('blogPosts', blogPosts.push(Map({})));
      },
      onFailure: (state, action) => {
        console.log('inner failure');
        state.set(action.payload, initialState);
      }
    })
  },
  initialState
);
