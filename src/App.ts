import LogsRouter from './routes/logsRouter';
import SwaggerRouter  from './routes/swaggerRouter';
import TestRouter  from './routes/test/testRouter';
import * as express from 'express';
import SendFileRouter from './routes/sendFileRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.set('view engine', 'ejs');

    this.express.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
      next();
    });
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/file', SendFileRouter);
    this.express.use('/file/logs', LogsRouter);
    this.express.use('/file/documentation', SwaggerRouter);
	  this.express.use('/file/test', TestRouter);
  }

}
export default new App().express;
