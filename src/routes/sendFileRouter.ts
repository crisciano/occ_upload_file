import { Router, Request, Response, NextFunction } from 'express';
import { SendFileController } from '../controllers/sendFileController'
import * as multer from 'multer'

var upload = multer({ dest: '../tmp' })

export class SendFileRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }
  public sendFile(req: Request, res: Response, next: NextFunction) {
    SendFileController.sendFile(req, res);
  }

  init() {
    this.router.post('/send',  upload.single('fileUpload'),this.sendFile);
  }
}

// Create the router, and export its configured Express.Router
const sendFileRouter = new SendFileRouter();
sendFileRouter.init();

export default sendFileRouter.router;
