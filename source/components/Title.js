/**
 * E-Smile Legend.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: hjd
 * @Date: 2014/12/17
 * @Version: 0.1
 */

//
//ESmile.Title = function ( chart ) {
//    ESmile.Component.call(this);
//    this._chart = chart;
//    this._chartDom = chart._domElement;
//    this._domElement = document.createElement("div");
//    chart._domElement.appendChild(this._domElement);
//    this._style = null;
//    this._height = null;
//    this._width = null;
//    this._title = null;
//};
//
//ESmile.Title.prototype = Object.create(ESmile.Component.prototype);
//
//
//ESmile.Title.prototype.initTitle = function(options){
//
//    this._style = options.style!==undefined?options.style:"Multiple";//Single、Multiple
//    this._domElement.className = options.classname!==undefined?options.classname:"esmile-title";
//
//    var align = options.align !== undefined?options.align : "left";//left、right
//    var vlign = options.vlign !== undefined?options.vlign : "top";//top、bottom
//    var custom = options.custom !== undefined?options.custom : null;
//
//    if(custom != null){
//        this._domElement.style.top = options.custom[0];
//        this._domElement.style.right = options.custom[1];
//        this._domElement.style.bottom = options.custom[2];
//        this._domElement.style.left = options.custom[3];
//    }else{
//        if(align == "left") {this._domElement.style.left = "0px";}
//        else {this._domElement.style.right = "0px";}
//        if(vlign == "top") {this._domElement.style.top = "0px";}
//        else {this._domElement.style.bottom = "0px";}
//    }
//    this._mainTitle = document.createTextNode(options.titles[0] !=undefined?options.titles[0]:"ESmile 3D Earth");
//    var flag = document.createElement("div");
//    flag.className = options.classname!=undefined?options.classname:"esmile-title-main";
//    flag.appendChild(this._mainTitle);
//
//    var separator = document.createElement("div");
//    separator.className = options.classname!=undefined?options.classname:"esmile-separator";
//
//    this._subTitle = document.createTextNode(options.titles[1] !=undefined?options.titles[1]:"World population 2014");
//    var sub = document.createElement("div");
//    sub.className = options.classname!=undefined?options.classname:"esmile-title-sub";
//    var title = document.createElement("a");
//    title.appendChild(this._subTitle);
//    sub.appendChild(title);
//
//    this._domElement.appendChild(flag);
//    this._domElement.appendChild(separator);
//    this._domElement.appendChild(sub);
//}


ESmile.Title = function(options){
    ESmile.Component.call(this);
    this._title = options.title;
    this._subtitle = options.subtitle;
    this._link = options.link;
    this._sublink = options.sublink;
    this._enableGuideLine = true;
    this._enableLink = true;
    this.style = {};
    if (options.style) {
        this.style.titleColor =  options.style.titleColor;
        this.style.subtitleColor =  options.style.subtitleColor;
        this.style.guideLineColor =  options.style.guideLineColor;
    }
};
ESmile.inherits(ESmile.Title, ESmile.Component);

ESmile.Title.prototype._zIndex = 2;

ESmile.Title.BASE_CSS_NAME = "esmile-title";
 
ESmile.Title.prototype.getBaseCssClass = function(){
    return ESmile.Title.BASE_CSS_NAME;
};

ESmile.Title.prototype.createDom = function(){
    ESmile.Title._superClass.createDom.call(this);
    
    var title = document.createElement("div");
    title.className = ESmile.getCssName(ESmile.Title.BASE_CSS_NAME, "main");
    title.innerHTML = this._title;
    
    //for load Progress Bar
    title.setAttribute("data-content",this._title);
    /*var dataContent = document.createElement("data-content");
    dataContent.appendChild(this._title);
    title.appendChild(dataContent);*/

    var subtitle = document.createElement("div");
    subtitle.className = ESmile.getCssName(ESmile.Title.BASE_CSS_NAME, "sub");
    subtitle.innerHTML = this._subtitle;


    this._domElement.appendChild(title);
    if (this._enableGuideLine) {
        var guideLine = document.createElement("div");
        guideLine.className =  ESmile.getCssName(ESmile.Title.BASE_CSS_NAME, "guide");
        this._domElement.appendChild(guideLine);
        guideLine.style.backgroundColor = this.style.guideLineColor;
    }
    this._domElement.appendChild(subtitle);
    
    this._titleElement = title;
    this._subtitleElement = subtitle;
    if (this.style.titleColor)
        this._titleElement.style.color = this.style.titleColor;
    if (this.style.subtitleColor)
        this._subtitleElement.style.color = this.style.subtitleColor;
   
   
};
 
ESmile.Title.prototype.dispose = function(){
    this._title = null;
    this._subtitle = null;
    this._link = null;
    this._sublink = null;
    this._enableGuideLine = true;
    this._enableLink = true;
    ESmile.Title._superClass.dispose.call(this);
};
 
ESmile.Title.prototype._initEventHandling = function(){
   var _this = this;
   if (_this._link) {
       _this._titleElement.onclick = function(e){
           window.open(_this._link);
       }; 
   }
 
   if (_this._sublink) {
           _this._subtitleElement.onclick = function(e){
               window.open(_this._sublink);
           };
   }
  
};
 
ESmile.Title.prototype.exitDocument = function(){
    this._titleElement.onclick = null;
    this._subtitleElement.onclick = null;
    delete this._titleElement;
    delete this._subtitleElement;
};