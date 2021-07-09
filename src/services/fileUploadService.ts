import { Env_Variables } from "../config/env_variables";
var request = require("request");
var logger = require('../log');

export class FileUploadService {

    static startFileUpload(token: string, url: string, payload: StartFilePayload): Promise<any> {
        return new Promise((resolve, reject) => {
            request.put({
                url: Env_Variables.BASE_URL + url,
                body: JSON.stringify(payload),
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            },
                (error, response, body) => {
                    if (error) {
                        logger.error(`Error startFileUpload: ${error}`, { microservice: "send-file" });
                        reject(error);
                    } else {

                        if (response.statusCode >= 400 && response.statusCode < 600) {
                            logger.error(`Error startFileUpload: ${JSON.stringify(response.statusCode)}`, { microservice: "send-file" });
                            reject(response.statusCode);
                        } else {
                            let parsedBody = JSON.parse(response.body);
                            resolve(parsedBody);
                        }
                    }
                }
            );
        });
    };

    static doFileUploadMultipart(token: string, url: string, filename: string, file: any, uploadType:string): Promise<any> {
        return new Promise((resolve, reject) => {

            var formData = {
                uploadType: uploadType? uploadType: 'thirdPartyFile',
                filename: filename,
                fileUpload: file
            };
            request.post({
                url: Env_Variables.BASE_URL + url,
                formData: formData,
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            }, (error, response, body) => {
                if (error) {
                    logger.error(`Error doFileUploadMultipart: ${error}`, { microservice: "send-file" });
                    reject(error);
                } else {
                    console.log(body);
                    
                    resolve(body);
                }
            }
            );
        });
    };

    static doFileSegmentUpload(token: string, url: string, fileToken: string, payload: FileSegmentPayload): Promise<any> {
        return new Promise((resolve, reject) => {
            request.post({
                url: Env_Variables.BASE_URL + url + '/' + fileToken,
                body: JSON.stringify(payload),
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            },
                (error, response, body) => {
                    if (error) {
                        logger.error(`Error doFileSegmentUpload: ${error}`, { microservice: "send-file" });
                        reject(error);
                    } else {
                        let parsedBody = JSON.parse(response.body);
                        if (response.statusCode >= 400 && response.statusCode < 600) {
                            logger.error(`Error doFileSegmentUpload: ${JSON.stringify(response.statusCode)}`, { microservice: "send-file" });
                            reject(parsedBody);
                        } else {
                            resolve(parsedBody);
                        }
                    }
                }
            );
        });
    };

}

export class FileSegmentPayload {
    constructor(
        public filename: string,
        public index: number,
        public file: string
    ) {};
}
export class StartFilePayload {
    constructor(
        public filename: string,
        public segments: number,
        public uploadType: string
    ) {}
}
