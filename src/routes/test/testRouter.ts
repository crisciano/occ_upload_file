import {Router, Request, Response, NextFunction} from 'express';

var logger = require('../../log');

export class TestRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public test(req: Request, res: Response, next: NextFunction) {
    try{
        res.status(200).json("OK");
    }catch(error){
        logger.error("TestRouter: - " + error, {microservice: "send-file"});
        res.status(500).json("Error");
    }
  }

  init() {
    this.router.get('/', this.test);
  }
}

const testRouter = new TestRouter();
testRouter.init();

export default testRouter.router;