const constants = require('../config/constants');

export class ErrorDTO {

  errorCode: number;
  message: string;
  status: string;
  stack: string;

  constructor(err) {

    this.errorCode = err.errorCode ? err.errorCode : constants.ERROR_CODE;
    this.message = this.errorCode === constants.ERROR_CODE ? constants.ERROR : err.message;
    this.status = err.status;
    this.stack = err.stack
  }
}
