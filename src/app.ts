import express from 'express';
import { Stocks } from './routes/stocks';
/*
* App class to initialize express app
*/
class App {

    public app: express.Application;
    public stocks: Stocks = new Stocks();

    constructor() {
        this.app = express(); //run the express instance and store in app
        this.stocks.routes(this.app) // Configure stock routes
    }

}

export default new App().app;