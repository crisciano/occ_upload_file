# occ-upload-file

> Microserviço utilizado para enviar arquivo para OCC.

## Setup

```bash
# install dependencies
npm install

# build project
npm run build

# start project in a development mode
npm run dev

# start project in a production mode
npm start

# tests
npm run test

```

## Config

é preciso incluir as credenciais no file `/src/config/env_variables.ts`
no BASE_URL e o AUTH

## payload

```bash
METHOD: POST
URL: http://localhost:3001/file/send
PARAMS FORM-DATA:
uploadType : tipo de arquivo a ser enviado ex: "thirdPartyFile, file"
fileUpload : file para upload
pathDest : caminho que vai estar disponivel ex : /xml , /products
```
