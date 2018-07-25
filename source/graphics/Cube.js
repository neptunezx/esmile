/**
 * E-Smile CurveCluster.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  gujj
 * @Date: 2014/11/27
 * @Version: 0.1
 */

ESmile.CurveCluster = function ( options ) {
    ESmile.GraphicObject.call(this);
    this._position = options.position;
};

ESmile.CurveCluster.prototype = Object.create(ESmile.GraphicObject.prototype);

ESmile.CurveCluster.prototype.setVisible = function (visible) {
    this.visible = visible;
};

ESmile.CurveCluster.prototype.dispose = function () {

};

ESmile.CurveCluster.prototype.clear = function () {
};

ESmile.CurveCluster.prototype.init = function () {
    for(var i in this._position()){

    }
};