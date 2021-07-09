import { FileUploadService } from "../services/fileUploadService";

var token_service = require("../services/tokenService");
var logger = require('../log');

/**
 * Perform the third party file upload inside OCC
 */
export async function uploadFile(url: any, filename: string, file: any, uploadType: string): Promise<any> {  
  try {
    var token;
    await token_service.getTokenRequest().then((tokenResp) => {
      token = tokenResp;
    }).catch((err) => {
      throw err;
    });

    await FileUploadService.doFileUploadMultipart(token, url, filename, file, uploadType)
            .then((body) => {
              token = null;
              file = null;
              url = null;
              filename = null;
            })
            .catch((err) => {
              throw err;
            });
  } catch (err) {
    logger.error(`Error at uploadFile: ${err}`, { microservice: "send-file" });
    return Promise.reject(err);
  }
}

