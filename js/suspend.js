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
    main();
});

function main(){
    $plane = makePlane().appendTo("body");
    var colorController = new ColorController("#ECECEC");
    var purple = new ColorController("#8E44AD");
    var green = new ColorController("#1E824C");
    var yellow = new ColorController("yellow");
    var red = new ColorController("red");

    PLANE = $plane;
    var o1 = new OrbController(200, 15, 3, {
        "plane" : $plane,
        "colorController" : colorController
    });
   /**
    var o2 = new OrbController(ORB_COUNT, MAX_ORB_WIDTH, MIN_ORB_WIDTH, {
        "plane" : $plane,
        "colorController" : purple
    });
    var o3 = new OrbController(60, 20, 10, {
        "plane" : $plane,
        "colorController" : green
    });
    var o4 = new OrbController(10, 20, 10, {
        "plane" : $plane,
        "colorController" : yellow
    });
    var o5 = new OrbController(100, 10, 5, {
        "plane" : $plane,
        "colorController" : red
    });
**/
    o1.build().displayOrbs();
    o1.pulse(400);
    setInterval(function(){
        //o1.getActuator().slideLeft(o1.getOrbs(), 200);
    }, 200);
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

    plane.css(css);
    return plane;
}








