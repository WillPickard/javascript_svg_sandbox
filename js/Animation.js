function Animation(opts)
{
    this.tag            = opts["tag"] ? opts["tag"] : "";
    this.element        = opts["element"] ? opts["element"] : "";
    this.dur            = opts["dur"] ? opts["dur"] : 0;
    this.from           = opts["from"] ? opts["from"] : "";
    this.to             = opts["to"] ? opts["to"] : "";
    this.attributeName  = opts["attributeName"] ? opts["attributeName"] : "";
    this.repeatCount    = opts["repeatCount"] ? opts["repeatCount"] : 0;
    this.begin          = opts["begin"] ? opts["begin"] : 0;
    this.fill           = opts["fill"] ? opts["fill"] : "";
    this.d              = opts["d"] ? opts["d"] : "";
    this.id             = opts["id"] ? opts["id"]: "";
    this.parent         = opts["parent"] ? opts["parent"] : null;
    this.children       = opts["children"] ? opts["children"] : [];
    this.attributes     = [];
    this.validAttributes = ["dur", "from", "to", "attributeName", "repeatCount", "begin", "fill", "d", "id"];


    this.print = function(){
        for(var prop in this){
            if(this.prop){
                console.log(prop, " : ", this.prop);
            }
        }
    };

    this.attr = function(prop, val){
        if(prop && val){
            //prop and val means set this.prop
            this.prop = val;
            if(this.element){
                this.element.setAttribute(prop, this.prop);
            }
            return this
        }
        else if (prop && !val){
            //prop and !val means return prop
            return this.prop;
        }

        return this;
    };

    this.makeElement = function(tag){
        return document.createElementNS('http://www.w3.org/2000/svg', tag);
    };

    this.getElement = function(){
        return this.element;
    };

    this.addChildren = function(c){
        for(var i = 0; i < c.length; i++){
            this.addChild(c[i]);
        }
    };

    this.addChild = function(c){
        this.children.push(c);
        if(this.element){
            this.element.appendChild(c);
        }
    };

    this.display = function(){
        if(this.parent && this.element){
            this.parent.appendChild(this.element);
        }
    };

    this.setAttributeNameSpace = function(ele, attr, val){
        ele.setAttributeNS('http://www.w3.org/1999/xlink', attr, val);
        return ele;
    };

    this._init = function(){
        if(this.tag){
            this.element = this.makeElement(this.tag);
            for(var i = 0; i < this.validAttributes.length; i++){
                var a = this.validAttributes[i];
              //  console.log(a, " : " , this[a]);
                if(this[a]){
                    this.attr(a, this[a]);
                }
            }

        }

    };

    this._init();
};