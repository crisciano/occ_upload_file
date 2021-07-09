const constants = require('../config/constants');

export class SuccessDTO {

  code: number;
  message: string;

  constructor() {
    this.code = constants.SUCCESS_CODE;
    this.message = constants.SUCCESS;
  }
}
