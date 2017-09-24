var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');



var clientPath = path.join(__dirname, '../client');
var dataPath = path.join(__dirname, 'data.json');
app.use(express.static(clientPath));


app.get('/', function(req, res) {
    res.sendFile(static(__dirname +'/index.html'));
    res.send();
    
});

app.route('/api/chirps')
    .get(function(req, res) {
        res.sendFile(path.join(__dirname + '/data.json'));
        res.send();
    }).post(function(req, res){
        

    });

            
        
    

app.listen(3000);