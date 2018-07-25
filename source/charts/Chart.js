/**
 * E-Smile Chart.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/11/13
 * @Version: 0.1
 */
 
ESmile.Chart = function ( domElement, options ) {
    ESmile.EventDispatcher.call(this);
    this._disposed = false;
    this._domElement = domElement;
 
    this._width = this._domElement.offsetWidth - 5;
    this._height = this._domElement.offsetHeight - 5;
    this._autoUpdate = true;
    this._graphic = null;
    this._camera = null;
    this._backGroundColor = ESmile.Theme.ChartBackgroundColor;
    
    this._components = [];
    if (options.title) {
        this._title = new ESmile.Title(options.title);
        this._components.push(this._title);
    }
    if (options.timeline) {
        this._timeline = new ESmile.Timeline(options.timeline);
        this._components.push(this._timeline);
    }
    
    this._legend = new ESmile.Legend(this);
    this._components.push(this._legend);
    
    if (options.credit) {
        this._credit = new ESmile.Credit(options.credit);
        this._components.push(this._credit);
    }
    
    if (options.description) {
        this._description = new ESmile.Description(options.description);
        this._components.push(this._description);
    }
    
 

    //renderer
    this._renderer = new THREE.WebGLRenderer( { antialias: true } );
    this._renderer.setSize( this._width , this._height );
    this._renderer.setClearColor(this._backGroundColor, 1);
    /*this._renderer.domElement.className = "ESmile_canvas";
    this._renderer.domElement.width = this._canvas_width;
    this._renderer.domElement.height = this._canvas_height;*/
    this._domElement.appendChild(this._renderer.domElement);
    this._scene = new THREE.Scene();
    this._eventCenter = new ESmile.EventCenter(this, this._renderer.domElement);
};

ESmile.Chart.prototype.render = function () {
    this._components.forEach(
         function(comp){
            comp.renderBefore(this._renderer.domElement);
        }, 
    this);

    this._stoped = false;
    this._makeScene();
    this._makeEffect();
    var scope = this;
   
    function render(){
        if ( scope._disposed || scope._stoped ){
            return;
        }
        scope._renderer.render(scope._scene, scope._camera);
        if (scope._graphic) 
            scope._graphic.update();
        requestAnimationFrame( render );
        
    }
    render();
};

ESmile.Chart.prototype.clear = function () {
    this.stop();
    this._renderer.clear();
    this._legend.dispose();
    this._scene = null;
    this._graphic.dispose();
    this._graphic = null;
    this._legend = new ESmile.Legend(this);
};

ESmile.Chart.prototype.setOptions = function (options) {
   this._renderer.clear();
};

ESmile.Chart.prototype.stop = function () {
    this._stoped = true;
};

ESmile.Chart.prototype.dispose = function () {
    if (this._disposed === true) {
        return;
    }
    this._disposed = true;
    this._components.forEach(function(component){
        component.dispose();
    });
    this._legend = null;
    this._toolBox = null;
    this._timeline = null;
    this._description = null;
    this._credits = null;
    this._components = null;
    this._graphic.dispose();
    this._graphic = null;
    this._scene.dispatchEvent({ type: "dispose" });
    this._scene = null;
    this._eventCenter.dispose();
    this._eventCenter = null;
    this._renderer.clear();
    this._renderer.domElement.parentNode.removeChild(this._renderer.domElement);
    this._renderer = null;
    this.removeAllEventListener();
};

ESmile.inherits(ESmile.Chart, ESmile.EventDispatcher);

ESmile.Chart.prototype.setViewPort = function () {
};

ESmile.Chart.prototype._makeScene = function () {

};

ESmile.Chart.prototype._makeEffect = function () {
    
};

ESmile.Chart.prototype.resetCamera = function () {

};

ESmile.Chart.prototype.reset = function () {

};

ESmile.Chart.prototype.updateData = function () {
};

ESmile.Chart.prototype._graphicToScene = function (scene, graphicObject ) {
    scene.add(graphicObject.root);
    for (var i = 0, length = graphicObject.children.length; i < length; i++ ){
        this._graphicToScene(scene, graphicObject.children[i]);
    }

};

ESmile.Chart.prototype._findItem = function ( itemName ) {
    // TODO: shouldn't be using _scene.getObjectByName() here.
    var object3d = this._scene.getObjectByName (itemName, true);
    console.log(object3d, itemName);
    return object3d ? object3d.userData : null;
};

ESmile.Chart.prototype.setBackgroundColor = function ( color, alpha ) {
    this._renderer.setClearColor(color, alpha);
    this._backgroundColor = color;
};

ESmile.Chart.prototype.setSize = function ( width, height ) {
    this._renderer.setSize(width, height);
    this._width = width;
    this._height = height;
    this._camera.aspect = width/height;
    this._camera.updateProjectionMatrix();
};

