import express from 'express';

class App {

    public app: express.Application;

    constructor() {
        this.app = express(); //run the express instance and store in app
    }
}

export default new App().app;