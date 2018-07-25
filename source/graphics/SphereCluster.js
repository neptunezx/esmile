/**
 * E-Smile SphereCluster.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  SphereCluster
 * @Date: 2014/11/18
 * @Version: 0.1
 */

ESmile.SphereCluster = function (options) {
    ESmile.GraphicObject.call(this);
    this._type = "ESmile.SphereCluster";
    this.geometry = "";
    var options = arguments[0];
    this._cpPostionData = options.cpPostionData !==undefined?options.cpPostionData:[];
    this._sphere_r = options.sphere_r!== undefined ?options.sphere_r : 1;
   // this._material = this.initMaterial(options);
    this._initRoot();
};

ESmile.SphereCluster.prototype = Object.create(ESmile.GraphicObject.prototype);

ESmile.SphereCluster.prototype.setVisible = function (visible) {
    this.visible = visible;
};

ESmile.SphereCluster.prototype.dispose = function () {

};

ESmile.SphereCluster.prototype.clear = function () {
};

ESmile.SphereCluster.prototype._initRoot = function () {

    var sphereGeom =  new THREE.SphereGeometry( this._sphere_r, 32, 32);
    console.log(this._cpPostionData);
    var cps = this._cpPostionData;
    for(var key in cps){
       // console.log(key);
       // var position = new THREE.Vector3(cps[key][0],cps[key][1],0);
        var sphere = new THREE.Mesh( sphereGeom, new THREE.MeshLambertMaterial( { color: 0x000088 } ) );

        sphere.position.set(cps[key][0],cps[key][1],0);
        this.root.add(sphere);
    }
     /*   cps.forEach(
        function (cp) {
            console.log("-----------------2");
            var position = new THREE.Vector3(cp[0],cp[1],0);
            var sphere = new THREE.Mesh( sphereGeom, new THREE.MeshLambertMaterial( { color: 0x000088 } ) );

            sphere.position.set(cp[0],cp[1],0);
            this.root.add(sphere);
            console.log(this.root);
        },this);*/
    /*for(var s in this.data){
        var position = this.data[s].position;
        var sphere = new THREE.Mesh( sphereGeom, this.material );

        sphere.position.set(position.x,position.y,position.z);
        this.root.add(sphere);
    }*/
};

ESmile.SphereCluster.prototype._onclick = function(event){
    console.log("SphereCluster.onclick");
    console.log(event);
}

ESmile.SphereCluster.prototype._ondblclick = function(event){
    console.log("SphereCluster.onDbclick");
}


