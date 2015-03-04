//path between two orbs
function Path(opt)
{
    //this.master = o1;
    //this.slave = o2;
    this.ele = $(document.createElementNS("http://www.w3.org/2000/svg", "path"));
    this.path = this.ele;//.find("path");
    this.stroke = opt["stroke"] ? opt["stroke"] : "#000";
    this.fill = opt["transparent"] ? opt["fill"] : "transparent";
    this.plane = opt["plane"] ? opt["plane"] : "BODY";
    this.origin = opt["origin"] ? opt["origin"] : [0, 0];
    this.commands = opt["commands"] ? opt["commands"] : [];
    this.d = opt["commands"] ? opt["commands"].join(" ").join(" ") : "";
    this.useBezier = opt["useBezier"] ? opt["useBezier"] : false;
    this.strokeWidth = opt["stroke-width"] ? opt["stroke-width"] : "5";


    this.getOrigin = function(){
        return this.origin;
    };
    this.setOrigin = function(o){
        this.origin = o;
    };

    this.getElement = function(){
        return this.ele;
    };
    this.setElement = function(e){
        this.element = e;
        this._init();
    };

    this.getStroke = function(){
        return this.stroke;
    };
    this.setStroke = function(s){
        this.stroke = s;
        this.path.attr("stroke", s);
        //this.build();
    };

    this.getStrokeWidth = function(){
        return this.strokeWidth;
    };
    this.setStrokeWidth = function(s){
        this.strokeWidth = s;
        this.path.attr("stroke-width", s);
        //this.build();
    };

    this.usingBezier = function(){
        return this.useBezier;
    };
    this.setUseBezier = function(b){
        this.useBezier = b;
    };

    this.getFill = function(){
        return this.fill;
    };
    this.setFill = function(f){
        this.fill = f;
        this.path.attr("fill", f);
       // this.build();
    };

    this.getPlane = function(){
        return this.plane;
    };
    this.setPlane = function(p){
        this.plane = p;
    };

    this.getD = function(){
        return this.d;
    };
    this.setD = function(d){
        this.d = d;
        this.path.attr("d", d);
        //this.build();
    };

    this.addCommand = function(comm, i){
        if(i){
            //i represents the index of the command that will precede the newly added one
            var removed = this.commands.splice(i, 0, comm);
            return this;
        }
        this.commands.push(comm);
        return this;
    };
    this.moveTo = function(x, y){
        var c = ["M", x, y];
        return this.addCommand(c);
    };
    this.lineTo = function(x, y){
        var c = ["L", x, y];
        return this.addCommand(c);
    };
    this.horizontalLineTo = function(x){
        var c = ["H", x];
        return this.addCommand(c);
    };
    this.verticalLineTo = function(x){
        var c = ["V", x];
        return this.addCommand(c);
    };
    //add a cubic bezier to the curve
    //curveStart is where we want the curve to start,
    //curveEnd is where the curve will end
    //and lineEnd is where the line itself will end
    //each parameter should be an array of size 2 of form [x, y] where x and y are coordinates
    this.addCubicBezier = function(curveStart, curveEnd, lineEnd){
        var c = ["C", curveStart, curveEnd, lineEnd];
        return this.addCommand(c);
    };

    this.update = function(){
        this.commands = [];
        this.setD("");
       // this.buildConnection();
        return this;
    };

    this.buildConnection = function(){
        //build it with the master and slave
        var mCenter = this.getMaster().getCenter();
        var sCenter = this.getSlave().getCenter();
        var mx, my, sx, sy;
        mx = this.getMaster().getX() + mCenter[0];
        my = this.getMaster().getY() + mCenter[1];
        sx = this.getSlave().getX() + sCenter[0];
        sy = this.getSlave().getY() + sCenter[1];

        if(this.usingBezier()){
            this.moveTo(mx, my);
            this.addCubicBezier([mx, my], [sx, sy], [sx, sy]);
        }
        else {
            this.moveTo(mx, my);
            this.lineTo(sx, sy);
        }
        d = this.commandsToString();
        this.setD(d);
        return this;
    };

    this.build = function(){
        this.setFill(this.getFill());
        this.setStroke(this.getStroke());
        this.setStrokeWidth(this.getStrokeWidth());

        var d = this.commandsToString();
        if(d.length <= 0){
            this.buildConnection();
        }
        else {
            this.setD(d);
        }

        return this;
    };

    this.commandsToString = function(s, c){
        var string = s;
        if(!string) string = "";

        var commands = c;
        if(!commands) commands = this.commands;

       // console.log(commands);
        for(var i = 0; i < commands.length; i++){
            var cons = commands[i].constructor;
            if(cons == Array){
            //    console.log(commands[i] + " is array");
                switch (commands[i][0]){
                    case "C":
                    case "c":
                    case "S":
                    case "s":
                    case "Q":
                    case "q":
                    case "T":
                    case "t":
                    default:
                       string = this.commandsToString(string, commands[i]) + " ";
                }//switch
            }
            else if (cons == String){
             //   console.log(commands[i] + " is string");
                string += commands[i] + " ";
            }
            else if (cons == Number){
           //     console.log(commands[i] + " is number");
                string += commands[i] + " ";
            }
            else {
            //    console.log(commands[i] + " is " + cons)
            }
        }
        //var d = this.commands.join(" ");
     //   console.log("done: " , string);
        return string.trim();
    };

    this.flushCommands = function(){
        var d = this.commandsToString();
        this.setD(d);
        return this;
    };
    this.display = function(){
        this.getPlane().append(this.getElement());
        return this;
    };
    this._init = function(){
     /*
        this.ele.css({
            "height" : this.getPlane().height() + "px",
            "width" : this.getPlane().width() + "px",
            "position" : "absolute",
            "top": 0,
            "left": 0
        });
        */
        return this.build();
    };
  //  this._init();
}