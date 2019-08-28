import RoutesCollector from './src/Main/RoutesCollector';
import DB from './src/Main/DB';
import Koa from 'koa';
import Router from 'koa-router';
import http from 'http';


const config = require(`./config.json`);

class App {

    private routes:Router.IMiddleware;
    private koa:Koa;
    private router:Router;

    public async run(){
        await DB.connect();
        this.koa = new Koa();
        this.initRouter();
    }

    private initRouter(){
        let b = RoutesCollector.getInstance();
        // this.routes = routes;
        // this.router = new Router();
        // this.router.use('', this.routes);
        // this.koa.use(this.router.routes());
        // http.createServer(this.koa.callback()).listen(3000);
    }
    
}

(async function(){
    const app:App = new App();

    await app.run();
})();




