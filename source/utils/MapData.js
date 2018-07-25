/**
 * E-Smile MapData.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  Map
 * @Date: 2014/11/24
 * @Version: 0.1
 */

ESmile.MapData = function ( data ) {
    this.data = data;
    this.geometries = [];
    this.properties = [];
}


ESmile.MapData.prototype.load = function(){

};

ESmile.MapData.prototype.getGeometriesData = function(){
    var val=[],geo=[],height=[],name=[],color=[],cp=[];
    var maxX=this.data[0].geometry.coordinates[0][0][0],maxY=this.data[0].geometry.coordinates[0][0][1],minX= this.data[0].geometry.coordinates[0][0][0],minY=this.data[0].geometry.coordinates[0][0][1];



    for(var i in this.data){
        var s = "M";
        var arr = this.data[i].geometry.coordinates;
        for(var j in arr){
            for(var k in arr[j]) {
                s += arr[j][k][0] + "," + arr[j][k][1] + " ";

                maxX<arr[j][k][0]?maxX=arr[j][k][0]:null;
                maxY<arr[j][k][1]?maxY=arr[j][k][1]:null;
                minX>arr[j][k][0]?minX=arr[j][k][0]:null;
                minY>arr[j][k][1]?minY=arr[j][k][1]:null;
            }
        }
        s+= "Z";
        geo[this.data[i].id] = s;
        color[this.data[i].id] = new THREE.Color((Math.random()) * 0xffffff);
        name[this.data[i].id] = {"name":this.data[i].properties.name};
        cp[this.data[i].id] = this.data[i].properties.cp ;

    }
    var center={x:(maxX+minX)/ 2,y:(maxY+minY)/2};
    this.geometries.push(geo);
    this.geometries.push(color);
    this.geometries.push(center);
    this.geometries.push(name);
    this.geometries.push(cp);

    this._xRange = maxX - minX;
    this._yRange = maxY - minY;
    return this.geometries;
};

ESmile.MapData.prototype.getGeometriesRange = function() {
    return [this._xRange, this._yRange];
}


