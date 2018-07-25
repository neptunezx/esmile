/**
 * E-Smile ToolTip.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/11/13
 * @Version: 0.1
 */
/*
 ESmile.ToolTip = function (chartDom) {
 ESmile.Component.call(this);
 this._chartDom = chartDom;
 this._content = "";
 this._titleStyle = null;
 this._dataStyle = null;
 this._dom = document.createElement("div");
 this._chartDom.parentElement.insertBefore(this._dom,this._chartDom);
 };
 
 ESmile.ToolTip.prototype = Object.create(ESmile.Component.prototype);
 
 ESmile.ToolTip.prototype.setVisible = function (visible) {
 this.visible = visible;
 };
 
 ESmile.ToolTip.prototype.dispose = function () {
 };
 
 ESmile.ToolTip.prototype.clear = function () {
 };
 
 ESmile.ToolTip.prototype.initToolTip = function (options){
 var content = options.content;
 this._dom.innerHTML="";
 this._dom.className = options.classname!==undefined?options.classname:'ESmile_tooltip';
 this._dom.setAttribute('id',options.id!==undefined?options.id:'ESmile_tooltip');
 this._dom.style.width = options.width;
 this._dom.style.height = options.height;
 this._content = content;
 this._titleStyle = options.titleStyle!==undefined?options.titleStyle:'';
 this._dataStyle = options.dataStyle!==undefined?options.titleStyle:'';
 
 
 for(var i in this._content){
 var newText1 = document.createTextNode(i+":");
 var newText2 = document.createTextNode(this._content[i]);
 var line = document.createElement("div");
 var title = document.createElement("span");
 title.className = this._titleStyle.className;
 title.appendChild(newText1);
 var data = document.createElement("span");
 data.className = this._dataStyle.className;
 data.appendChild(newText2);
 line.appendChild(title).appendChild(data);
 
 this._dom.appendChild(line);
 }
 this._dom.style.top = options.y+"px";
 this._dom.style.left = options.x+"px";
 
 }
 
 ESmile.ToolTip.prototype.getToolTip = function (){
 return this._dom;
 }
 */

ESmile.Tooltip = function (parentDomElement) {
    this._height;
    
    this._parentDomElement = parentDomElement;
    this._domElement = null;
    this._topElement = null;
    this._contentElement = null;
    this._bottomElement = null;
  //  this._positionTimer = null;
    this._top = 15;
    //  this._id = "tt";
    this._left = 15;
    this._maxWidth = 300;
    this._speed = 2;
    this._timer = 5;
    this._endAlpha = 70;
    this._alpha = 0;
    this._ie = document.all ? true : false;

};


ESmile.Tooltip.prototype = {
    constructor: ESmile.Tooltip,
    show: function (contentHTML, width) {
        if (this._domElement === null) {
            this._domElement = document.createElement('div');
            // this._domElement.setAttribute('id', this._id);
            var top = document.createElement('div');
            top.setAttribute('id', this._id + 'top');
            var content = document.createElement('div');
            // content.setAttribute('id', this._id + 'content');
            var bottom = document.createElement('div');
            // bottom.setAttribute('id', this._id + 'bottom');
            this._domElement.appendChild(top);
            this._domElement.appendChild(content);
            this._domElement.appendChild(bottom);
            this._topElement = top;
            this._contentElement = content;
            this._bottomElement = bottom;
           
            this._domElement.style.cssText = "position:absolute; display:block; background:url(../source/resource/tooltip/tt_left.gif) top left no-repeat";
            top.style.cssText = "display:block; height:3px; margin-left:5px; background:url(../source/resource/tooltip/tt_top.gif) top right no-repeat; overflow:hidden";
            bottom.style.cssText = "display:block; height:3px; margin-left:5px; background:url(../source/resource/tooltip/tt_bottom.gif) top right no-repeat; overflow:hidden";
            content.style.cssText = "display:block; padding:2px 12px 3px 7px; margin-left:5px; background:#000; color:#FFF";
            if (this._parentDomElement) {
                this._parentDomElement.appendChild(this._domElement);
              //  this._parentDomElement.onmousemove = this.pos.bind(this);
                this._parentDomElement.addEventListener("mousemove", this.pos.bind(this));
            } else { 
                document.body.appendChild(this._domElement);
               // document.onmousemove = this.pos.bind(this);
                document.addEventListener("mousemove", this.pos.bind(this));
            }

            this._domElement.style.opacity = 0;
            this._domElement.style.filter = 'alpha(opacity=0)';

        }
        if (this._contentElement.innerHTML !== contentHTML)
            this._contentElement.innerHTML = contentHTML;
        this._domElement.style.display = 'block';
      
        this._domElement.style.width = width ? width + 'px' : 'auto';


        if (!width && this._ie) {
            this._topElement.style.display = 'none';
            this._bottomElement.style.display = 'none';
            this._domElement.style.width = this._domElement.offsetWidth;
            this._topElement.style.display = 'block';
            this._bottomElement.style.display = 'block';

        }
        if (this._domElement.offsetWidth > this._maxWidth) {
            this._domElement.style.width = this._maxWidth + 'px';
        }

        this._height = parseInt(this._domElement.offsetHeight) + this._top;
        clearInterval(this._domElement.timer);

        var _this = this;
        _this._domElement.timer = setInterval(function () {
            _this.fade(1);
        }, _this._timer);
    },
    pos: function (e) {
 
        var scope = this;
    
        var u, l;
        if (scope._parentDomElement) {
            u = e.clientY;
            l = e.clientX;
        } else {
            u = scope._ie ? e.clientY + document.documentElement.scrollTop : e.pageY;
            l = scope._ie ? e.clientX + document.documentElement.scrollLeft : e.pageX;
        }
        scope._domElement.style.top = (u - scope._height) + 'px';
        scope._domElement.style.left = (l + scope._left) + 'px';
      
 
    },
    fade: function (d) {
        var a = this._alpha;
        if ((a !== this._endAlpha && d === 1) || (a !== 0 && d === -1)) {
            var i = this._speed;
            if (this._endAlpha - a < this._speed && d === 1) {
                i = this._endAlpha - a;
            } else if (this._alpha < this._speed && d === -1) {
                i = a;
            }
            this._alpha = a + (i * d);
            this._domElement.style.opacity = this._alpha * .01;
            this._domElement.style.filter = 'alpha(opacity=' + this._alpha + ')';
        } else {
            clearInterval(this._domElement.timer);
            if (d === -1) {
                this._domElement.style.display = 'none';
            }
        }
    },
    hide: function () {
        if (!this._domElement)
            return;
        clearInterval(this._domElement.timer);
        if (this._domElement.style.display === "none"){
            return;
        }
        var _this = this;
        _this._domElement.timer = setInterval(function () {
            _this.fade(-1);
        }, _this._timer);
    }

};

 