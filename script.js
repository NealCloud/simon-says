

$(document).ready(function(){


});

data = {
        blue: 0,
        green: 0,
        yellow: 0,
        red: 0,
        lives: 3,
        humanTurn: false,
        //start pattern number
        startInt: 2,
        countInt: 2,
        flashInt: null,
        //computer moves array
        cpuArray: [],
        //player moves array
        playerColorArray: [],
        //simon color values
        colorArray: ["red","green","blue","yellow"],
        //jquery simon button array
        btnArray: []
}

controller = {
    getColor: function(color){return data[color];  },
    setColor: function(color){ return data[color]; },

    getbtnArray: function(){return data.btnArray;},
    getplayerColorArray: function() {return data.playerColorArray;},
    getcpuArray: function() {return data.cpuArray;},
    shiftcputArray: function() {return data.cpuArray.shift()},
    getcolorArray: function() {return data.colorArray;},
    getstartInt: function() {return data.startInt;},
    setstartInt: function(num) {data.startInt = num;},
    getCountInt: function() {return data.countInt;},
    setCountInt: function(num) {data.countInt = num;},
    getlives: function() {return data.lives;},
    setlives: function(num) {data.lives = num;},
    clearMoveArrays: function(){data.cpuArray = [], data.playerColorArray = [];},
    getFlashInt: function(){return data.flashInt},
    setFlashInt: function(){data.flashInt = setTimeout(view.flashColor(), 2000)},
    clearFlashInt: function(){clearTimeout(data.flashInt);},

    getHumanTurn: function(){return data.humanTurn},
    setHumanTurn: function(val){data.humanTurn = val}
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
        //create simon color divs
        view.simonBtn("red");
        view.simonBtn("green");
        view.simonBtn("blue");
        view.simonBtn("yellow");

        $('body').append(start);
        $('body').append(text);
        //create start button link
        $(".start").click(function(){
            view.pattern(controller.getstartInt());
        });
    },
    // create color buttons
    simonBtn: function(color){
        var btn = $("<div>").addClass("hitbox " + color);
        $('.simon').append(btn);
        //push buttons into array for later use;
        var btnArr = controller.getbtnArray();
        btnArr.push($(this));
        //add button;
        $(btn).click(function(){
            console.log(color + " clicked");
            console.log(controller.getColor(color));
            controller.getplayerColorArray().push(color);

            if(controller.getHumanTurn()){

                $(this).addClass("gold").delay(200).queue(function(next){
                    $(this).removeClass("gold");
                    next();
                });

                var newp = controller.shiftcputArray();
                var count = controller.getcpuArray().length;

                if(newp == color && count == 0){
                    console.log("you win");
                    controller.setHumanTurn(false);
                    controller.setstartInt(controller.getstartInt() + 1);
                    controller.setCountInt(controller.getstartInt());
                    view.pattern(controller.getstartInt());
                }

                else if(newp == color) {
                    console.log("you got it!");
                }

                else{
                    console.log("FAIL");
                    controller.setlives(controller.getlives() - 1);
                    controller.setHumanTurn(false);
                    controller.setstartInt(controller.getstartInt() - 1);
                    controller.setCountInt(controller.getstartInt());
                    view.pattern(controller.getstartInt());
                }
            }
        });
    },

    pattern: function(num){

        if(controller.getlives()== 0) return console.log('out of lives');

        console.log("this is player arr: ", controller.getplayerColorArray());
        controller.clearMoveArrays();
        var cpu = controller.getcpuArray();
        var rando;
        var lighting = num;
        for(var i = 0; i < num; i++) {
            rando = Math.floor(Math.random() * 3);
            //console.log(controller.getcolorArray()[rando]);
            cpu.push(controller.getcolorArray()[rando]);
        }

        console.log("this is cpu: ", controller.getcpuArray());
        console.log("this is player arr: ", controller.getplayerColorArray());

        //flashColor pattern sequence
        view.flashColor();
    },

    endFlashColor: function() {
        console.log("color flash ended");
        controller.clearFlashInt();
    },

    flashColor: function() {
        var num = controller.getCountInt();
        --num;

        controller.setCountInt(num);
        var cpu = controller.getcpuArray();

        console.log("countdown num: " + num);
        console.log("This is the color: " , cpu[num - 1]);

        var flash = $("." + cpu[num]);

        $(flash).addClass("gold").delay(300).queue(function(next){
            $(flash).removeClass("gold");
            next();
        })

        if(num >= 0){
            setTimeout(view.flashColor, 1000);
        }
        else{
            console.log("done");
            controller.setHumanTurn(true);
        }
    }
}



