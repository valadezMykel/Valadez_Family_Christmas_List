const jumboBtn = $("#jumbotronBtn");


jumboBtn.on('click', function(ev){
    ev.preventDefault();
    console.log("working")
    
    let sendThisObj = {name: $("#name").val(), present: $("#present").val()};

    $.post("/api/wishlist", sendThisObj, function(data){
        $("#name").val('');
        $("#present").val('');
        console.log("should be getting new obj")
        getPeopleAndLists();

    });
});

function getPeopleAndLists(){
    $.get("/api/wishlist", function (data){
        console.log(data);
        for(let i = 0; i < data.length; i++){

            generateBoxes(data[i]);
        }
    })
}

function generateBoxes(obj){
    let container = $("<div>").addClass("container");
        let row = $("<div>").addClass("row");
            let col1 = $("<div>").addClass("col-sm-3");
                let name = $("<p>").text(`${obj.name} is wishing for...`);
                let breakLine = $("<div>").addClass("breakLine");
            let col2 = $("<div>").addClass("col-sm");
                let presentList = $("<ul>");
    
    for(let j = 0; j < obj.presentArr.length; j++){
        let presentLi = $("<li>").text(obj.presentArr[j]);
        
    }

}

getPeopleAndLists();