import axios from 'axios';

export const getBlogPosts = () => axios.get('api/crawler/crawlBlog');

console.log('here is api/crawl.js');
