import { Env_Variables } from "../config/env_variables";
var request = require("request");

class TokenService {

  static getTokenRequest(): Promise<any> {
    return new Promise((resolve, reject) => {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        
        request(getRequestOptions(), (error, response, body) => {
          if(error){
            reject(error);
          }else{
            if(response.statusCode >= 400 && response.statusCode < 600){
              reject(response.body);
            }else{
              resolve(JSON.parse(response.body).access_token);
            }
          }
        });
    });
  }
}

function getRequestOptions():any {
  return {
    headers: {
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':`Bearer ${Env_Variables.AUTH}`
    },
    url: Env_Variables.BASE_URL + Env_Variables.ENDPOINT_LOGIN,
    method: 'POST',
    form: {'grant_type': 'client_credentials'}
  }
}

module.exports = TokenService;
