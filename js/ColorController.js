function ColorController(color){
    this.color = color;

    this.getColor = function(){
        /*
        var r, g, b;
        r = Math.floor(Math.random() * 255);
        g = Math.floor(Math.random() * 255);
        b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + ","+ b+ ")";*/
        return this.color;
    };
    this.setColor = function(color){
        this.color = color;
    };

    this.make = function(color){
        /*
        if(color.indexOf("rgb") >= 0){
            color = color.substr(3);
            var parts = color.split(",");
            var r = parseInt(parts[0].replace("(", ""));
            var g = parseInt(parts[1]);
            var b = parseInt(parts[2].replace(")", ""));

            r = Math.round(r + (Math.pow(-1, Math.round(Math.random() + 2)) * (Math.random() * 5)));
            g = g + Math.round((Math.pow(-1, Math.round(Math.random() + 2)) * (Math.random() * 5)));
            b = b + Math.round((Math.pow(-1, Math.round(Math.random() + 2)) * (Math.random() * 5)));

            var ret =  "rgb(" + r + "," + g + ","+ b+ ")";


            return ret;
        }
        */
        var r, g, b;
        r = Math.floor(Math.random() * 255);
        g = Math.floor(Math.random() * 255);
        b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + ","+ b+ ")";
      ///  return this.getColor();
    };
}