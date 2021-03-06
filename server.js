require("dotenv").config();
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

const dbConfig = {
    host: process.env.dbHost,
    port: 3306,
    user: process.env.dbUser,
    password: process.env.dbPass,
    database: "heroku_1134845f6828d85"
}

let connection;

const handleDisconnect = ()=> {
    connection = mysql.createConnection(dbConfig);

    connection.on("error", (err) =>{
        console.log("error in db connection 2", err);
        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            handleDisconnect()
        }else{
            throw err;
        }
    })
};

handleDisconnect();

connection.connect((err)=>{
    if(err) {
        console.log("error in db connection")
        console.log(err.code);
        console.log(err.fatal);
        setTimeout(handleDisconnect, 2000);
    };
});

// connection.on("error", (err) =>{
//     console.log("error in db connection 2", err);
//     if(err.code === "PROTOCOL_CONNECTION_LOST"){
//         handleDisconnect()
//     }else{
//         throw err;
//     }
// })

class Person{
    constructor(name, presentsArr){
        this.name = name;
        this.presentsArr = presentsArr;
    };
};

function peoplePresentsObjCreator(resp){

    let peopleAndPresents = [];

    connection.query("SELECT * FROM people", (err, peopleArr)=>{
        if(err) throw err;

        for(let i = 0; i < peopleArr.length; i++){
        
            connection.query("SELECT present FROM presents WHERE peopleID=?", [peopleArr[i].id], (err, presentsObjArr)=>{
                if(err) throw err;
                
                let presentsArr = [];
                presentsObjArr.forEach(el => {
                    presentsArr.push(el.present)
                });
    
                const personObj = new Person(peopleArr[i].name, presentsArr);
    
                peopleAndPresents.push(personObj);

                if(i+1 === peopleArr.length){
                    console.log(peopleAndPresents);
                    resp.json(peopleAndPresents);
                }
            });
        };
    });
};

app.get("/wishlist", async (req, resp)=>{
    console.log("resquest made");
    peoplePresentsObjCreator(resp);
    
});

app.get("*", function(request, response){
    response.sendFile(path.join(__dirname, "./html/index.html"));
});

app.post("/wishlist", function(req, resp){
    const name = req.body.name;
    const present = req.body.present;
    console.log("starting")

    
    
    const nameHandler = function(resp){
        console.log(name + " " + present);
        // find an id by the name given
        connection.query("SELECT id FROM people WHERE name=?",[name], (err, resultsID)=>{
            if(err) throw err;
            console.log(resultsID);
            // console.log(resultsID[0].id);
            // if the name isnt there yet add it then retry
            if(resultsID.length === 0){
                connection.query("INSERT INTO people(name) VALUES (?)", [name], (err, results)=>{
                    if(err) throw err;
                    console.log("new name added");
                    nameHandler(resp);
                });
            }else{
                // add the present with the people id as a forgien key
                connection.query("INSERT INTO presents(present, peopleID) VALUES (?,?)", [present, resultsID[0].id], (err)=>{
                    if(err) throw err;
                    resp.status(200).end();
                });
            };

        });
    };

    nameHandler(resp);
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