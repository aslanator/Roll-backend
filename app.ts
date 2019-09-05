import RoutesCollector from './src/Main/RoutesCollector';
import DB from './src/Main/DB';
import express from "express";
import http from 'http';
import * as core from "express-serve-static-core";


const config = require(`./config.json`);

class App {

    private app:core.Express;

    public async run(){
        await DB.connect();
        this.app = express();
        this.initRouter();
        let port = 3000;
        this.app.get('/', (req, res) => res.send('Hello World!'))
        this.app.listen(port, () => console.log(`Example app listening on port ${port}!`))
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




