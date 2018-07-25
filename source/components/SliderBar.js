/**
 * E-Smile SliderBar.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  gujj
 * @Date: 2014/12/18
 * @Version: 0.1
 */

ESmile.SliderBar = function(chart){
    ESmile.Component.call(this);
    this._chart = chart;
    this._chartDom = chart._domElement;
    this._domElement = document.createElement("div");
    chart._domElement.appendChild(this._domElement);
    console.log(chart._domElement);
    this._style = null;
    this._height = null;
    this._width = null;
    this.titles = [];
};

ESmile.SliderBar.prototype = Object.create(ESmile.Component.prototype);

ESmile.SliderBar.prototype.setVisible = function (visible) {
    this.visible = visible;
};

ESmile.SliderBar.prototype.dispose = function () {
};

ESmile.SliderBar.prototype.clear = function () {
};

ESmile.SliderBar.prototype.init = function(options){
    this.titles = options.titles;
    this._domElement.style.cssText = "position:absolute;height:8%;opacity:0.9;bottom:0px;width:100%;text-align:center;";

    var sliderBarContainer = document.createElement("div");
    sliderBarContainer.style.cssText = "position:relative;margin:0px auto;height:100%;padding:0px;width:"+this._chartDom.clientWidth*0.6+"px;";
    //sliderBarContainer.style.width = this._chartDom.clientWidth*0.6;
    console.log(sliderBarContainer);

    var sliderBar = document.createElement("div");
    sliderBar.style.cssText = "background:#888888;border-radius:32px;position:relative;height:10%;width:90%;margin:10px 5% 0px ;float:left;"
    sliderBarContainer.appendChild(sliderBar);
    var sliderBarPointContainer = document.createElement("div");
    sliderBarPointContainer.style.cssTesxt = "position:absolute;top:0px;height:20%;";
    var sliderBarTitleContainer = document.createElement("div");
    sliderBarTitleContainer.style.cssTesxt = "position:absolute;bottom:0px;height:40%;color:white";


    sliderBar.appendChild(sliderBarPointContainer);
    sliderBar.appendChild(sliderBarTitleContainer);
    var length = this.titles.length;
    var left = this._chartDom.clientWidth*0.6/length;
    var sliderPoint = document.createElement("div");

    for(var i=0;i<length;i++){
        var point = document.createElement("div");
        if(i==0){
            point.style.cssText = "position:absolute;background:#333333;margin-top:10px;border-radius:50%;float:left;height:6px;width:6px;cursor: pointer;left:"+left/2+"px";
            sliderPoint.style.cssText = "z-index:1;background:#e6e6e6;margin-top:8px;border-radius:50%;float:left;height:10px;width:10px;cursor: pointer;position:absolute;left:"+(left/2-3)+"px";
            sliderBarContainer.appendChild(sliderPoint);
        }else{
            point.style.cssText = "position:absolute;background:#333333;margin-top:10px;border-radius:50%;float:left;height:6px;width:6px;cursor: pointer;left:"+left*(i+1/2)+"px;";
        }
        point.setAttribute("data-time-data",this.titles[i]);
        var scope = this;

        point.onclick = function(event){
            sliderPoint.style.left = (parseFloat(event.target.style.left.split("px")[0])-3)+"px";
            scope._chart.updateFlowData(this.getAttribute("data-time-data"));
        }
        sliderBarContainer.appendChild(point);

    }

    var textWidth = (this._chartDom.clientWidth*0.6)/length;

    for(var i=0;i<length;i++){
        var pointTitle = document.createElement("div");

        var newText = document.createTextNode(this.titles[i]);
        pointTitle.appendChild(newText);
        pointTitle.style.cssText = "font-size:12px;font-weight:bolder;color:white;float:left;margin-top:6px;text-align:center;width:"+textWidth+"px;";

        sliderBarContainer.appendChild(pointTitle);


    }

    this._domElement.appendChild(sliderBarContainer);

};