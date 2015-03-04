
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
        var planeWidth = this.getPlane().attr("width");
        //planeHeight defines the upperbound on what we can set the y value of the orb to
        var planeHeight = this.getPlane().attr("height");

        var c = s / 2;//center
        var r = c / 2;//radius

      //  var color = this.getColorController().getColor();
        //r defines a further bound on the position values
        //the orb cannot be within its radius to a wall
        var x = Math.floor(Math.random() * planeWidth) ;
        var y = Math.floor(Math.random() * planeHeight);
         //   console.log("planeWidth: " + planeWidth + " planeHeight : " + planeHeight + " c: " + c + " r: " + r);
       // console.log(x + ", " + y);
      //  orb.setHeight(s);
      //  orb.setWidth(s);
        orb.setRadius(r);
        orb.setCircleX(x);
        orb.setCircleY(y);
      //  orb.setColor(color);
      //  orb.setX(x);
      //  orb.setY(y);
        return orb;
    };

    this.randomizeAll = function(orbs){
        for(var i = 0; i < orbs.length; i++) {
            this.randomize(orbs[i]);
        }
    };

    this.slideRight = function(orbs, time, loop){
       // this.animations = [];
        for(var i = 0; i < orbs.length; i++) {
            this.slideOrbRight(orbs[i], time, loop);
        }
    };

    this.slideOrbRight = function(orb, time, loop){
        var maxX = this.plane.attr("width");
        var minX = 0;
        var center = orb.getCenter();
        var path = new Path(null, null, {"stroke" : "red", "stroke-width" : "0", "plane" : this.plane});
        path.moveTo(center[0], center[1]);
        path.lineTo(maxX, center[1]);
        path.moveTo(minX, center[1]);
        path.lineTo(center[0], center[1]);

        orb.hide();
        orb.setCircleX("").setCircleY("");
        orb.show();

        path.path.attr("id", "motionPath-"+orb.getId());
        path.build().display();


        var a = new Animation({
            "tag" : "animateMotion",
            "dur" : time,
            "repeatCount" : loop ? "indefinite" : 1,
            "parent" : orb.getElement()
        });
        var mpath = a.makeElement("mpath");
        a.setAttributeNameSpace(mpath, "href", "#motionPath-"+orb.getId());
        a.addChild(mpath);
        a.display();
    };


    this.slideLeft = function(orbs, time, loop){
        for(var i = 0; i < orbs.length; i++) {
            this.slideOrbLeft(orbs[i], time, loop);
        }
    };

    this.slideOrbLeft = function(orb, time, loop){
        var maxX = this.plane.attr("width");
        var minX = 0;
        var center = orb.getCenter();
        var path = new Path(null, null, {"stroke" : "red", "stroke-width" : "0", "plane" : this.plane});
        path.moveTo(center[0], center[1]);
        path.lineTo(minX, center[1]);
        path.moveTo(maxX, center[1]);
        path.lineTo(center[0], center[1]);

        orb.hide();
        orb.setCircleX("").setCircleY("");
        orb.show();

        var unique = new Date().getTime();
        path.path.attr("id", "motionPath-"+unique);
        path.build().display();


        var a = new Animation({
            "tag" : "animateMotion",
            "dur" : time,
            "repeatCount" : loop ? "indefinite" : 1,
            "parent" : orb.getElement()
        });
        var mpath = a.makeElement("mpath");
        a.setAttributeNameSpace(mpath, "href", "#motionPath-"+unique);
        a.addChild(mpath);
        a.display()
    };



    this.float = function(orbs){

    };



}