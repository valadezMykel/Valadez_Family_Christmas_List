const jumboBtn = $("#jumbotronBtn");


jumboBtn.on('click', function(ev){
    ev.preventDefault();
    console.log("working")
    
    let sendThisObj = {name: $("#name").val(), present: $("#present").val()};

    $.post("/api/wishList", sendThisObj, function(data){
        $("#name").val('');
        $("#present").val('');
        if(data){
            // $get html
        }

    });
});

