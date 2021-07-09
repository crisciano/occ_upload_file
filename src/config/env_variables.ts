export enum Env_Variables {
  ENDPOINT_LOGIN          = <any>process.env.ENDPOINT_LOGIN         || "/ccadmin/v1/login/",
  ENDPOINT_UPLOAD_FILE    = <any>process.env.ENDPOINT_UPLOAD_FILE   || "/ccadmin/v1/files",
  BASE_URL                = <any>process.env.BASE_URL               || "", // Base URL, pode diferenciar entre ambientes
  AUTH                    = <any>process.env.AUTH                   || "", // api key
  PORT                    = <any>process.env.PORT                   || 3001, //porta
  FILE_NAME               = <any>process.env.FILE_NAME              || "pinterest.xml", //nome do arquivo
  NODE_ENV                = <any>process.env.NODE_ENV               || "production",
}