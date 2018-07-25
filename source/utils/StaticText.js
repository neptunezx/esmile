/**
 * E-Smile StaticText.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  Text
 * @Date: 2014/11/17
 * @Version: 0.1
 */

//页面静态text，不可移动的text
ESmile.StaticText = function( text , options){
    options = options || {};
    this.content = text;
    this.canvasWidth = options.width!== undefined ?options.width : ESmile.Theme.TextCanvasWidth;
    this.canvasHeight = options.height!== undefined ?options.height : ESmile.Theme.TextCanvasHeight;


    this.font = options.font!== undefined ?options.font : ESmile.Theme.TextCanvasFont;
    this.color = options.color!== undefined ?options.color : ESmile.Theme.TextCanvasColor;
    this.size = options.size!== undefined ?options.size : ESmile.Theme.TextCanvasSize;
    this.style = options.style!== undefined ?options.style : ESmile.Theme.TextCanvasStyle;

    this.textAlign = options.textAlign!== undefined ?options.textAlign : ESmile.Theme.TextCanvasTextAlign;

    //修改
    this.vX = options.vX!== undefined ?options.vX : 0;
    this.vY = options.vY!== undefined ?options.vY : 0;

};

ESmile.StaticText.prototype.setFont = function() {
}

ESmile.StaticText.prototype.setColor = function() {
}

ESmile.StaticText.prototype.setSize = function() {
}

ESmile.StaticText.prototype.setStyle = function() {
}


//返回页面固定位置text的Mesh
ESmile.StaticText.prototype.getMesh = function() {
    var canvas = document.createElement('canvas');


    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    var context = canvas.getContext('2d');
    context.fillStyle = this.color; // CHANGED
    context.textAlign = this.textAlign;
    context.font = this.size+"px "+this.font;
    context.fillText(this.content, canvas.width/2 , canvas.height/2);
    console.log( canvas.width/2 , canvas.height/2);
    var amap = new THREE.Texture(canvas,{ premultiplyAlpha:true });
    amap.needsUpdate = true;

    var staticText;

    var geometry = new THREE.PlaneGeometry( 1,1);
    var customUniforms = {
        baseTexture: 	{ type: "t", value: amap },
        baseSpeed: 		{ type: "f", value: 1.15 },
        noiseTexture: 	{ type: "t", value: amap },
        noiseScale:		{ type: "f", value: 1 },
        alpha: 			{ type: "f", value: 1 },
        time: 			{ type: "f", value: 1.0 },
        vX:             { type: "f", value: this.vX },
        vY:             { type: "f", value: this.vY }
    };


    var material = new THREE.ShaderMaterial( {
        uniforms:customUniforms,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        vertexShader : "varying vec2 vUv;uniform float vX;uniform float vY; void main(){vUv = uv; gl_Position = vec4( position, 1 )+vec4(vX,vY,0,0);}",
        fragmentShader: "uniform sampler2D baseTexture; uniform float baseSpeed; uniform sampler2D noiseTexture; uniform float noiseScale; uniform float alpha; uniform float time;varying vec2 vUv;void main(){ vec2 uvNoiseTimeShift = vUv + noiseScale * vec2( 0,0);vec4 baseColor = texture2D( baseTexture, uvNoiseTimeShift );gl_FragColor = baseColor;}"

    } );
    staticText = new THREE.Mesh( geometry,material );

    return staticText;
}
