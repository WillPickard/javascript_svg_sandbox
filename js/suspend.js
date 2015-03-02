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

function main() {
    $plane = makePlane().appendTo("body");
    var colorController = new ColorController("#ECECEC");
    var purple = new ColorController("#8E44AD");
    var green = new ColorController("#1E824C");
    var yellow = new ColorController("yellow");
    var red = new ColorController("red");

    PLANE = $plane;
    var o1 = new OrbController(1, 200, 100, {
        "plane": $plane,
        "colorController": colorController
    });

    o1.build().displayOrbs();
   // o1.getActuator().slideRight(o1.getOrbs(), 5000);
   // setInterval(function () {
    //    o1.getActuator().slideRight(o1.getOrbs(), 5000);
   // }, 5000);
    $("body").on("click", function(){
        o1.getActuator().slideRight(o1.getOrbs(), 5000);
    });


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








