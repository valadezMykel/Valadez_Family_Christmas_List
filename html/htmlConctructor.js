const mysql = require("mysql");

class Person{
    constructor(name, presentsArr){
        this.name = name;
        this.presentsArr = presentsArr;
    };
};

const peoplePresentsObjCreator = () =>{
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
                return peopleAndPresents;
            });
        };
    });
};