function Orb(id, opts) {
    this.id = id;
    this.x = 0;
    this.y = 0;
    this.height = 0;
    this.width = 0;
    this.radius = 0;
    this.color = "#000";
    this.blurAmount = Math.round(Math.random() + 2) ;

    this.ele = $("<svg><defs>" +
    "<filter>" +
    "<feGaussianBlur />" +
    "</filter>"+
    "</defs>" +
    "<circle />" +
    "</svg>");
    this.circle = $(this.ele).find("circle");
    this.filter = $(this.ele).find("filter");
    this.blurEffect = $(this.ele).find("feGaussianBlur");
    this.c_x = 0;
    this.c_y = 0;

    this.getId = function() {
        return this.id;
    };
    this.setId = function(d) {
        this.id = d;
        this.filter.attr("id", "orbfilter_" + d);
        this.circle.attr("filter", "url(#orbfilter_" + id + ")");
        return this;
    };

    this.getX = function () {
        return this.x
    };
    this.setX = function (x) {
        this.x = x;
        this.ele.css({"left" : x + "px"});
        return this;
    };

    this.getY = function () {
        return this.y;
    };
    this.setY = function (y) {
        this.y = y;
        this.ele.css({"top" : y + "px"});
        return this;
    };

    this.getCircleX = function() {
        return this.c_x;
    };
    this.setCircleX = function(x) {
        this.c_x = x;
        this.circle.attr("cx", x);
        return this;
    };

    this.getCircleY = function() {
        return this.c_y;
    };
    this.setCircleY = function(y) {
        this.c_y = y;
        this.circle.attr("cy", y);
        return this;
    };

    this.getCenter = function(){
        return [this.getCircleX(), this.getCircleY()];
    };

    this.getHeight = function () {
        return this.height;
    };
    this.setHeight = function (h) {
        this.height = h;
        this.ele.attr("height", h);
        return this;
    };

    this.getWidth = function () {
        return this.width;
    };
    this.setWidth = function (w) {
        this.width = w;
        this.ele.attr("width", w);
        return this;
    };

    this.getBlurAmount = function() {
        return this.blurAmount;
    };
    this.setBlurAmount = function(i) {
        this.blurAmount = i;
        this.blurEffect[0].setAttribute("stdDeviation", i);
        return this;
    };

    this.getBlurEffect = function() {
        return this.blurEffect;
    };

    this.getColor = function () {
        return this.color;
    };
    this.setColor = function (c) {
        this.color = c;
        this.circle.attr("fill", c);
        return this;
    };

    this.getRadius = function(){
        return this.radius;
    };
    this.setRadius = function(r){
        this.radius = r;
        this.circle.attr("r", r);
        return this;
    };

    this.getElement = function () {
        return this.ele;
    };

    this.getCircle = function() {
        return this.circle;
    };

    this.getFilter = function() {
        return this.filter;
    };

    this.build = function(){
        this._init();
    };

    this.show = function(){
       return this.getElement().show();
    };
    this.hide = function(){
        return this.getElement().hide();
    };

    //init the orb to default values
    var base_css = {
        "position" : "absolute"
    };

    this._init = function() {
        this.ele.css(base_css);
        this.setId(this.id);
        this.setX(this.x);
        this.setY(this.y);
        this.setWidth(this.width);
        this.setHeight(this.height);
        this.setColor(this.color);
        this.setRadius(this.radius);
        this.filter.attr("height", "200%").attr("width", "200%").attr("x", "-50%").attr("y", "-50%");
        this.blurEffect.attr("in", "SourceGraphic");
        this.setBlurAmount(this.blurAmount);
    };
    this._init();
}//Orb class