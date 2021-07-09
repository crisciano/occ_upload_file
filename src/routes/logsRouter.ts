import {Router, Request, Response, NextFunction} from 'express';

var logger = require('../log');

export class LogsRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

  public loadLogs(req: Request, res: Response, next: NextFunction) {
    try{

      var fs = require('fs');
      const logPath = "logs/application.log";

      fs.exists(logPath, function(exist) {
        if (exist) {
          fs.readFile(logPath, 'utf-8', function(error, data) {
            var lines = [];
            if (!error) {
              lines = data.toString()
                .split('\n')
                .reverse()
                .splice(1, 30);
  
              for (var i = 0; i < lines.length; i++) {
                lines[i] = JSON.parse(lines[i]);
              }
            }
  
            res.render("../src/views/logs", {lines: lines});
  
          });
        } else {
          res.render("../src/views/logs", {lines: []});
        }
      });

    }catch(error){
      logger.error("LogsRouter: - " + error, {microservice: "send-file"});
      res.status(500).json("Error");
    }
  }

  init() {
    this.router.get('/', this.loadLogs);
  }
}

const logsRouter = new LogsRouter();
logsRouter.init();

export default logsRouter.router;