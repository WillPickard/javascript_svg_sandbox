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
    //PLANE.css({"background" : "black"});
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
/*
    var r = 200;
    var c = 2 * Math.PI * r;
    var point_r = 20;
    var n_orbs = 50;
    var origin = [250, 250];
    var dx = (2*r) / n_orbs;
    var circumference = new Path({"stroke": "blue", "stroke-width" : 1});
    circumference.getElement().setAttribute("id", "circlePath");
    //circumference.moveTo(origin[0], origin[1]);
    var points = [n_orbs]; //for the circumference

    for(var i = 0; i < n_orbs; i++){
        var x, y;
        x = (origin[0] - r) + (dx * i);
        var pointIndex = 0;
        //evens are below x-axis and odds are above
        if(i % 2 === 0){
            //even
            y = origin[1] - (Math.sqrt(Math.pow(r,2) - Math.pow(x - origin[0], 2)));
            pointIndex = i / 2;
        }
        else{
            y = origin[1] + (Math.sqrt(Math.pow(r,2) - Math.pow(x - origin[0], 2)));
            pointIndex = n_orbs - (i + 1)/2;
        }

        //x^2+y^2+z^2=r^2
        var relx, rely;
        relx = x - origin[0];
        rely = y - origin[1];
        var z = Math.sqrt(Math.pow(r, 2) - Math.pow(relx, 2) - Math.pow(rely, 2));
   //     console.log("(" + relx + ", " + rely + ", " + z + ")");
        var orb = new Orb("orb"+i, $plane, {
            "radius" : point_r,
            "blurAmount": 0,
            "withFilter": false
        });
      //  orb.setX(x);
      //  orb.setY(y);
        orb.setColor("red");
        $plane.append(orb.getElement());

        var id = "circlePath-"+i;
        var p = new Path({
           "plane" : $plane,
            "stroke-width": 0
        });
        p.getElement().setAttribute("id", id);
        p.moveTo(x, y);

        var a = new Animation({
            "tag" : "animateMotion",
            "dur" : "10s",
            "repeatCount" : "indefinite",
            "parent" : orb.getElement()
        });

        var ar = new Animation({
            "tag" : "animate",
            "attributeName" : "r",
            "from" : point_r,
            "to" : point_r + (point_r / 3),
            "dur" : "3s",
            "repeatCount" : "indefinite",
            "parent" : orb.getElement()
        });

        var mpath = a.makeElement("mpath");
        a.setAttributeNameSpace(mpath, "href", "#" + id);
        a.addChild(mpath);
        a.display();

        ar.display();

        points[pointIndex] = [x, y, p];
    }

    for(var i = 0; i < points.length; i++){
        if(i == 0)
            circumference.moveTo(points[i][0], points[i][1]);
        else
            circumference.lineTo(points[i][0], points[i][1]);
        var j = (i == points.length - 1) ? 0 : i + 1;

        while(j !== (i)){
            points[i][2].lineTo(points[j][0], points[j][1]);
            if(j >= points.length - 1){
                j = 0;
            }
            else{
                j++;
            }
        }

        points[i][2].build().display();
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
    circumference.build();

    $plane.append(x_axis.getElement());
    $plane.append(y_axis.getElement());
   // $plane.append(circumference.getElement());

    //trying to compute sphere
    makeSphere([0, 0, 0], 3, 1);
    */

    test();
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
    // plane.attr("height", PLANE_HEIGHT);

    // plane.append("<p style='position: absolute; top: 5px; left: 5px; color:red'>Height: " + PLANE_HEIGHT + " width " + PLANE_WIDTH +"</p>")

    // plane.css(css);
    return plane;
}

function makeSphere(origin, radius, accuracy)
{
    var cx = origin[0];
    var cy = origin[1];
    var cz = origin[2];

    var minX = cx - radius;
    var maxX = cx + radius;

    var maxY = cy + radius;
    var minY = cy - radius;

    var maxZ = cz + radius;
    var minZ = cz - radius;

    var diameter = 2 * radius;
    var totalPoints = diameter / accuracy;
    var dx = diameter / totalPoints;

    var points = []; //3d array

    //for each possible x, there are +-y and +-z
    //  for each +-z
    //      there are <y>
    //  foreach +-y
    //      there are <z>

    var x, y, z, r_s, x_s, y_s, p_y, n_y, p_z, n_z;
    r_s = Math.pow(radius, 2);
    for(x = minX; x < maxX; x+=dx)
    {
        console.log("x: " + x);
        points[x] = {
            "y" : [],
            "z" : []
        };
        x_s = Math.pow(x, 2);
        y = Math.sqrt(r_s - x_s);
        p_y = y;
        n_y = 0 - y;

        var dy = p_y / (radius - accuracy);
       // console.log("py : " + p_y + " dy: " + dy);
        for(y = 0; y < p_y; y+=dy){
            z = spherePoint(radius, x, y);
            points[x]["y"][y] = z;
        }
        var iters = 0;
        for(y = 0; y > n_y; y-=dy)
        {
       //     if(iters++ > 10) break;
            console.log(y);
            points[x]["y"][y] = spherePoint(radius, x, y);
        }
   //     console.log("\t" + n_y);
    }
    console.log("points: ");
    console.log(points);
}

//given radius return the possible points
//for f(p1,p2)
//result is array with 0: + and 1: -
function spherePoint(r, p1, p2){
    var r_s, p1_s, p2_s, res, p3;

    r_s = Math.pow(r,2);
    p1_s = Math.pow(p1, 2);
    p2_s = Math.pow(p2, 2);

    res = [];

    p3 = Math.sqrt(r_s - p1_s - p2_s);

    res.push(p3);
    res.push(p3 * -1);
    return res;
}

function makeCircle(r, dx) {
    var totalPoints = (2*r) / dx;
    var minX = (-1) * r;
    var maxX = r;
    var points = [];

    var currentX = minX;
    for(var i = 0; i <= totalPoints; i++){
        var ys = circlePoint(r, currentX);
        for(var y in ys) {
            points.push([currentX, ys[y]]);
        }
        currentX += dx;
    }

    return points;

}

function circlePoint(r, p) {
    var r_s, p_s, res;
    r_s = Math.pow(r,2);
    p_s = Math.pow(p,2);
    res = Math.sqrt(r_s - p_s);

    var ret = [];
    ret.push(res);
    if(res !== 0){
        ret.push(-1 * res);
    }

    return ret;
}


function test(){

    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;

    var origin = [centerX/2, centerY];
    createGrid(origin, 250);

    var r = 100;
    var dx = 1;
    var points = makeCircle(r, dx);

    var o_opts = {
        "radius": 1,
        "color": "black",
        "withFilter": false
    };

    var x, y,point;
    for(var i = 0; i < points.length; i++) {
        point = new Orb(i, $plane, o_opts);

        x = origin[0] + points[i][0];
        y = origin[1] + points[i][1];

        point.setX(x);
        point.setY(y);
        displayThing(point);
    }

    var square_origin = [centerX + centerX/2, centerY];
    createGrid(square_origin, 250);
    var s = 200;
    var cube = Cube(square_origin, s);

    displayThings(cube);
}

function displayThing(thing)
{
    $plane.append(thing.getElement());
}

function displayThings(things){
    for(var i in things){
        displayThing(things[i]);
    }
}

function createGrid(origin, length){
    var maxX, minX, maxY, minY;

    maxX = origin[0] + length;
    minX = origin[0] - length;

    maxY = origin[1] + length;
    minY = origin[1] - length;

    var x_axis, y_axis;
    var opts = {
        "stoke" : "black",
        "stroke-width" : "1"
    };
    x_axis = new Path(opts);
    y_axis = new Path(opts);

    x_axis.moveTo(minX, origin[1]);
    x_axis.lineTo(maxX, origin[1]);
    y_axis.moveTo(origin[0], minY);
    y_axis.lineTo(origin[0], maxY);

    x_axis.build();
    y_axis.build();

    displayThing(x_axis);
    displayThing(y_axis);
}

function Square(origin, s){
    var opts = {
        "stroke" : "black",
        "stroke-width" : 1
    };

    var ox = origin[0];
    var oy = origin[1];

    var hs = s/2; //half of side to avoid redundant computation
    var minX, maxX, minY, maxY;
    minX = ox - hs;
    maxX = ox + hs;
    minY = oy - hs;
    maxY = oy + hs;

    var path  = new Path(opts);

    path.moveTo(minX, maxY);
    path.lineTo(maxX, maxY);
    path.lineTo(maxX, minY);
    path.lineTo(minX,minY);
    path.lineTo(minX, maxY);

    path.build();
    return path;
}

function Cube(origin, s) {
    var lines = [];

    var ox = origin[0];
    var oy = origin[1];
    var hs = s/2; //half of side to avoid redundant computation
    var minX, maxX, minY, maxY;
    minX = ox - hs;
    maxX = ox + hs;
    minY = oy - hs;
    maxY = oy + hs;

    var vertices = [];
    var s4 = s/2; //save time computing and typing
    //vertices for front side
    vertices.push([minX, maxY]); //bottom left - 0
    vertices.push([maxX, maxY]); //bottom right - 1
    vertices.push([maxX, minY]); //top right - 2
    vertices.push([minX, minY]); //top left - 3
    //vertices for back side
    vertices.push([minX + s4, maxY - s4]); //bottom left - 4
    vertices.push([maxX + s4, maxY - s4]); //bottom right - 5
    vertices.push([maxX + s4, minY - s4]); //top right - 6
    vertices.push([minX + s4, minY - s4]); //top left - 7

    for(var v = 0; v < vertices.length; v++ ){
        var point = new Orb("vertex"+v, $plane,{
            "radius" : "2",
            "color" : "black",
            "withFilter" : false
        });
        point.setX(vertices[v][0]).setY(vertices[v][1]);
        displayThing(point);
    }
    var front, back, left, right, top, bottom;
    var base_opts = {
        "stroke" : "black",
        "stroke-width" : "1"
    };

    front = Square(origin, s);
    back = Square([origin[0] + s/4, origin[1] - s/4], s);
    top = new Path(base_opts);
    left = new Path(base_opts);
    right = new Path(base_opts);
    bottom = new Path(base_opts);

    top.moveTo(vertices[3][0], vertices[3][1])
        .lineTo(vertices[7][0], vertices[7][1])
        .lineTo(vertices[6][0], vertices[6][1])
        .lineTo(vertices[2][0], vertices[2][1])
        .lineTo(vertices[3][0], vertices[3][1])
        .build();

    bottom.moveTo(vertices[0][0], vertices[0][1])
        .lineTo(vertices[4][0], vertices[4][1])
        .lineTo(vertices[5][0], vertices[5][1])
        .lineTo(vertices[1][0], vertices[1][1])
        .lineTo(vertices[0][0], vertices[0][1])
        .build();

    left.moveTo(vertices[0][0], vertices[0][1])
        .lineTo(vertices[3][0], vertices[3][1])
        .lineTo(vertices[7][0], vertices[7][1])
        .lineTo(vertices[4][0], vertices[4][1])
        .lineTo(vertices[0][0], vertices[0][1])
        .build();

    right.moveTo(vertices[1][0], vertices[1][1])
        .lineTo(vertices[2][0], vertices[2][1])
        .lineTo(vertices[6][0], vertices[6][1])
        .lineTo(vertices[5][0], vertices[5][1])
        .lineTo(vertices[1][0], vertices[1][1])
        .build();

    top.setFill("black");
    front.setFill("black");
    bottom.setFill("black");
    back.setFill("black");
    right.setFill("black");
    left.setFill("black");

    front.getElement().style.opacity = 0.3;
    top.getElement().style.opacity = 0.5;
    bottom.getElement().style.opacity = 0.5;
    back.getElement().style.opacity = 0.5;

    lines.push(back);
    lines.push(front);
    lines.push(top);
    lines.push(bottom);
    lines.push(left);
    lines.push(right);
    return lines;
}


