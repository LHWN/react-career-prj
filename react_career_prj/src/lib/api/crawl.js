import axios from 'axios';

export const getBlogPosts = () => axios.get('/crawler/crawlBlog');

console.log('here is api/crawl.js');
