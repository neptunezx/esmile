/**
 * E-Smile SpriteText.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  SpriteText
 * @Date: 2014/11/18
 * @Version: 0.1
 */

//立体文字，会根据操作旋转，文字始终正对camera
ESmile.SpriteText = function( text , options){
    options = options || {};
    this.content = text;
    this.canvasWidth = options.width!== undefined ?options.width : ESmile.Theme.TextCanvasWidth;
    this.canvasHeight = options.height!== undefined ?options.height : ESmile.Theme.TextCanvasHeight;

    this.font = options.font!== undefined ?options.font : ESmile.Theme.TextCanvasFont;
    this.color = options.color!== undefined ?options.color : ESmile.Theme.TextCanvasColor;
    this.size = options.size!== undefined ?options.size : ESmile.Theme.TextCanvasSize;
    this.style = options.style!== undefined ?options.style : ESmile.Theme.TextCanvasStyle;

    this.position = options.position!== undefined ?options.position : new THREE.Vector3(0,0,0);
    this.scale = options.scale!== undefined ?options.scale :[1,1,1];


    this.textAlign = options.textAlign!== undefined ?options.textAlign : ESmile.Theme.TextCanvasTextAlign;


};

ESmile.SpriteText.prototype.setFont = function() {
}

ESmile.SpriteText.prototype.setColor = function() {
}

ESmile.SpriteText.prototype.setSize = function() {
}

ESmile.SpriteText.prototype.setStyle = function() {
}


//返回text的Mesh
ESmile.SpriteText.prototype.getMesh = function() {
    var canvas = document.createElement('canvas');


    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    var context = canvas.getContext('2d');
    context.fillStyle = this.color; // CHANGED
    context.textAlign = this.textAlign;
    context.font = this.size+"px "+this.font;

    context.fillText(this.content, canvas.width/2 , canvas.height/2);

    var amap = new THREE.Texture(canvas);
    amap.needsUpdate = true;

    var mat = new THREE.SpriteMaterial({
        map: amap,
        transparent: false,
        useScreenCoordinates: false,
        color: 0xffffff // CHANGED
    });

    var spriteText = new THREE.Sprite(mat);
    spriteText.position.set(this.position.x,this.position.y,this.position.z);
    spriteText.scale.set(this.scale[0],this.scale[1], this.scale[2] ); // CHANGED
    return spriteText;
}