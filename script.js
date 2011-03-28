function goCommand() {
    //var clre = \\w*[^\/]\;
    this.lsre = /\/{1}/;
    this.cmre = /(^dir(\s)?)|(^cd\s)|(^cd\.\.$)|(^cd\s\/)/;
    this.me = document.getElementById("me");
    this.currentpath = document.getElementById("cd");
    this.msg = document.getElementById("msg");
    this.storeEntries = new Array();
    this.curpathArray = new Array();
    this.parpathArray = new Array();
    this.cmd = "";

    this.parseCLI = function(val) {
        this.cmd = val.match(this.cmre);
        if (this.cmd !== null) {
            this.cmd = this.cmd[0];
            this.parpathArray = val.replace(this.cmd,"").split(this.lsre);
            console.log("cmd: " + this.cmd);
            console.log("partial path: " + this.parpathArray);
        }
    }
    
    this.store = function() {
        var msgtext = "";
        this.parseCLI(this.me.value);
        this.storeEntries.push(this.me.value);
        var tempcurpath = this.curpathArray.join("\\");
        switch (this.cmd) {
            case "cd ":
                //Move down a directory
                if (this.parpathArray !== null && this.parpathArray.length > 0) {
                    //var temp2 = this.hasPathBadChars(this.parpathArray);
                    //var temp3 = this.getDirContents(this.curpathArray.concat(this.parpathArray));
                    if(this.isPathGood(this.parpathArray) && this.isPathInNav(this.curpathArray.concat(this.parpathArray))  ) {
                        this.currentpath.innerHTML = this.updateCurrentPathArray(this.curpathArray,this.parpathArray).join("\\");
                    }
                    else {
                        msgtext = "The system cannot find the path specified";
                    }
                }
                break;
            case "dir":
                //list directory contents
                var contents = this.getDirContents(this.curpathArray);
                msgtext = contents !== null ? contents.join("<br />") : "The system cannot find the path specified";
                //msgtext = "Future list of directory";
                break;
            case "cd..":
                //move up a directory
                this.currentpath.innerHTML = this.poplist();
                break;
            default:
                msgtext = "Oops, maybe you need help.";
        }
        this.msg.innerHTML = this.msg.innerHTML + "<p class=\"entry\">mu:\\" + tempcurpath + "&gt;" + this.me.value + "<br />" + msgtext + "</p>";
        this.me.value = "";
        this.me.focus();
        return false;
    }
    this.poplist = function() {
        this.curpathArray.pop();
        return this.curpathArray.join("/");
    }
    this.updateCurrentPathArray = function(car,nar) {
        return this.curpathArray = car.concat(nar);
    }
    this.isPathGood = function(nar) {
        var breg = /[^\w-]/;
        for (var i = 0; i < nar.length; i++) {
            if (nar[i].match(breg)) return false;
        }
        return true;
    }
    this.processDir = function() { //unfinished
        if (this.isPathGood(pardirArray)) { 
            var newpathArray = this.updateCurrentPathArray(this.curpathArray,this.parpathArray);
            var newdirObj = this.findPath(newpathArray);
            //return object with current path array and contents of that direotory
        }
    }
    this.getDirContents = function(ar) {
        var node = this.nav;
        for ( var i = 0; i < ar.length; i++) {
            node = node[ar[i]];
        }
        console.log(node);
        node = node !== null ? this.interObjectProperties(node) : null;
        return node;
    }
    this.isPathInNav = function(ar) {
        var node = this.nav;
        var isIn = true;
        for ( var i = 0; i < ar.length; i++) {
            node = node[ar[i]];
        }
        console.log(node);
        if (node === null || node === undefined) isIn = false;
        return isIn;
    }
    this.isArray = function(obj) {
        //returns true is it is an array
        if (obj.constructor.toString().indexOf("Array") == -1) return false;
        else return true;
    }
    this.interObjectProperties = function(obj) {
        var propArray = new Array();
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                propArray.push(prop);
            }
        }
        return propArray;
    }
}