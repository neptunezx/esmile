/**
 * E-Smile Credit.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/12/23
 * @Version: 0.1
 */
 
ESmile.Credit = function(options){
    ESmile.Component.call(this);
    this.style = {};
    if (options.style) {
        this.style.textColor = options.style.textColor;
        this.style.color = options.style.color;
    }
    this._copyright = options.copyright || ESmile.Credit.Copyright ;
    this._author = options.author || ESmile.Credit.Author;
 
};
ESmile.inherits(ESmile.Credit, ESmile.Component);

ESmile.Credit.BASE_CSS_NAME = "esmile-credit";
ESmile.Credit.Copyright = "ESmile数据可视化";
ESmile.Credit.Author = "易华录可视化工作组"; 

ESmile.Credit.prototype.getBaseCssClass = function(){
    return ESmile.Credit.BASE_CSS_NAME;
};
 
ESmile.Credit.prototype.createDom = function(){
   ESmile.Credit._superClass.createDom.call(this);
   this._domElement.innerHTML = "Copyright © " + (new Date()).getFullYear() 
           + " <a href='http://ehualu.com'>" + this._copyright + "</a>"
           + "   Author: <a href='http://ehualu.com/'>" + this._author + "</a>"   ;
     
   if (this.style.textColor) {
        var elements = this._domElement.getElementsByTagName("a");
        for (var i = 0; i < elements.length; i++ ) {
             elements[i].style.color = this.style.textColor;
        }
   }
      
   if (this.style.color)
       this._domElement.style.color = this.style.color;
};
 
ESmile.Credit.prototype.dispose = function(){
    
    ESmile.Credit._superClass.dispose.call(this);
};
 
ESmile.Credit.prototype._initEventHandling = function(){
 
  
};
 
ESmile.Credit.prototype.exitDocument = function(){
    
};
