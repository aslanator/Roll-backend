import Router from 'koa-router';

const router = new Router();

//ROUTES_START

router.get('/', (ctx) =>{
    ctx.body = 'index';
});

router.get('/auth/', (ctx) =>{
    ctx.body = 'auth';
});

//ROUTES_END

export = router.routes();