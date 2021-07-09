export default {
	"swagger":"2.0",
	"info":{
	   "description":"This is a MS send the File to OCC",
	   "version":"1.0.0",
	   "title":"Send File - OCC",
	   "contact": {
		"email": "crisciano.botelho@compasso.com.br"
		},
	},
	"host":"http://localhost:3001",
	"basePath":"/file",
	"tags":[
		{
			"name":"Send",
			"description":"Send the file",				
		}
	],
	"schemes":[
	   "http",
	   "https"
	],
	"paths":{
		"/send":{
			"get":{
				"tags":[
					"Send"
				],
				"summary":"Send the file",
				"description":"Send the file.",
				"operationId":"send",
				"produces":[
					"application/json"
				],
				"responses":{
					"200":{
						"description":"Success"
					},
					"500":{
						"description":"Request Error"
					}
				}
			}
		},
		"/logs":{
			"get":{
				"tags":[
					"Logs"
				],
				"summary":"Logs view",
				"description":"Access the logs view.",
				"operationId":"logs",
				"produces":[
					"text/html"
				],
				"responses":{
					"200":{
						"description":"Success"
					},
					"500":{
						"description":"Request Error"
					}
				}
			}
		}
	}
 }