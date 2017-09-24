var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var path = require('path');
var fs = require('fs');



var clientPath = path.join(__dirname, '../client');
var dataPath = path.join(__dirname, 'data.json');
app.use(express.static(clientPath));


app.get('/', function (req, res) {
    res.sendFile(static(__dirname + '/index.html'));
    res.send();

});

app.route('/api/chirps')
    .get(function (req, res) {
        res.sendFile(path.join(__dirname + '/data.json'));
        res.send();
    }).post(function (req, res) {
        fs.readFile(dataPath, 'utf8', function (err, fileContents) {
            if (err) {
                console.log(err);
                res.send(500);
            } else {
                var chirps = fileContents;
                var incomingData = '';
                req.on('data', function (chunk) {
                    incomingData += chunk;
                });
                req.on('end', function () {

                    chirps.push(incomingData);
                    fs.writeFile(dataPath + chirps, function (err) {
                        if (err) {
                            console.log(err);
                            res.send(500);
                        } else {
                            res.send(201);
                        }
                    })
                })
            }
        })

    });





app.listen(3000);