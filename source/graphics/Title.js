/**
 * E-Smile Title.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/11/13
 * @Version: 0.1
 */

ESmile.TitleUI = function () {
    ESmile.GraphicObject.call(this);
    this._title = arguments[0];
    this.root.add((new ESmile.StaticText(this._title,{width:400,height:400,vX:0,vY:0.55,size:40})).getMesh());

    if(arguments.length>1){
        this._subTitle = arguments[1];
        this.root.add((new ESmile.StaticText(this._subTitle,{width:400,height:400,vX:0.2,vY:0.75})).getMesh());
    }
};

ESmile.TitleUI.prototype = Object.create(ESmile.GraphicObject.prototype);

ESmile.TitleUI.prototype.setVisible = function (visible) {
    this.visible = visible;
};

ESmile.TitleUI.prototype.dispose = function () {
};

ESmile.TitleUI.prototype.clear = function () {
};


