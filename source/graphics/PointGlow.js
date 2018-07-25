/**
 * E-Smile PointGlow.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  gujj
 * @Date: 2014/11/26
 * @Version: 0.1
 */

ESmile.PointGlow = function ( options ) {
    ESmile.GraphicObject.call(this);
    this._geometry = options.geometry;
    this._color = options.color !==undefined ?options.color:new THREE.Color(0x4d4dff);
};

ESmile.PointGlow.prototype = Object.create(ESmile.GraphicObject.prototype);

ESmile.PointGlow.prototype.setVisible = function (visible) {
    this.visible = visible;
    for(var i  in this.root.children){
        this.root.children[i].material.visible=visible;
    }
};

ESmile.PointGlow.prototype.dispose = function () {
    ESmile.GraphicObject.prototype.dispose.apply(this);
    //TODO: custom dispose
};

ESmile.PointGlow.prototype.clear = function () {
    ESmile.GraphicObject.prototype.clear.apply(this);
    //TODO: custom clear
};

