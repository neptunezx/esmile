/**
 * E-Smile Progress.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/12/23
 * @Version: 0.1
 */
 
ESmile.Progress = function(options){
    ESmile.Component.call(this);
    this._contentElement = null;
 
};
ESmile.inherits(ESmile.Progress, ESmile.Component);

ESmile.Progress.BASE_CSS_NAME = "esmile-progress";

ESmile.Progress.prototype.getBaseCssClass = function(){
    return ESmile.Progress.BASE_CSS_NAME;
};

ESmile.Progress.prototype.createDom = function(){
    ESmile.Progress._superClass.createDom.call(this);
    //TODO:
//    this._contentElement = document.createElement("div");
//    this._contentElement.id = ESmile.getCssName(ESmile.Progress.BASE_CSS_NAME);
//    this._contentElement.className = ESmile.getCssName(ESmile.Progress.BASE_CSS_NAME);
   this._domElement.innerHTML = "Loading<br>0%";
};
 
ESmile.Progress.prototype.dispose = function(){
   //TODO:    
    
    ESmile.Progress._superClass.dispose.call(this);
};
 
ESmile.Progress.prototype._initEventHandling = function(){
 
  
};
 
ESmile.Progress.prototype.exitDocument = function(){
    
};

/**
 * form:    {loaded:x bytes,total: y bytes}
 * @param value
 */
ESmile.Progress.prototype.setValue = function(value){
    this._domElement.innerHTML = "Loading</br>" +Math.round((value.loaded/value.total)*100)+"%";
    //setTimeout(this.setValue,100);
    console.log(this._domElement.innerHTML);
};

ESmile.Progress.prototype.setHighlightTitle = function(title){
    if(title)
    {
        //TODO:setHighlightTitle for looking loader progress
/*//        var counterProgress = document.createElement("div");
//        title.className = ESmile.getCssName(ESmile.Title.BASE_CSS_NAME, "progress");
        if( inProgress ) return false;
        inProgress = true;
        classie.add( title._titleElement, 'progress' );
        setTimeout( function() {
            classie.remove( title._titleElement, 'progress' );
            inProgress = false;
        }, 5000 );*/
    }

};