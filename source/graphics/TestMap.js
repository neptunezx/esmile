/**
 * E-Smile TestMap.js.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/11/19
 * @Version: 0.1
 */


/**
 * E-Smile TestMap.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  TestMap
 * @Date: 2014/11/18
 * @Version: 0.1
 */

ESmile.TestMap = function () {
    ESmile.GraphicObject.call(this);

    this.initTestMap();
};

ESmile.TestMap.prototype = Object.create(ESmile.GraphicObject.prototype);

ESmile.TestMap.prototype.setVisible = function (visible) {
    this.visible = visible;
};

ESmile.TestMap.prototype.dispose = function () {

};

ESmile.TestMap.prototype.clear = function () {
};

ESmile.TestMap.prototype._onClick = function (event) {
    console.log("TestMap._onClick()");
};

ESmile.TestMap.prototype.initTestMap = function () {



    var geometry = new THREE.BoxGeometry( 20, 20, 20 );

    for ( var i = 0; i < 20; i ++ ) {

        var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

        object.position.x = Math.random() * 800 - 400;
        object.position.y = Math.random() * 800 - 400;
        object.position.z = Math.random() * 800 - 400;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        object.scale.x = Math.random() + 0.5;
        object.scale.y = Math.random() + 0.5;
        object.scale.z = Math.random() + 0.5;

        this.root.add( object );

    }

};

