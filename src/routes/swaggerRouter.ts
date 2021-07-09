import {Router, Request, Response, NextFunction} from 'express';

var logger = require('../log');

var swagger = require('../config/swagger');

export class SwaggerRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public swagger(req: Request, res: Response, next: NextFunction) {
    try{

        res.status(200).json(swagger.default);
    }catch(error){
        logger.error("swagger: - " + error, {microservice: "send-file"});
        res.status(500).json("Error");
    }
  }

  init() {
    this.router.get('/', this.swagger);
  }
}

const route = new SwaggerRouter();
route.init();

export default route.router;