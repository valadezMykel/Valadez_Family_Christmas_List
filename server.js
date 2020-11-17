const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

const app = express();
const PORT = process.env.PORT || 4400;

app.use("/public", express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function(request, response){
    response.sendFile(path.join(__dirname, "./html/index.html"));
});

app.post("*", function(req, res){
    console.log("received");
    console.log(req.body);
    res.send(req.body);
})

app.listen(PORT, function(){
    console.log("App listening on PORT"+ PORT);
});