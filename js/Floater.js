
function Floater(opts){
    this.plane = opts["plane"];
    this.orbs = opts["orbs"];
    this.max = opts["max"] ? opts["max"] : 100;
    this.min = opts["max"] ? opts["max"] : 100;


    this.setOrbs = function(orbs){
        this.orbs = orbs;
    };
    this.setMax = function(max){
        this.max = max;
        return this;
    };
    this.setMin = function(min){
        this.min = min;
        return this;
    };
    this.setPlane = function(p){
        this.plane = p;
        return this;
    }
    this.getPlane = function(){
        return this.plane;
    }

    this.placeOrb = function(orb){
        return this.randomize(orb, this.max, this.min);
    };

    this.placeOrbs = function(orbs){

    };

    this.moveOrb = function(orb, newx, newy, delay){
        var y = (newy) ? newy : orb.getY() + ((Math.round(Math.random() + 1) * -1) * (Math.random()));
        var x = newx ? newx : orb.getX() + ((Math.round(Math.random() + 1) * -1) * (Math.random()));

        orb.getElement().animate({
            "top" :  y + "px",
            "left" : x + "px"
        }, delay, "linear", function(){
            // console.log(orb.getId() + " complete animation");
            orb.setX(x);
            orb.setY(y);
        });
    };

    this.moveOrbs = function(orbs){
        // console.log("moveAll");
        for(var i = 0; i < orbs.length; i++){
            this.moveOrb(orbs[i]);
        }
    };

    this.update = function(){

    };

    this.randomize = function(orb, max, min){
        var s = Math.floor(Math.random() * max) + min;

        //planeWidth defines the upperBound on what we can set the x value of the orb to
        var planeWidth = this.getPlane().width();
        //planeHeight defines the upperbound on what we can set the y value of the orb to
        var planeHeight = this.getPlane().height();

        var c = s / 2;//center
        var r = c / 2;//radius

      //  var color = this.getColorController().getColor();
        //r defines a further bound on the position values
        //the orb cannot be within its radius to a wall
        var x = Math.floor(Math.random() * (planeWidth - (c + r))) - Math.round(Math.random()) * r;
        var y = Math.floor(Math.random() * (planeHeight - (c + r))) - Math.round(Math.random()) * r;

        orb.setHeight(s);
        orb.setWidth(s);
        orb.setRadius(r);
        orb.setCircleX(c);
        orb.setCircleY(c);
      //  orb.setColor(color);
        orb.setX(x);
        orb.setY(y);
        return orb;
    };

    this.randomizeAll = function(orbs){
        for(var i = 0; i < orbs.length; i++) {
            this.randomize(orbs[i]);
        }
    };

    this.slideRight = function(orbs, time){
       // this.animations = [];
        for(var i = 0; i < orbs.length; i++) {
            this.slideOrbRight(orbs[i], time);
        }
    };

    this.slideOrbRight = function(orb, time){

        var dx = this.plane.width() - (orb.getX() + orb.getCircleX()); //side it as far as it can go to the right
        var x = orb.getX();
        var t1 = (dx / this.plane.width()) * time;
        var t2 = (x / this.plane.width()) * time;

        console.log("moving x from " + x + " to " + dx);
        console.log("first time is " + t1 + " second time is " + t2);
        /*
         o.getElement().stop(true).delay(200).css("left", "-50px").show(function () {
         console.log(this);
         $(this).animate({
         "left": x
         }, time);
         });
         */
        orb.getElement().animate({
            "left": dx
        }, t1, function(){
            orb.setX("-100");
        });

        orb.getElement().promise().done(function(){
            console.log(x);
            $(this).animate({
                "left": x
            }, t2);
        });
    };


    this.slideLeft = function(orbs, time){
        for(var i = 0; i < orbs.length; i++) {
            this.slideOrbLeft(orbs[i], time);
        }
    };

    this.slideOrbLeft = function(orb, time){

        var planeWidth = this.plane.width();
        var dx = orb.getWidth() - this.plane.width(); //side it as far as it can go to the left
        var x = orb.getX();
        var t1 = (Math.abs(dx) / this.plane.width()) * time;
        var t2 = (x / this.plane.width()) * time;
        /*
         o.getElement().stop(true).delay(200).css("left", "-50px").show(function () {
         console.log(this);
         $(this).animate({
         "left": x
         }, time);
         });
         */
        orb.getElement().animate({
            "left": dx
        }, t1, function(){
            orb.setX(planeWidth);
        });

        orb.getElement().promise().done(function(){
            console.log(x);
            $(this).animate({
                "left": x
            }, t2);
        });
    };

}