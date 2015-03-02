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
    /***/
    /*
    var o1 = new OrbController(1, 100, 100, {
        "plane": $plane,
        "colorController": colorController,
        "blurAmount" : 6
    });
*/
    var sun = new Orb(0, $plane, {
        "blurAmount" : 50
    });

  //  sun.setX($plane.width()/2 - 250);
  //  sun.setY($plane.height()/2 - 250);
    //sun.setWidth(500);
    //sun.setHeight(500);
    sun.setRadius(100);
    sun.setCircleX(250);
    sun.setCircleY(250);
    sun.setColor("yellow");
    sun.build();

    $plane.append(sun.getElement());

    var bX = sun.getCircleX();
    var bY = sun.getCircleY();
    var particles = [];

    for(var i = 0; i < 1; i++){
        var particle = new Orb(i, $plane, {"color" : "white"});
      //  particle.setX(bX);
     //   particle.setY(bY - 200);
      //  particle.setHeight(30);
      //  particle.setWidth(30);
        particle.setCircleX(15);
        particle.setCircleY(15);
        particle.setRadius(5);
        particle.setColor("black");

        particles.push(particle);
    }

    var endpoint = new Orb(2, $plane, {});
    //endpoint.setX(bX);
   // endpoint.setY(bY + 200);
   // endpoint.setHeight(30);
   // endpoint.setWidth(30);
    endpoint.setCircleX(200);
    endpoint.setCircleY(200);
    endpoint.setRadius(5);
    endpoint.setColor("red");

    $plane.append(particles[0].getElement())
    $plane.append(endpoint.getElement());

    var path = new Path(particles[0], endpoint, {"stroke" : "green", "plane" : $plane, "stroke-width" : 2});
    path.path.attr("id", "motionPath");
    path.build().display();

    var animation = document.createElementNS('http://www.w3.org/2000/svg', "animateMotion");
    var mpath = document.createElementNS('http://www.w3.org/2000/svg', "mpath");

    animation.setAttribute("dur", "6s");
    animation.setAttribute("repeatCount", "indefinite");
    mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#motionPath");
    animation.appendChild(mpath);
    particles[0].getElement().append(animation);
   // particles[0].getElement().append('<animateMotion dur="6s" repeatCount="indefinite"> <mpath xlink:href="#motionPath"/> </animateMotion>');
/**/
}
function makePlane(){
    var plane = $("<svg height='" + PLANE_HEIGHT + "' width='" + PLANE_WIDTH +"' xmlns='http://www.w3.org/2000/svg'></svg>");
    var css = {
        "position" : "absolute",
        "left" : (WINDOW_WIDTH - PLANE_WIDTH) / 2,
        "top" : (WINDOW_HEIGHT - PLANE_HEIGHT) / 2
    };

   // plane.attr("width", PLANE_WIDTH);
  //  plane.attr("height", PLANE_HEIGHT);

    //plane.append("<p style='position: absolute; top: 5px; left: 5px; color:red'>Height: " + PLANE_HEIGHT + " width " + PLANE_WIDTH +"</p>")

   // plane.css(css);
    return plane;
}








