import axios from 'axios';

export const getBlogPosts = () => axios.get('api/crawler/crawlBlog');
