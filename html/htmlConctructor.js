const mysql = require("mysql");

const htmlBlockConstructor = class htmlBlock{
    constructors(name, presentsArr){
        this.name = name;
        this.presentsArr = presentsArr;
    };
};

const renderHTML = () =>{
    var peopleAndPresents = [];
    connection.query("SELECT * FROM people", (err, peopleArr)=>{
        if(err) throw err;
        console.log(peopleArr);
        for(let i = 0; i < peopleArr.length; i++){
            
        }
    })
};