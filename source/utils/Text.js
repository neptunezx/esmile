/**
 * E-Smile Text.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  Text
 * @Date: 2014/11/18
 * @Version: 0.1
 */

//贴在平面上的text
ESmile.Text = function( text , options){
    options = options || {};
    this.content = text;
    this.canvasWidth = options.width!== undefined ?options.width : ESmile.Theme.TextCanvasWidth;
    this.canvasHeight = options.height!== undefined ?options.height : ESmile.Theme.TextCanvasHeight;

    this.font = options.font!== undefined ?options.font : ESmile.Theme.TextCanvasFont;
    this.color = options.color!== undefined ?options.color : ESmile.Theme.TextCanvasColor;
    this.size = options.size!== undefined ?options.size : ESmile.Theme.TextCanvasSize;
    this.style = options.style!== undefined ?options.style : ESmile.Theme.TextCanvasStyle;

    //双面渲染功效
    this.side = options.side!== undefined ?options.side : THREE.FrontSide;

    this.textAlign = options.textAlign!== undefined ?options.textAlign : ESmile.Theme.TextCanvasTextAlign;


};

ESmile.Text.prototype.setFont = function() {
}

ESmile.Text.prototype.setColor = function() {
}

ESmile.Text.prototype.setSize = function() {
}

ESmile.Text.prototype.setStyle = function() {
}


//返回text的Mesh
ESmile.Text.prototype.getMesh = function() {
    var canvas = document.createElement('canvas');


    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    var context = canvas.getContext('2d');
    context.fillStyle = this.color; // CHANGED
    context.textAlign = this.textAlign;
    context.font = this.size+" "+this.font;
    context.fillText(this.content, canvas.width/2 , canvas.height/2);

    var amap = new THREE.Texture(canvas);
    amap.needsUpdate = true;


    var textMesh;

    var geometry = new THREE.PlaneGeometry( this.canvasWidth,this.canvasHeight);

    var material = new THREE.MeshBasicMaterial({
        map: amap,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        side: this.side
    });
    textMesh = new THREE.Mesh( geometry,material );
    return textMesh;
}