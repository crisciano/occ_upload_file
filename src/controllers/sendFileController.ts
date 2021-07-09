import { ErrorDTO } from "../classes/errorDTO";
import { Env_Variables } from "../config/env_variables";
import { SuccessDTO } from "../classes/successDTO";
import { uploadFile } from "../classes/FileManager";
const constants = require('../config/constants');
var logger = require('../log');
var fs = require('fs');

export class SendFileController {
  public static LOCK = false;

  static sendFile(req, res): void {

    sendFile(req)
      .then( success => {
        logger.info(`Success in the manual execution: ${JSON.stringify(success)}`, { microservice: 'xml-criteo' });
        res.status('200').send(success);

      })
      .catch(err => {
        logger.error(`CriteoController General error: ${JSON.stringify(err)}`, { microservice: 'xml-criteo' });
        res.status('500').send(err);
      })

    // console.log(fileRead);

  }
}

function sendFile (req): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const { originalname: fileName, path } = req.file
    const { uploadType, pathDest } = req.body
    try {
      
      
      const fileRead = await readFile(fileName, path)

      /*
      * ALL
      */
      logger.info(`Reading file: ${fileName}...`, { microservice: "send-file" });

      if (fileRead) {
        logger.info(`Reading OK: ${fileName}...`, { microservice: "send-file" });
        logger.info(`Sendding file: ${fileName} to OCC...`, { microservice: "send-file" });      

        uploadFile(Env_Variables.ENDPOINT_UPLOAD_FILE, pathDest? (pathDest+ "/"): "/" + String(fileName), fileRead, uploadType)
          .then((success) => {
            logger.info(`${fileName} success.`, { microservice: "send-file" });
            logger.info("Done XML - ALL!", { microservice: "send-file" });

            // return resolve(new SuccessDTO());
            return resolve({
              code : constants.SUCCESS_CODE,
              message: constants.SUCCESS,
              url: `${Env_Variables.BASE_URL}/file/thirdparty${pathDest? (pathDest+ "/"): "/"} ${String(fileName)}`
            });
          })
      } else {
        logger.error(`CriteoController.execute() - Não foi possível recuperar o arquivo: ${fileName}`, { microservice: "send-file" });
        var error = { message: 'execute Não foi possível recuperar o arquivo: ' + fileName };
        return reject(new ErrorDTO(error));
      }
    } catch (error) {
      
      logger.error(`CriteoController.execute() - Não foi possível recuperar o arquivo: ${fileName}`, { microservice: "send-file" });
      reject(error)
      
    }

  });
}

function readFile(fileName: string, path: string){
  return new Promise((resolve, reject) => {
    try {
      // conteudo co arquivo 
      const contentFile = fs.readFileSync(path, 'utf8')
      // escrevendo o arquivo
      fs.writeFileSync(fileName, contentFile);
      // arquivo escrito
      resolve(fs.readFileSync(fileName))
      
    } catch (error) {
      reject(error)
    }    
  })
}