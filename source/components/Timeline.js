/**
 * E-Smile Timeline.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/12/23
 * @Version: 0.1
 */

ESmile.Timeline = function (options) {
    ESmile.Component.call(this);
    this._labels = options.labels;
    this.onselected =  options.onselected;
    this.style = {};
    if (options.style) {
        this.style.beginColor = options.style.markerBeginColor || ESmile.Timeline.MAKER_BEGIN_COLOR;
        this.style.endColor = options.style.markerEndColor || ESmile.Timeline.MAKER_END_COLOR;
        this.style.labelColor = options.style.labelColor;
        this.style.labelRotate = options.style.labelRotate;
        this.style.labelTranslate = options.style.labelTranslate;
        this.style.labelFontSize = options.style.labelFontSize;
        this.style.bottom = options.style.bottom;
    } else {
        this.style.beginColor = ESmile.Timeline.MAKER_BEGIN_COLOR;
        this.style.endColor = ESmile.Timeline.MAKER_END_COLOR;
    }
};
ESmile.inherits(ESmile.Timeline, ESmile.Component);

ESmile.Timeline.BASE_CSS_NAME = "esmile-timeline";
ESmile.Timeline.MAKER_BEGIN_COLOR = "rgb(100, 149, 237)";
ESmile.Timeline.MAKER_END_COLOR = "rgb(217, 181, 92)";

ESmile.Timeline.prototype.getBaseCssClass = function () {
    return ESmile.Timeline.BASE_CSS_NAME;
};

ESmile.Timeline.prototype.createDom = function () {
    var nav = document.createElement("nav");
    nav.className = this.getBaseCssClass();
    if (this.style.bottom)
        nav.style.bottom = this.style.bottom;
    else
        nav.style.top = "60px";
    nav.style.bottom = this.style.bottom;
    this._domElement = nav;
    var cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    cssLink.href = ESmile.getCssFile(this.getBaseCssClass());
    document.head.appendChild(cssLink);
    this.setVisible(this._visible);

    var ul = document.createElement("ul");
    this._domElement.appendChild(ul);
    this._itemElements = [];
    var beginColor = new THREE.Color(this.style.beginColor);
    var endColor = new THREE.Color(this.style.endColor);
    var colorStep = this._labels.length;
    this._labels.forEach(function (label) {
        var li = document.createElement("li");
        var marker = document.createElement("div");
        var text = document.createElement("div");
        li.style.width = 100 / (this._labels.length + 2) + "%";
        marker.className = ESmile.getCssName(this.getBaseCssClass(), "marker");
        marker.style.backgroundColor = beginColor.lerp(endColor, 1 / colorStep).getStyle();
        colorStep = colorStep - 1;
        text.className = ESmile.getCssName(this.getBaseCssClass(), "text");
        text.innerHTML = label;
        if (this.style.labelColor)
            text.style.color = this.style.labelColor;
        li.className = ESmile.getCssName(this.getBaseCssClass(), "loaded");
        li.appendChild(marker);
        li.appendChild(text);
        ul.appendChild(li);
        this._itemElements.push(li);
        var _this = this;
        li.onclick = function(e){
            var ele = this;
            console.log(this);
            var param = {
                index:0,
                label:"",
                dom:null
            };
            
            if (_this.onselected) {
                for (var i in _this._itemElements){
                    if (_this._itemElements[i] === ele) {
                        param.index = i; 
                        param.label = _this._labels[i];
                        param.dom = _this._itemElements[i];
                        _this.onselected(param);
                    }
               }
            } 
        };
    }, this);


};

ESmile.Timeline.prototype.dispose = function () {
    //TODO:    

    ESmile.Timeline._superClass.dispose.call(this);
};

ESmile.Timeline.prototype._initEventHandling = function () {


};

ESmile.Timeline.prototype.exitDocument = function () {

};

ESmile.Timeline.prototype.setValue = function (value) {

};