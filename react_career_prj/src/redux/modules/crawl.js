import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import * as CrawlAPI from '../../lib/api/crawl';
import { pender } from 'redux-pender';

const GET_BLOG_POSTS = 'crwal/GET_BLOG_POSTS'; // 블로그 포스트 정보 가져오기

export const getBlogPosts = createAction(GET_BLOG_POSTS, CrawlAPI.getBlogPosts);

const initialState = Map({
  blogPosts: List([
    Map({
      date: '',
      category: '',
      title: '',
      author: '',
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
        console.log('inner success' + action.payload.data.length);

        blogPosts.clear();
        console.log('blogPosts_before' + JSON.stringify(blogPosts.toJS()));
        console.log('isList?' + List.isList(blogPosts));
        console.log('test size' + List([1, 2, 3, 4]).push(5).push(6).size);
        console.log('isList?' + List.isList(List([1, 2, 3, 4])));

        console.log(blogPosts.clear().toJSON());

        console.log('blogPosts_after' + blogPosts.toJSON());

        action.payload.data.forEach((el) => {
          blogPosts.push(
            Map({
              date: el.date,
              category: el.category,
              title: el.title,
              author: el.author,
              hits: el.hits
            })
          );
        });
      },
      onFailure: (state, action) => {
        console.log('inner failure');
        state.set(action.payload, initialState);
      }
    })
  },
  initialState
);
