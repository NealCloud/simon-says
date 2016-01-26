

$(document).ready(function(){


});

data = {
        blue: 0,
        green: 0,
        yellow: 0,
        red: 0,
        //start pattern number
        startInt: 2,
        flashInt: null,
        //computer moves array
        cpuArray: [],
        //player moves array
        playerColorArray: [],
        //simon color values
        colorArray: ["red","blue","green","yellow"],
        //jquery simon button array
        btnArray: []
}

model = {
    getColor: function(color){
        return data[color];
    },
    setColor: function(color){
        return data[color];
    },
    getbtnArray: function(){return data.btnArray;},
    getplayerColorArray: function() {return data.playerColorArray;},
    getcpuArray: function() {return data.cpuArray;},
    getcolorArray: function() {return data.colorArray;},
    getstartInt: function() {return data.startInt;},
    clearMoveArrays: function(){data.cpuArray = [], data.playerColorArray = [];},
    getFlashInt: function(){return data.flashInt},
    setFlashInt: function(interval){data.flashInt = interval;}
}


view = {
    //initialize board
    init: function(){
        //create simon main div
        var simon = $("<div>").addClass("simon");
        $('body').append(simon);
        //create simon start button
        var start = $("<button>",{
            type: "button",
            text: "start"
        }).addClass("start");
        var text = $("<input>",{
            type: "text",
            text: "start"
        }).addClass("start");
        //create simon divs
        view.simonBtn("red");
        view.simonBtn("green");
        view.simonBtn("blue");
        view.simonBtn("yellow");

        $('body').append(start);
        $('body').append(text);
        $(".start").click(function(){
            view.pattern(6);
        });
    },
    // create buttons
    simonBtn: function(color){
        var btn = $("<div>").addClass("hitbox " + color);
        $('.simon').append(btn);
        //push buttons into array for later use;
        var btnArr = model.getbtnArray();
        btnArr.push($(this));
        $(btn).click(function(){
            console.log(color + " clicked");
            console.log(model.getColor(color));
            model.getplayerColorArray().push(color);
            $(this).addClass("gold").delay(300).queue(function(next){
                $(this).removeClass("gold");
                next();
            })
        });
    },

    pattern: function(num){
        console.log("this is player arr: ", model.getplayerColorArray());
        model.clearMoveArrays();
        var cpu = model.getcpuArray();
        var rando, lightup;
        var lighting = num;
        for(var i = 0; i < num; i++) {
            rando = Math.floor(Math.random() * 4) + 1;
            lightup = cpu[rando];
            cpu.push(model.getcolorArray()[rando]);
        }

        console.log("this is cpu: ", model.getcpuArray());
        console.log("this is player arr: ", model.getplayerColorArray());

        //flashColor pattern sequence
        model.setFlashInt(setInterval(view.flashColor(10), 1000));

    },
    endFlashColor: function() {
        console.log("color flash ended");
        var flash = model.getFlashInt();
        flash.clearInterval();
    },

    flashColor: function(num) {
        --num;
        if(num <= 0){
            view.endFlashColor();
        }
        console.log("This is the num: " + num);

        $(this).addClass("gold").delay(300).queue(function(next){
            $(this).removeClass("gold");
            next();
        });
    }

}



