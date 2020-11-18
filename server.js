const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 4400;

app.use("/public", express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "steph45$U",
    database: "christmasList_DB"
});

connection.connect((err)=>{
    if(err) throw err;
})

// const renderHTML = () =>{
//     var peopleAndPresents = [];
//     connection.query("SELECT * FROM people", (err, peopleArr)=>{
//         if(err) throw err;
//         console.log(peopleArr);
//         for(let i = 0; i < peopleArr.length; i++){
            
//         }
//     })
// };

// renderHTML();


app.get("/", function(request, response){
    // renderHTML();
    response.sendFile(path.join(__dirname, "./html/index.html"));
});

app.post("/api/wishList", function(req, res){
    const name = req.body.name;
    const present = req.body.present;

    console.log(name + " " + present);

    
    const nameHandler = function(){
    // find an id by the name given
    connection.query("SELECT id FROM people WHERE name=?",[name], (err, resultsID)=>{
        if(err) throw err;
        
        // if the name isnt there yet add it then retry
        if(resultsID.length === 0){
            connection.query("INSERT INTO people(name) VALUES (?)", [name], (err, results)=>{
                if(err) throw err;
                console.log("New name added")
                nameHandler();
            });
        };
        
        // add the present with the people id as a forgien key
        connection.query("INSERT INTO presents(present, peopleID) VALUES (?,?)", [present, resultsID], (err)=>{
            if(err) throw err;
        });


    })};

    // renderHTML()
    res.send(path.join(__dirname, "./html/index.html"));
});

app.delete("api/delete/person:id", (req, res) =>{
    const deleteThisId = req.params.id;

    // 1 check db for that person and delete them and all relative presents
});

app.delete("api/delete/present:id", (req, res)=>{
    const deleteThisId = req.params.id;


});

app.listen(PORT, function(){
    console.log("App listening on PORT"+ PORT);
});