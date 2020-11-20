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
    })
}

getPeopleAndLists();