const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

const app = express();
const PORT = process.env.PORT || 4400;

app.use("/public", express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const renderHTML = () =>{

};


app.get("/", function(request, response){
    // renderHTML();
    response.sendFile(path.join(__dirname, "./html/index.html"));
});

app.post("/api/wishList", function(req, res){
    const name = req.body.name;
    const present = req.body.present;

    console.log(name + " " + present);
    // 1 check if name exists in db
    //      1a if name exists add the present to it
    //      1b if name doesn't exist add the name and the present


    // renderHTML()
    res.send(path.join(__dirname, "./html/index.html"));
});

app.delete("api/delete/person:id", (req, res) =>{
    const deleteThisId = req.params.id;

    // 1 check db for that person and delete them and all relative presents
});

app.delete("api/delete/present:id", (req, res)=>{
    const deleteThisId = req.params.id;

    
})

app.listen(PORT, function(){
    console.log("App listening on PORT"+ PORT);
});