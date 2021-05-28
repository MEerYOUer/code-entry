var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");
var app = express();

const guest_codes = ["NV000","IV490","UQ555","CK347","GJ101","HS220","PH999","EN440","BB614"];

app.use('/public', express.static(__dirname + "/public", {
    index: false, 
    immutable: true, 
    cacheControl: true,
    maxAge: "30d"
}));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

// handle code
app.post("/api/code", bodyParser.json(), function (req, res) {
    var isCodeValid = guest_codes.includes(req.body.code.toUpperCase());

    return res.send(isCodeValid);
});

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("code-entry listening at http://%s:%s", host, port)
});