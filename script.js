

$(document).ready(function(){


});

data = {
        blue: 0,
        green: 0,
        yellow: 0,
        red: 0,
        //start pattern number
        startInt: 2,
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
    getstartInt: function() {return data.startInt;}
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
        //create simon divs
        view.simonBtn("red");
        view.simonBtn("green");
        view.simonBtn("blue");
        view.simonBtn("yellow");

        $('body').append(start);

        $(".start").click(function(){
            view.pattern(6);
        });
    },
    // create buttons
    simonBtn: function(color){
        var btn = $("<div>").addClass("hitbox " + color);
        $('.simon').append(btn);
        //push buttons into array for later use;
        model.getbtnArray().push($(this));
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
        var cpu = model.getcpuArray();
        var rando, lightup;
        var lighting = true;
        for(var i = 0; i < num; i++) {
            rando = Math.floor(Math.random() * 4) + 1;
            lightup = cpu[rando];
            cpu.push(rando);
        }

        console.log(cpu);
        console.log(model.getplayerColorArray());

        view.flash(model.getbtnArray()[1]);
    },

    flash: function(color) {

        console.log(color);

        $(this).addClass("gold").delay(300).queue(function(next){
            $(this).removeClass("gold");
            next();
        })


    }

}



