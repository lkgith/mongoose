const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
mongoose.connect('mongodb://127.0.0.1/test');

function saveData(biaoname){
    var saveSchema = new Schema({
        type: String,
        date: Date,
        title: String
    });
    try{
        var saveModel = mongoose.model(biaoname, saveSchema);
    }catch(e){
        var saveModel = mongoose.model(biaoname);
    }
    var saveEntity = new saveModel({
        type: 'saveModel',
        title: 'lineofsaveModel'
    });
    saveEntity.save(function(err,data){
        console.log(data);
    });
}

function getData(biaoname, res){
    var saveSchema = new Schema({
        type: String,
        date: Date,
        title: String
    });
    try{
        var saveModel = mongoose.model(biaoname, saveSchema);
    }catch(e){
        var saveModel = mongoose.model(biaoname);
    }
    saveModel.find({}, function(err,data){
        res.end(JSON.stringify(data));
    });
}

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    saveData('new1');
    saveData('new3');
    getData('new3', res);
});

server.listen(port, hostname, () => {
    console.log(`服务器运行在 http://${hostname}:${port}/`);
});
