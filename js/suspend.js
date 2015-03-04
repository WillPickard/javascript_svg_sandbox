var ORB_COUNT = 30;
var MAX_ORB_HEIGHT = 100;
var MAX_ORB_WIDTH = 50;

var MIN_ORB_HEIGHT = 50;
var MIN_ORB_WIDTH = 20;

var PLANE_WIDTH = $(window).width();
var PLANE_HEIGHT = $(window).height();
var PLANE = null;
var WINDOW_WIDTH = $(window).width();
var WINDOW_HEIGHT = $(window).height();

$(document).ready(function(){
    $("body").css({"overflow-x" : "hidden"});
    main();
});

function main() {
    $plane = makePlane().appendTo("body");
   // $("body").append("<svg height='100' width='100'></svg>");
    /**/
    var colorController = new ColorController("#ECECEC");
    var purple = new ColorController("#8E44AD");
    var green = new ColorController("#1E824C");
    var yellow = new ColorController("yellow");
    var red = new ColorController("red");

    PLANE = $plane;
    PLANE.css({"background" : "black"});
    /***/
    /**/
    var o1 = new OrbController(100, 50, 50, {
        "plane": $plane,
        "colorController": colorController,
        "blurAmount" : 10
    });

    var o2 = new OrbController(50, 20, 20, {
        "plane" : $plane,
        "colorController":  colorController,
        "blurAmount" : 2
    });

    var o3 = new OrbController(50, 50, 50, {
        "plane" : $plane,
        "colorController":  yellow,
        "blurAmount" : 0,
        "actuator" : function(){
            this.placeOrb = function(orb){
                
            };
        }
    });


  //  o1.build().displayOrbs().getActuator().slideRight(o1.getOrbs(), "30s", true);
   // o2.build().displayOrbs().getActuator().slideLeft(o2.getOrbs(), "15s", true);


    for(var i in o1.getOrbs()){
        o1.getOrbs()[i].getElement().style.opacity = 0.7;
    }

    var orb1 = new Orb("orb1", $plane, {
        "radius" : 25,
        "blurAmount": 0,
        "withFilter": false
    });
    var orb2 = new Orb("orb2", $plane, {
        "radius" : 25,
        "blurAmount": 0,
        "withFilter": false
    });

    orb1.setColor("red");
    orb2.setColor("red");

    orb1.setX(500).setY(100);
    orb2.setX(1000).setY(100);

    var connection = o1.connectOrbs(orb1, orb2);
   // console.log(connection);
   // $plane.append(connection.getElement());

    //$plane.append(orb1.getElement());
   // $plane.append(orb2.getElement());

    var r = 200;
    var c = 2 * Math.PI * r;

    var point_r = 10;
    var n_orbs = 50;
    var origin = [700, 250];
    var dx = c / n_orbs;

    for(var i = 0; i < n_orbs; i++){
        var x, y;
        x = (origin[0] -r) + dx * i;
        y = origin[1] +  Math.sqrt(Math.pow(r,2) - Math.pow(x - origin[0], 2));
        var orb = new Orb("orb"+i, $plane, {
            "radius" : point_r,
            "blurAmount": 0,
            "withFilter": false
        });
        orb.setX(x);
        orb.setY(y);
        orb.setColor("red");
        $plane.append(orb.getElement());
    }

    var x_axis = new Path({
        "stroke" : "green",
        "stroke-width" : "3"
    });
    var y_axis = new Path({
        "stroke" : "green",
        "stroke-width" : "3"
    });

    x_axis.moveTo(origin[0] - r, origin[1]).lineTo(origin[0] + r, origin[1]);
    y_axis.moveTo(origin[0], origin[1] - r).lineTo(origin[0], origin[1] + r);
    x_axis.build();
    y_axis.build();

    $plane.append(x_axis.getElement());
    $plane.append(y_axis.getElement());

}
function makePlane(){
    var plane = $("<svg height='" + PLANE_HEIGHT + "' width='" + PLANE_WIDTH +"' xmlns='http://www.w3.org/2000/svg'></svg>");
    var css = {
        "position" : "absolute",
        "left" : (WINDOW_WIDTH - PLANE_WIDTH) / 2,
        "top" : (WINDOW_HEIGHT - PLANE_HEIGHT) / 2
    };
    plane.css(css);
   // plane.attr("width", PLANE_WIDTH);
  //  plane.attr("height", PLANE_HEIGHT);

    //plane.append("<p style='position: absolute; top: 5px; left: 5px; color:red'>Height: " + PLANE_HEIGHT + " width " + PLANE_WIDTH +"</p>")

   // plane.css(css);
    return plane;
}








