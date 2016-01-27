

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
        countInt: 0,
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
        var text = $("<div>",{
            text: controller.getlives()
        }).addClass("info");
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
            $(this).hide();
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

            //console.log(color + " clicked");
            //console.log(controller.getColor(color));
            controller.getplayerColorArray().push(color);

            if(controller.getHumanTurn()){
                view.addClassTemp(this, "gold", 200);

                var newp = controller.shiftcputArray();
                var count = controller.getcpuArray().length;

                // finish sequence correctly
                if(newp == color && count == 0){
                    view.addClassTemp(".info", "correct", 300);
                    view.textDisplay(".info", "nice one lives: " + controller.getlives());

                    controller.setHumanTurn(false);
                    controller.setstartInt(controller.getstartInt() + 1);
                    controller.setCountInt(0);
                    setTimeout(view.pattern, 2000);
                }
                // continue sequence
                else if(newp == color) {
                    view.addClassTemp(".info", "correct", 300);
                    view.textDisplay(".info", "lives: " + controller.getlives());
                }
                // failed sequence
                else{
                    view.addClassTemp(".info", "error", 300);
                    controller.setlives(controller.getlives() - 1);
                    view.textDisplay(".info", "Sorry lives: " + controller.getlives());

                    controller.setHumanTurn(false);
                    controller.setstartInt(controller.getstartInt() - 1);
                    controller.setCountInt(0);
                    setTimeout(view.pattern, 2000);
                }
            }
        });
    },

    pattern: function(){
        var start = controller.getstartInt();
        if(controller.getlives()== 0) return console.log('out of lives');

        console.log("this is player arr: ", controller.getplayerColorArray());
        controller.clearMoveArrays();
        var cpu = controller.getcpuArray();
        var rando;

        for(var i = 0; i < start; i++) {
            rando = Math.floor(Math.random() * 3);
            //console.log(controller.getcolorArray()[rando]);
            cpu.push(controller.getcolorArray()[rando]);
        }

        console.log("this is cpu: ", controller.getcpuArray());
        console.log("this is player arr: ", controller.getplayerColorArray());

        //flashColor pattern sequence
        view.flashColor();
    },

    addClassTemp: function(targ, val, duration) {
        $(targ).addClass(val).delay(duration).queue(function(next){
            $(this).removeClass(val);
            next();
        });
    },
    textDisplay: function(targ, text){
        $(targ).text(text);
    },

    flashColor: function() {
        var highest = controller.getcpuArray().length;
        var num = controller.getCountInt();
        num++;
        controller.setCountInt(num);

        var cpu = controller.getcpuArray();

        console.log("countdown num: " + num);
        console.log("This is the color: " , cpu[num - 1]);

        var flash = $("." + cpu[num - 1]);

        view.addClassTemp(flash, "gold", 300);

        if(num <= highest){
            setTimeout(view.flashColor, 1000);
        }
        else{
            console.log("done");
            controller.setHumanTurn(true);
        }
    }
}



