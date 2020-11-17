const jumboBtn = $("#jumbotronBtn");




jumboBtn.on('click', function(ev){
    ev.preventDefault();
    console.log("working")
    
    let sendThisObj = {name: $("#name"), present: $("#present")};

    $.post("/", sendThisObj, function(){
        $("#name").val('');
        $("#present").val('');
    })
})