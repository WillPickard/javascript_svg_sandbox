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

    PLANE = $plane;
    var o1 = new OrbController(ORB_COUNT, MAX_ORB_WIDTH, MIN_ORB_WIDTH, {
        "plane" : $plane,
        "colorController" : colorController
    });
    var o2 = new OrbController(ORB_COUNT, MAX_ORB_WIDTH, MIN_ORB_WIDTH, {
        "plane" : $plane,
        "colorController" : purple
    });
    var o3 = new OrbController(ORB_COUNT, MAX_ORB_WIDTH, MIN_ORB_WIDTH, {
        "plane" : $plane,
        "colorController" : green
    });
    o1.randomizeAll().displayOrbs().pulse(2000);
    o2.randomizeAll().displayOrbs().pulse(2000);
    o3.randomizeAll().displayOrbs().pulse(2000);

    setInterval(function(){
        o1.erratic(o1.getRandomOrb());
        o2.erratic(o2.getRandomOrb());
        o3.erratic(o3.getRandomOrb());
    }, 3000);






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
        "background": "#333"
    };

    plane.css(css);
    return plane;
}








