/**
 * E-Smile Model.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  Model
 * @Date: 2015/1/26
 * @Version: 0.1
 */
ESmile.Model = function ( options ) {
    ESmile.GraphicObject.call(this);
    var model = options.model;
    this._loader = model.loader;
    this._obj = model.obj;
    this._style = model.style;
    this._json = model.json;
    this._mtl = model.mtl;
    this._position = model.position!=undefined?model.position:[0,0,0];
    this._model = undefined;
    this._scale = model.scale!=undefined?model.scale:1;
    this._name = model.name;
    this._text = model.text;
    this.init();
}

ESmile.Model.prototype = Object.create(ESmile.GraphicObject.prototype);

ESmile.Model.prototype.setVisible = function (visible) {

}

ESmile.Model.prototype.clear = function () {
};

ESmile.Model.prototype.init = function () {


    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };


    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var scope = this;
    if(this._style=="js"){
        this._loader.load( this._json,function ( geometry, materials ) {
            console.log(scope._scale);
            var object = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
            object.name = scope._name;
            object.scale.x=object.scale.z=object.scale.y=scope._scale;
            object.position.set(scope._position[0],scope._position[1],scope._position[2]);
            scope.root.add(object) ;

        });
    }else{
       /* this._loader.load( this._obj, this._mtl, function ( object ) {
            object.position.y = -50;
            object.translateZ(-50);
            scope.root.add(object) ;
        }, onProgress, onError );*/
    }



}

ESmile.Model.prototype._onclick = function(){
    //console.log(this._text);
}