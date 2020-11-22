const jumboBtn = $("#jumbotronBtn");


jumboBtn.on('click', function(ev){
    ev.preventDefault();
    console.log("working");
    
    let sendThisObj = {name: $("#name").val(), present: $("#present").val()};

    $.post("/wishlist", sendThisObj, function(data){
        $("#name").val('');
        $("#present").val('');
        console.log("should be getting new obj")
        getPeopleAndLists();

    });
});

function getPeopleAndLists(){
    $.get("/wishlist", function (data){
        $(".container").remove();
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
    
    for(let j = 0; j < obj.presentsArr.length; j++){
        let presentLi = $("<li>").text(obj.presentsArr[j]);
        presentList.append(presentLi);
    };

    col2.append(presentList);
    col1.append(name, breakLine);
    row.append(col1, col2);
    container.append(row);
    $("body").append(container);

}

getPeopleAndLists();