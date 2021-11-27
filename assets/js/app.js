var app = []

app.question = 1
app.replies = []

function loadQuestion(id) {
    $("#b").attr("src", "assets/img/"+id+"-0.jpg");
    $("#q").text(questions[id-1]["title"]);
    $("#r1").text(questions[id-1]["option-1"]);
    $("#r2").text(questions[id-1]["option-2"]);
    $("#r3").text(questions[id-1]["option-3"]);

    app.question = id;

    $(".item").mouseover(function(){
        var target = $(this).attr("data-target");
        $("#b").attr("src", "assets/img/"+id+"-"+target+".jpg");
    }).mouseout(function(){
        $("#b").attr("src", "assets/img/"+id+"-0.jpg");
    })
}

function reply(target) {
    if(app.question < 5) {
        app.replies[app.question] = target;
        app.question++;
        loadQuestion(app.question);
    } else {
        calculateDrink();
    }
}

$(".item").click(function(){
    var target = $(this).attr("data-target");
    reply(target);
})

function calculateDrink(){
    app.replies.shift();
    console.log(app.replies);

    var drinkNum = 0;
    var multiply = parseInt(app.replies[0]);
    for (let i = 0; i < app.replies.length; i++) {
        drinkNum += multiply * parseInt(app.replies[i])
    }

    $("#b").attr("src", drinks[drinkNum-1]["img"]);
    $("#q").css("background-color", "#506AD4");
    $(".banner").css("height", "500px");
    $("#b").mousemove(function(){
        $("#b").attr("src", drinks[drinkNum-1]["img"]); 
    });
    $("#q").text(drinks[drinkNum-1]["nome"]);
    $(".answers").remove();

    var html = ingredients = qtds = "";

    for (let i = 1; i < 13; i++) {
        qtds = "";
        ingredients = ""; 
        if(drinks[drinkNum-1]["ing"+i] != undefined){
            ingredients = drinks[drinkNum-1]["ing"+i]
        }

        if(drinks[drinkNum-1]["qtd"+i] != undefined){
            qtds = drinks[drinkNum-1]["qtd"+i]
        }

        if(ingredients != "") {
            html += "<span class='ingredients'>"+ingredients+"</span><span class='qtd'>"+qtds+"</span>"; 
        }
    }

    $(".box").append("<article class='ings'>"+html+"<article/>");
    $(".box").append("<article class='inst'>"+drinks[drinkNum-1]["inst"]+"<article/>");
}

loadQuestion(app.question);
