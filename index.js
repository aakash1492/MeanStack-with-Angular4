const express = require('express');

var cors = require('cors')
const app = express();
var router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./Server/routes/authentication')(router);
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());


app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
	});

app.use(cors({
	origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 
}))
mongoose.Promise = global.Promise;

mongoose.connect(config.uri, (err) =>{

	if(err){
		console.log("couldnt connect" ,err);
	}else{
	
		console.log("connected to database"+config.db)
	}
});

app.use(express.static(__dirname+ "/client/dist/"));
app.use('/authentication',authentication);

app.get('/', (req, res) => 

	res.sendFile(path.join(__dirname+ "/client/dist/index.html")))

app.listen(3000, () => console.log('Example app listening on port 3000!'))