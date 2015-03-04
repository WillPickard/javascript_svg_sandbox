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


    o1.build().displayOrbs().getActuator().slideRight(o1.getOrbs(), "30s", true);
    o2.build().displayOrbs().getActuator().slideLeft(o2.getOrbs(), "15s", true);



    for(var i in o1.getOrbs()){
        o1.getOrbs()[i].getElement().style.opacity = 0.7;
    }

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








