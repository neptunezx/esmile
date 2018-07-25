/**
 * E-Smile EarthMap.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: gjj
 * @Date: 2014/12/15
 * @Version: 0.1
 */


ESmile.PolygonSurfaceMap = function ( ) {
    ESmile.GraphicObject.call(this);
  
   var canvas = document.createElement('canvas');
    canvas.width = 1366;
    canvas.height = 600;
    var context = canvas.getContext('2d');
    context.fillStyle = "#00f";  
    context.textAlign = "left";
    context.font =  "12px";
    context.fillText("this.content this.content ", canvas.width  , canvas.height );
  

    meshPlanet = new THREE.Mesh(new THREE.SphereGeometry(this._radius, 100, 50),
                                new THREE.MeshBasicMaterial(
                                        { 
                                          color: 0x99ff00 }));
    meshPlanet.name = "ESmile.PolygonSurfaceMap";
    this.earthMesh = meshPlanet;
    this.root = this.earthMesh;
    this.root.add(new THREE.AxisHelper(10000));
  
       
};

ESmile.PolygonSurfaceMap.prototype = Object.create(ESmile.GraphicObject.prototype);

 