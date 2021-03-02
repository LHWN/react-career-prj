const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = '홈';
});

router.get('/about', (ctx, next) => {
    ctx.body = 'introduction';
})

router.get('/about/:name', (ctx, netx) => {
    const { name } = ctx.params;
    ctx.body = name + '`s introduction';
})

router.get('/post', (ctx, next) => {
    const { id } = ctx.request.query;
    if (id) {
        ctx.body = 'Post #' + id;
    } else {
        ctx.body = 'No Post Id';
    }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('heurm server is listening to port 4000');
});