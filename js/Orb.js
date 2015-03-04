function Orb(id, plane, opts) {
    this.id = id;
    this.z = 1;
    this.radius = opts["radius"] ? opts["radius"] : 0;
    this.color = "#000";
    this.plane = plane;
    this.blurAmount = opts["blurAmount"] ? opts["blurAmount"] : Math.round(Math.random() + 2);
    this.animations = opts["animations"] ? opts["animations"] : [];
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    //this.circle = this.elemenet;//$(this.ele).find("circle");
    this.filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    this.blurEffect = document.createElementNS("http://www.w3.org/2000/svg","feGaussianBlur");
   // this.element.appendChild(this.filter);
    this.filter.appendChild(this.blurEffect);
    this.c_x = 0;
    this.c_y = 0;
    this.currentAnimation = 0;
    this.animations = [];
    this.intervalId = 0;

    this.newAnimation = function(){

    };

    this.addAnimation = function(a){
        this.animations.push(a);
        return this;
    };

    this.setAnimations = function(s){
        this.animations = s;
        return this;
    };

    this.animateStep = function(i){
        var that = this;
        if(!i){
            i = this.currentAnimation;
            this.currentAnimation++;
        }

        if(i < this.animations.length){
            this.getElement().promise().done(function(){
              //  console.log(that.animations[i][0]);
                this.animate(that.animations[i][0], that.animations[i][1], "linear", function(){
                    if(that.animations[i])
                    {
                        that.animateStep();
                    }
                    if(that.animations[i][2]){
                        that.animations[i][2]();
                    }
                });
            });
        }
    };

    this.play = function(){
        this.animateStep();
    };

    this.loop = function(){
        //compute the total length of each cycle of animations
       // var time = 0;
        //for(var i = 0; i < this.animations.length; i++){
         //   time += this.animations[i][2];
       // }
        var that = this;
        var last = this.animations[this.animations.length - 1];
        var temp;
        if(last.length === 3){
            temp = last[2];
        }
        last[2] = function(){
            if(temp){
                temp();
            }
            that.currentAnimation = 0;
            that.play();
        };

        this.play();

        /*var that = this;
        this.intervalId = setInterval(function(){
            that.currentAnimation = 0;
            that.play();
        }, time);*/
    };

    this.stop = function(){
        clearInterval(this.intervalId);
    };

    this.setZ = function(z){
        this.z = z;
       // this.getElement().css({"z-index":z});
        return this;
    };
    this.getZ = function(z){
        return z;
    };

    this.getId = function() {
        return this.id;
    };
    this.setId = function(d) {
        this.id = d;
       // this.filter.attr("id", "orbfilter_" + d);
       // this.circle.attr("filter", "url(#orbfilter_" + id + ")");
        return this;
    };

    this.getX = function () {
        return this.x
    };
    this.setX = function (x) {
        this.x = x;
        this.ele.attr("x", x );
        return this;
    };

    this.getY = function () {
        return this.y;
    };
    this.setY = function (y) {
        this.y = y;
        this.ele.attr("y", y);
        return this;
    };

    this.getCircleX = function() {
        return this.c_x;
    };
    this.setCircleX = function(x) {
        this.c_x = x;
        this.element.setAttribute("cx", x);
        return this;
    };

    this.getCircleY = function() {
        return this.c_y;
    };
    this.setCircleY = function(y) {
        this.c_y = y;
        this.element.setAttribute("cy", y);
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
        this.blurEffect.setAttribute("stdDeviation", i);
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
        this.element.setAttribute("fill", c);
        return this;
    };

    this.getRadius = function(){
        return this.radius;
    };
    this.setRadius = function(r){
        this.radius = r;
        this.element.setAttribute("r", r);
        return this;
    };

    this.getElement = function () {
        return this.element;
    };

    this.getFilter = function() {
        return this.filter;
    };

    this.build = function(){
        this._init();
    };

    this.show = function(){
        this.element.style.display = "block";
       return this;
    };
    this.hide = function(){
        this.element.style.display = "none";
        return this;
    };

    //init the orb to default values
    var base_css = {
        "position" : "absolute"
    };



    this._init = function() {
      //  this.ele.css(base_css);
        this.setId(this.id);
        //this.setX(this.x);
       // this.setY(this.y);
      //  this.setWidth(this.width);
      //  this.setHeight(this.height);
        this.setColor(this.color);
        this.setRadius(this.radius);

        this.filter.setAttribute("height", "200%");
        this.filter.setAttribute("width", "200%");
        this.filter.setAttribute("x", "-50%")
        this.filter.setAttribute("y", "-50%");

        this.blurEffect.setAttribute("in", "SourceGraphic");
        this.setBlurAmount(this.blurAmount);
        var timestamp = Math.round(new Date().getTime() * Math.random());
        var id = "filter-" + timestamp;
        this.element.setAttribute("filter", "url(#"+id+")");
        this.filter.setAttribute("id", id)
    };
    this._init();
}//Orb class