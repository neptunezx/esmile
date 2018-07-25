/**
 * E-Smile Description.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/12/24
 * @Version: 0.1
 */

ESmile.Description = function(options){
    ESmile.Component.call(this);
    this._content = options.content;
    this.openDescription = null;
    this.spanContent = null;
    this.style = {};
    if (options.style) {
        this.style.backgroundColor = options.style.backgroundColor;
        this.style.fontColor = options.style.fontColor;
    }
};
ESmile.inherits(ESmile.Description, ESmile.Component);

ESmile.Description.BASE_CSS_NAME = "esmile-description";

ESmile.Description.prototype.getBaseCssClass = function(){
    return ESmile.Description.BASE_CSS_NAME;
};

//<div class="container">
//          <p>copyright © 2013 <a href="http://sencha.com/company/">SenchaLabs</a> - Author: <a href="http://philogb.github.com/">Nicolas Garcia Belmonte</a></p>
//        </div>

ESmile.Description.prototype.createDom = function(){
    ESmile.Description._superClass.createDom.call(this);
    if (this.style.backgroundColor) {
        this._domElement.style.background = this.style.backgroundColor;
    }
   
    this._domElement.innerHTML = "<font color='"+(this.style.fontColor?this.style.fontColor:"#FFFFFF")+"'>Description</font>";
    this._contentElement = document.createElement("div");
    this._contentElement.innerHTML = this._content;
    this._contentElement.style.visibility = "hidden";
    this._contentElement.className = ESmile.getCssName(this.getBaseCssClass(), "content");
    this._domElement.appendChild(this._contentElement);
};

ESmile.Description.prototype.dispose = function(){

    ESmile.Description._superClass.dispose.call(this);
};

ESmile.Description.prototype._initEventHandling = function(){
    var _this = this;
    _this._domElement.onmouseover = function(e){
        _this._contentElement.style.visibility = "visible";
    };
    _this._domElement.onmouseout = function(e){
        _this._contentElement.style.visibility = "hidden";
    };
};

ESmile.Description.prototype.exitDocument = function(){

};
