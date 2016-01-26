

$(document).ready(function(){


});

data = {
        blue: 0,
        green: 0,
        yellow: 0,
        red: 0,
        startInt: 0,
        playerColorArray: [],
        colorArray: ["red","blue","green","yellow"],
        btnArray: []
}

model = {
    getcolor: function(color){
        return data.color;
    },
    setColor: function(color){
        return data.color;
    },
    getbtnArray: function(){return data.btnArray;},
    getplayerColorArray: function() {return data.playerColorArray;},
    getcolorArray: function() {return data.colorArray;},
    getstartInt: function() {return data.startInt;}
}


view = {

    simonBtn: function(color){
        var btn = $("<div>").addClass("hitbox " + color);
        $('.simon').append(btn);
        model.getbtnArray().push($(this));
        $(btn).click(function(){
            console.log(color + " clicked");
            console.log(window[color]);
            model.getplayerColorArray().push(color);
            $(this).addClass("gold").delay(300).queue(function(next){
                $(this).removeClass("gold");
                next();
            })
         });
    },

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

    pattern: function(startInt){
        var cpuArray = [];
        var rando, lightup;
        var lighting = true;
        for(var i = 0; i < startInt; i++) {
            rando = Math.floor(Math.random() * 3) + 1;
            lightup = cpuArray[rando];
            cpuArray.push(rando);
        }

        $(cpuArray[rando]).addClass("gold").delay(300).queue(function(next){
            $(cpuArray[rando]).removeClass("gold");
            console.log(next);
            next();
        });

        console.log(cpuArray);
    }
}



