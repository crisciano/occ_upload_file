var http = require('http');
import App from './App';
import { Env_Variables } from './config/env_variables';

//do not remove it - it set cache to DNS lookup
var dnscache = require('dns-cache')(10000);

var logger = require('./log');

const port = Env_Variables.PORT
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
    
logger.info(`Micro service started at port: ${port}`, { microservice: "send-file" });