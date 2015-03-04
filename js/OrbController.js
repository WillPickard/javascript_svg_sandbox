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

        if(!this.defs){
            this.defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            this.getPlane()[0].appendChild(this.defs);
        }

        this.defs.appendChild(orb.getFilter());
    };

    this.hideAll = function(){
        for(var i = 0; i < this.count(); i++){
            this.hide(this.orbs[i]);
        }
    };
    this.hide = function(orb){
          orb.getElement().hide();
    };

    this.getActuator = function() {
        return this.actuator;
    };
    this.setActuator = function(s){
        this.actuator = s;
    };

    this.addOrb = function(orb){
        this.orbs.push(orb);
        this.numOrbs = this.orbs.length;
    };

    //delete all orbs
    this.clear = function(){
        for(var i = 0; i < this.orbs.length; i++){
            this.remove(this.orbs[i]);
        }
        this.orbCount = this.orbs.length;
        this.paths = [];
    };
    this.remove = function(orb) {
        var id = orb.getId(); //index into the orbs array
        orb.getElement().remove();
        var deleted = this.orbs.splice(id, 1);
        this.orbCount = this.orbs.length;
        return deleted[0];
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
            "stroke-width" : "1",
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


    this.build = function(){
        this.setMaxOrbSize(this.getMaxOrbSize());
        this.setMinOrbSize(this.getMinOrbSize());

        this.clear();

        for(var i = 0; i < this.count(); i++) {
            var orb = new Orb(i, this.plane, {
                "blurAmount" : this.blurAmount
            });
            this.actuator.placeOrb(orb);
            this.getColorController().colorize(orb);
            this.orbs.push(orb);
        }

        return this;
    };


    this.pulse = function(delay){

    };
    this.animateColors = function(delay){

    };

    this.getRandomOrb = function(){
        return this.orbs[Math.floor(Math.random() * this.orbs.length)];
    };

    this.movePath = function(path){

    };

    this.test = function(){
        var maxX = this.plane.attr("width");
        var minX = 0;
        for(var i = 0; i < this.orbs.length; i++){
            var orb = this.orbs[i];
            var center = orb.getCenter();
            var path1 = new Path(null, null, {"stroke" : "red", "stroke-width" : "0", "plane" : this.plane});
            path1.moveTo(center[0], center[1]);
        //    path1.addCubicBezier(center, [maxX/2, center[1]/2], [maxX, center[1]]);
            path1.lineTo(maxX, center[1]);

            path1.moveTo(minX, center[1]);
            path1.lineTo(center[0], center[1]);

            orb.hide();
            orb.setCircleX("").setCircleY("");
            orb.show();



            path1.path.attr("id", "motionPath-"+orb.getId());
            path1.build().display();

            var maxT = 6;
            var t1 = (maxX - center[0]) / maxX ;
            var t2 = center[0] / maxX;

            var test = new Animation({
                "tag" : "animateMotion",
                "dur" : "6s",
                "repeatCount" : "indefinite",
                "parent" : orb.getElement()[0]
            });
            var mpath = test.makeElement("mpath");
            test.setAttributeNameSpace(mpath, "href", "#motionPath-"+orb.getId());
            test.addChild(mpath);
            test.display()

        }
    };


    this.numOrbs = numOrbs;
    this.orbs = [];
    this.maxOrbSize = max;
    this.minOrbSize = min;
    this.paths = opts["paths"] ? opts["paths"] : [];
    this.plane = (opts["plane"]) ? opts["plane"] : $("body");
    this.colorController = (opts["colorController"]) ? opts["colorController"] : this._colorController();
    this.blurAmount = opts["blurAmount"] ? opts["blurAmount"] : Math.round(Math.random() + 2);
    this.actuator =  opts["actuator"] ? opts["actuator"] : new Floater({
        "plane" : this.getPlane(),
        "orbs" : this.getOrbs(),
        "max" : this.getMaxOrbSize(),
        "min" : this.getMinOrbSize()
    });
}//OrbController Class