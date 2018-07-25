/**
 * E-Smile Legend.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/11/13
 * @Version: 0.1
 */

ESmile.Legend = function (chart) {
    ESmile.Component.call(this);
    this._chart = chart;
    this._chartDom = chart._domElement;
    this._domElement = document.createElement("div");
    //chart._domElement.appendChild(this._domElement);
    this._style = null;
    this._flags = null;
    this._titles = null;
    this._height = null;
    this._width = null;
    this._titleStyle = null;
    this._values = null;
    this.lines = [];
};

ESmile.inherits(ESmile.Legend, ESmile.Component);

ESmile.Legend.prototype.setVisible = function (visible) {
    this.visible = visible;
};

ESmile.Legend.prototype.dispose = function () {

};

ESmile.Legend.prototype.clear = function () {
};

ESmile.Legend.prototype.onEvent = function (event) {
};

ESmile.Legend.prototype.initLegend = function (options) {
    this._style = options.style !== undefined ? options.style : "Multiple";//Single、Multiple
    this._domElement.className = options.classname !== undefined ? options.classname : "ESmile_Legend";
    this._height = options.height !== undefined ? options.height : "100";
    this._width = options.width !== undefined ? options.width : "100";
    this._domElement.style.width = this._width + "px";
    this._domElement.style.height = this._height + "px";
    this._titleStyle = options.titleStyle !== undefined ? options.titleStyle : "ESmile_Legend_title";
    this._flagClassName = options.flagClassName !== undefined ? options.flagClassName : "ESmile_Legend_flag";

    var align = options.align !== undefined ? options.align : "left";//left、right
    var vlign = options.vlign !== undefined ? options.vlign : "top";//top、bottom
    var custom = options.custom !== undefined ? options.custom : null;
    this._domElement.style.background = options.background !== undefined ? options.background : "#d5dbdb";
    this._domElement.style.opacity = options.opacity !== undefined ? options.opacity : "1";

    this._flags = options.flags !== undefined ? options.flags : [];
    this._titles = options.titles !== undefined ? options.titles : [];
    this._values = options.values !== undefined ? options.values : [];
    console.log(this._values);

    if (custom != null) {
        this._domElement.style.top = options.custom[0];
        this._domElement.style.right = options.custom[1];
        this._domElement.style.bottom = options.custom[2];
        this._domElement.style.left = options.custom[3];
    } else {
        if (align == "left") {
            this._domElement.style.left = "0px";
        } else {
            this._domElement.style.right = "0px";
        }
        if (vlign == "top") {
            this._domElement.style.top = "0px";
        } else {
            this._domElement.style.bottom = "0px";
        }
    }


    var v = 0;
    for (var i in this._flags) {
        v++;
    }
    var intervalHeight = this._height / v;

    var flags = this._flags;
    var titles = this._titles;
    for (var i in this._flags) {
        var newText = document.createTextNode(titles[i]);
        var flag = document.createElement("div");
        var title = document.createElement("a");
        var line = document.createElement("div");
        line.style.cursor = "pointer";
        line.style.height = intervalHeight + "px";
        line.style.width = "90%";
        line.setAttribute("data-chart-name", titles[i]);
        line.setAttribute("data-chart-color", new THREE.Color(flags[i]).getStyle());
        line.setAttribute("data-chart-select", "on");
        line.className = "ESmile_Legend_div";
        flag.style.background = new THREE.Color(flags[i]).getStyle();
        flag.className = this._flagClassName;
        //label颜色取图背景色反色




        if (typeof (this._titleStyle) == "string") {
            title.className = "ESmile_Legend_title";
            title.style.fontFamily = options.fontFamily !== undefined ? options.fontFamily : "'Lato', Calibri, Arial, sans-serif";
            var bc = new THREE.Color(this._chart._backgroundColor);
            if (!options.color) {
                title.style.color = (new THREE.Color(1 - bc.r, 1 - bc.g, 1 - bc.b)).getStyle();
            } else {
                title.style.color = options.color;
            }
        } else {
            var s = "";
            for (var i in this._titleStyle) {
                s += i + ":" + this._titleStyle[i] + ";";
            }
            title.style.cssText = s;
        }

        title.appendChild(newText);
        line.appendChild(flag);
        line.appendChild(title);
        this.lines.push(line);
        var _this = this;

        line.onclick = function (event) {
            var obj = _this._chart._findItem(this.getAttribute("data-chart-name"));
            if (!obj)
                return;
            var color = this.getAttribute("data-chart-color");
            var currentStatus = this.getAttribute("data-chart-select");

            if (currentStatus == "on") {
                this.setAttribute("data-chart-select", "off");
                obj.setSilent(true);
                obj.clickable = false;

                this.style.color = "#eeeeee";
                this.children[0].style.background = "#eeeeee";
                this.children[1].style.color = "#999999";
            } else {
                this.setAttribute("data-chart-select", "on");
                obj.setSilent(false);
                obj.clickable = true;
                this.style.color = "";
                this.children[0].style.background = color;
                this.children[1].style.color = "#0000ff";
                ;
            }

        };
        line.onmouseover = function (event) {
            var obj = _this._chart._findItem(this.getAttribute("data-chart-name"));
            if (!obj)
                return;
            obj.setHighlight(true);
            var color = this.getAttribute("data-chart-color");
            var currentStatus = this.getAttribute("data-chart-select");

            if (currentStatus == "off") {
                this.style.color = "";
                this.children[0].style.background = color;
            }
        };

        line.onmouseout = function (event) {
            var obj = _this._chart._findItem(this.getAttribute("data-chart-name"));
            if (!obj)
                return;
            obj.setHighlight(false);
            var color = this.getAttribute("data-chart-color");
            var currentStatus = this.getAttribute("data-chart-select");

            if (currentStatus == "off") {
                this.style.color = "#eeeeee";
                this.children[0].style.background = "#eeeeee";
            }
        };

        this._domElement.appendChild(line);
    }

};

ESmile.Legend.prototype.initEvent = function () {

};

ESmile.Legend.prototype.getSelectStatue = function () {
    console.warn("Legend.getSelectStatue should be renamed to getSelectedState")
    var list = [];
    this.lines.forEach(function (line) {
        var name = line.getAttribute("data-chart-name");
        var state = line.getAttribute("data-chart-select");
        if (state == "on")
            list.push(this._values[name]);
    }, this);
    return list;
};

ESmile.Legend.prototype.dispose = function () {
    if (this._domElement && this._domElement.parentNode)
        this._domElement.parentNode.removeChild(this._domElement);
    this._domElement = null;
};

