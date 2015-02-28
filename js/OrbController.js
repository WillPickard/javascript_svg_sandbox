function OrbController(numOrbs, max, min, opts)
{
    this.getOrbs = function(){
        return this.orbs;
    };
    this.setOrbs = function(o){
        this.orbs = o;
    };

    this.count = function(){
        return this.numOrbs;
    };

    this.getMaxOrbSize = function(){
        return this.maxOrbSize;
    };
    this.setMaxOrbSize = function(s){
        this.maxOrbSize = s;
    };

    this.getMinOrbSize = function(){
        return this.minOrbSize;
    };
    this.setMinOrbSize = function(s){
        this.minOrbSize = s;
    };

    this.getPlane = function(){
        return this.plane;
    };
    this.setPlane = function(p){
        this.plane = p;
    };

    this.getColorController = function(){
        return this.colorController;
    };
    this.setColorController = function(c){
        this.colorController = c;
    };

    //if a color controller is not set in the passed opts
    //we need to make of our own
    //ColorControllers are required to implement getColor()
    this._colorController = function(){
        this.color = "red";
        this.getColor = function(){
            return this.color;
        }
    };

    this.displayAll = function(){
        this.displayPaths();
        this.displayOrbs();
        return this;
    };

    this.displayOrbs = function(){
        for(var i = 0; i  < numOrbs; i++){
            this.display(this.orbs[i]);
        }
        return this;
    };
    this.display = function(orb){
        this.getPlane().append(orb.getElement());
    };

    this.hideAll = function(){
        for(var i = 0; i < this.count(); i++){
            this.hide(this.orbs[i]);
        }
    };
    this.hide = function(orb){
          orb.getElement().hide();
    };

    this.addOrb = function(orb){
        this.orbs.push(orb);
        this.numOrbs = this.orbs.length;
    };

    //delete all orbs
    this.clear = function(){
        for(var i = 0; i < this.count(); i++){
            this.remove(this.orbs[i]);
        }
        this.orbCount = this.orbs.length;
    };
    this.remove = function(orb) {
        var id = orb.getId(); //index into the orbs array
        orb.getElement().remove();
        var deleted = this.orbs.splice(id, 1);
        this.orbCount = this.orbs.length;
        return deleted[0];
    };

    this.randomizeAll = function(){
        for(var i = 0; i < this.count(); i++) {
            this.randomize(this.orbs[i]);
        }

       return this.buildPaths();
    };

    this.randomize = function(orb){
        var s = Math.floor(Math.random() * this.getMaxOrbSize()) + this.getMinOrbSize();

        //planeWidth defines the upperBound on what we can set the x value of the orb to
        var planeWidth = this.getPlane().width();
        //planeHeight defines the upperbound on what we can set the y value of the orb to
        var planeHeight = this.getPlane().height();

        var c = s / 2;//center
        var r = c / 2;//radius

        var color = this.getColorController().getColor();
        //r defines a further bound on the position values
        //the orb cannot be within its radius to a wall
        var x = Math.floor(Math.random() * (planeWidth - (c + r))) - Math.round(Math.random()) * r;
        var y = Math.floor(Math.random() * (planeHeight - (c + r))) - Math.round(Math.random()) * r;

        orb.setHeight(s);
        orb.setWidth(s);
        orb.setRadius(r);
        orb.setCircleX(c);
        orb.setCircleY(c);
        orb.setColor(color);
        orb.setX(x);
        orb.setY(y);
        return orb;
    };

    this.getPaths = function(){
        return this.paths;
    };
    this.setPaths = function(p){
        this.paths = p;
        return this;
    };
    this.addPath = function(index, path){
        if(!this.paths[index]){
            this.paths[index] = [];
        }
        this.paths[index].push(path);
    };
    this.makePath = function(o1, o2){
        return new Path(o1, o2, {
            "plane": this.getPlane(),
            "stroke-width" : "2",
            "stroke" : "red"
        });
    };
    this.buildPaths = function(){
        //connect all the orb's centers with a path
        var master, slave;
        for(var i = 0; i < this.count(); i++){
            master = this.orbs[i];
            for(var j = (i + 1); j < this.count(); j++){
                slave = this.orbs[j];
                var path = this.makePath(master, slave);
                this.addPath(i, path);
            }
        }

        return this;
    };

    this.updatePaths = function(which){
        if(this.paths[which]) {
            var orb = this.orbs[which];
            for (var i = 0; i < this.paths[which].length; i++) {
                this.paths[which][i].update();
            }
        }
    };
    this.displayPaths = function(){
        for(var i = 0; i < this.getPaths().length; i++){
            for(var j = 0; j < this.paths[i].length; j++) {
                this.displayPath(this.paths[i][j]);
            }
        }
        return this;
    };
    this.displayPath = function(path){
        path.build().display();
        return this;
    };
    this._init = function(){
        this.setMaxOrbSize(this.getMaxOrbSize());
        this.setMinOrbSize(this.getMinOrbSize());

        for(var i = 0; i < this.count(); i++){
            var orb = new Orb(i, {});
            this.orbs.push(orb);
        }
    };

    this.pulse = function(delay){
        var that = this;
        var intervalID = setInterval(function(){ that.moveAll(); }, delay);
        return intervalID;
    };
    this.animateColors = function(delay){
        var that = this;
        var intervalID = setInterval(function(){
            for(var i = 0; i < that.orbs.length; i++){
                var orb = that.orbs[i];
                var color = that.getColorController().make(orb.getColor());

                //console.log(color);
               // var a = "<animate attributeName='fill' from='" + orb.getColor() + "' to='" + color + "' dur='200ms' repeatCount=1 />";
               // orb.getCircle().find("animate").remove();
                orb.setColor(color);
               // orb.setBlurAmount(orb.getBlurAmount() + (Math.pow(-1, Math.round(Math.random() + 2)) * (Math.random() * 2)));

               // orb.getCircle().append(a)
            }
        }, delay);
    };
    this.moveAll = function(){
       // console.log("moveAll");
        for(var i = 0; i < this.orbs.length; i++){
            this.moveOrb(this.orbs[i]);
        }
    };
    this.moveOrb = function(orb, newx, newy){
        var that = this;
        var y = (newy) ? newy : orb.getY() + ((Math.round(Math.random() + 1) * -1) * (Math.random() + 2));
        var x = newx ? newx : orb.getX() + ((Math.round(Math.random() + 1) * -1) * (Math.random() + 2));
        orb.getElement().animate({
            "top" :  y + "px",
            "left" : x + "px"
        }, 2000, "linear", function(){
           // console.log(orb.getId() + " complete animation");
            orb.setX(x);
            orb.setY(y);
            that.updatePaths(orb.getId());
        });
    };

    this.erratic = function(orb){
        if(!orb){
            orb = this.getRandomOrb();
        }

        //roll the dice
        var roll = Math.floor(Math.random() * 100);
        if(roll <= 30){
            //30% of the time
            var planeWidth = this.getPlane().width();
            var planeHeight = this.getPlane().height();
            var color = this.getColorController().make();
            //r defines a further bound on the position values
            //the orb cannot be within its radius to a wall
            var s = orb.getHeight() * 2;
            var r = s/4;
            var c = s/2;
            var x = Math.floor(Math.random() * (planeWidth - (c + r))) - Math.round(Math.random()) * r;
            var y = Math.floor(Math.random() * (planeHeight - (c + r))) - Math.round(Math.random()) * r;
            orb.hide();
            orb.setCircleX(c).setCircleY(c).setRadius(r).setHeight(s).setWidth(s);
            orb.show();
            this.moveOrb(orb, x, y);
        }
    };

    this.getRandomOrb = function(){
        return this.orbs[Math.floor(Math.random() * this.orbs.length)];
    };

    this.movePath = function(path){

    };
    this.numOrbs = numOrbs;
    this.orbs = [];
    this.maxOrbSize = max;
    this.minOrbSize = min;
    this.paths = opts["paths"] ? opts["paths"] : [];
    this.plane = (opts["plane"]) ? opts["plane"] : $("body");
    this.colorController = (opts["colorController"]) ? opts["colorController"] : this._colorController();

    this._init();
}//OrbController Class