/**
 * E-Smile Cube.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: hjd
 * @Date: 2014/12/11
 * @Version: 0.1
 */

ESmile.Cube = function (options,boundBox,maxHeight) {
    ESmile.GraphicObject.call(this);
    this._boundBox = boundBox;
    this._cubeWidth = (this._boundBox[2]-this._boundBox[0]) < (this._boundBox[3]-this._boundBox[1]) ? (this._boundBox[2]-this._boundBox[0])/120 : (this._boundBox[3]-this._boundBox[1])/120;
    this._cubeHeight = this._cubeWidth;
    this._cubeDistribution = null;
//    this._cubeWidth = 1;
//        this._cubeHeight = 1;
    this.maxHeight = maxHeight;
    this._cubeInfo = options;
//    this._step = 0;
    this._title = "";
    this._initRoot();
};

ESmile.Cube.prototype = Object.create(ESmile.GraphicObject.prototype);
ESmile.Cube.prototype._initRoot = function () {

//    this.maxHeight = (this._boundBox[2]-this._boundBox[0])/8;
//    this.h = Math.random() > 0.96 ? this.maxHeight*0.98 : this.maxHeight*Math.random()*0.7;
    //  this.h = this._cubeHeight;
    this._cubeDistribution = this._cubeInfo.Distribution;
//    var color = [ this._cubeDistribution/this.maxHeight,  this._cubeInfo.color , 1 - this._cubeDistribution/this.maxHeight ];
//    console.log(new THREE.Color(color[0], color[1], color[2]),this.h/this.maxHeight  );
    var cubeGeometry = new THREE.BoxGeometry(this._cubeWidth , this._cubeHeight, this._cubeDistribution);
    var cube = new THREE.Mesh( cubeGeometry, new THREE.MeshPhongMaterial({
        color:  this._cubeInfo.color,
        ambient:  this._cubeInfo.color,
        shading: THREE.SmoothShading,
        blending: THREE.NoBlending
    }) );

    cube.translateX(this._cubeInfo.x);
    cube.translateY(this._cubeInfo.y);
    cube.translateZ(this._cubeDistribution/2);
    // this._title = this._cubeInfo[this.step].code;
    this.setId(this._cubeInfo.region);
    this.root.add(cube);
    this._cubeMesh = cube;


}
ESmile.Cube.prototype.setVisible = function (visible) {
    this.visible = visible;
};

ESmile.Cube.prototype.dispose = function () {

};

ESmile.Cube.prototype.clear = function () {
};

ESmile.Cube.prototype._onmouseover = function (event) {
    if(this.hoverable) {
        this.setHighlight(true);
    }
}

ESmile.Cube.prototype._onmouseout = function (event) {
    if(this.hoverable) {
        this.setHighlight(false);
    }
}

ESmile.Cube.prototype.setHighlight = function (isHighlight){
    if (this._highlight != isHighlight) {
        this._highlight = isHighlight;
        var emissive = isHighlight ? 0x444444 : 0;
        this._cubeMesh.material.emissive.set( emissive );
    }
};
