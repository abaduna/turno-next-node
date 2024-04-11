var express = require('express');
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Hello World whith --watch!');
});
app.listen(port, function () {
    return console.log("Express is listening at http://localhost:".concat(port));
});
