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
    var colorController = new ColorController("#ECECEC");
    var purple = new ColorController("#8E44AD");
    var green = new ColorController("#1E824C");
    var yellow = new ColorController("yellow");
    var red = new ColorController("red");

    PLANE = $plane;
    /***/
    var o1 = new OrbController(1, 100, 100, {
        "plane": $plane,
        "colorController": colorController,
        "blurAmount" : 6
    });
    /**/
    /**
    var o2 = new OrbController(100, 20, 20, {
        "plane" : $plane,
        "colorController" : green,
        "blurAmount": 7
    });
    var o3 = new OrbController(1, 100, 100, {
        "plane" : $plane,
        "colorController" :red,
        "blurAmount" : 25
    });
    var o4 = new OrbController(1, 100, 100, {
        "plane" : $plane,
        "colorController" :green
    });
    */
   // o1.build().displayOrbs();
   // o1.getActuator().slideLeft(o1.getOrbs(), 2000, true);
    var sun = new Orb(0, {
        "blurAmount" : 50
    });
    sun.setX(50);
    sun.setY(50);
    sun.setWidth(500);
    sun.setHeight(500);
    sun.setRadius(100);
    sun.setCircleX(250);
    sun.setCircleY(250);
    sun.setColor("yellow");
    sun.build();

    var particles = [];
    
    var particle = new Orb(1, {
        "blurAmount" : 3
    });
    particle.setX(50);
    particle.setY(50);
    particle.setWidth(100);
    particle.setHeight(100);
    particle.setRadius(25);
    particle.setCircleX(50);
    particle.setCircleY(50);
    particle.setColor("white");
    particle.build();


    $plane.append(sun.getElement()).append(particle.getElement());


}
function makePlane(){
    var plane = $("<div></div>");
    var css = {
        "height" : PLANE_HEIGHT + "px",
        "width" : PLANE_WIDTH + "px",
        "position" : "absolute",
        "left" : (WINDOW_WIDTH - PLANE_WIDTH) / 2,
        "top" : (WINDOW_HEIGHT - PLANE_HEIGHT) / 2,
        //"border" : "1px solid red",
        "background": "#000"
    };

    plane.append("<p style='position: absolute; top: 5px; left: 5px; color:red'>Height: " + PLANE_HEIGHT + " width " + PLANE_WIDTH +"</p>")

    plane.css(css);
    return plane;
}








