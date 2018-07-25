/**
 * E-Smile Sphere.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  gujj
 * @Date: 2014/12/10
 * @Version: 0.1
 */

ESmile.Sphere = function (options) {
    ESmile.GraphicObject.call(this);
    this.geometry = "";
    var options = arguments[0];
    this._cpPostionData = options.cpPostionData !==undefined?options.cpPostionData:[];
    this._sphere_r = options.sphere_r!== undefined ?options.sphere_r : 1;
    // this._material = this.initMaterial(options);
    this._init();
};

ESmile.Sphere.prototype = Object.create(ESmile.GraphicObject.prototype);

ESmile.SphereCluster.prototype.setVisible = function (visible) {
    this.visible = visible;
};

ESmile.Sphere.prototype.dispose = function () {

};

ESmile.Sphere.prototype.clear = function () {
};

ESmile.Sphere.prototype._init = function () {

    var sphereGeom =  new THREE.SphereGeometry( this._sphere_r, 32, 32);

    var cps = this._cpPostionData;
    var sphere = new THREE.Mesh( sphereGeom, new THREE.MeshLambertMaterial( { color: 0x000088 } ) );
    sphere.position.set(this._cpPostionData[0],this._cpPostionData[1],0);
    this.root.add(sphere);

};

ESmile.Sphere.prototype._onclick = function(event){
    //切换数据
    console.log(event);
}
ESmile.Sphere.prototype._onDblClick = function(event){
    console.log("SphereCluster.onDbclick");
}