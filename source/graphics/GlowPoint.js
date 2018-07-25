/**
 * E-Smile GlowPoint.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  gujj
 * @Date: 2014/12/2
 * @Version: 0.1
 */
var a = 0.2, b = 0.2, c = 0.2, d = 0.2;
ESmile.GlowPoint = function ( options ) {
    ESmile.GraphicObject.call(this);
    this._point = null;
    this._clock = new THREE.Clock();
    this._statue = 0;
    this._color = options!==undefined&&options.color !== undefined?options.color: new THREE.Color(0x4d4dff);
    this._position = options!==undefined&&options.position !== undefined?options.position : new THREE.Vector3(0,0,0);
    this._inradius = options!==undefined&&options.in_radius !== undefined?options.in_radius : 1;
    this._outradius = options!==undefined&&options.out_radius !== undefined?options.out_radius : 1.3;

    this.init();
}

ESmile.GlowPoint.prototype = Object.create(ESmile.GraphicObject.prototype);



ESmile.GlowPoint.prototype.dispose = function () {

};

ESmile.GlowPoint.prototype.clear = function () {
};

ESmile.GlowPoint.prototype.init = function () {

    var attributes = {

        displacement: {	type: 'v3', value: [] },
        customColor: {	type: 'c', value: [] }

    };

    var uniforms = {

        amplitude: { type: "f", value: 5.0 },
        opacity:   { type: "f", value: 0.9 },
        color:     { type: "c", value: this._color }

    };

    var shaderMaterial = new THREE.ShaderMaterial( {

        uniforms:       uniforms,
        attributes:     attributes,
        vertexShader:   document.getElementById( 'v3' ).textContent,
        fragmentShader: document.getElementById( 'f3' ).textContent,
        blending:       THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true

    });



    var geometry = new THREE.RingGeometry( this._inradius, this._outradius, 70 );
    this._point = new THREE.Mesh( geometry, shaderMaterial );
    this.root.position.set(this._position.x,this._position.y,this._position.z);
    //this._point.rotation.x = Math.PI/2;



    //this.root.add(this._point);

    var object1 = this._point.clone ();
    var object2 = this._point.clone ();

    object1.scale.set(0.9,0.9,0.9);
    object2.scale.set(0.7,0.7,0.7);

    this._point.add( object1 );
    this._point.add( object2 );

    var vertices = this._point.geometry.vertices;

    var displacement = attributes.displacement.value;
    var color = attributes.customColor.value;


    for( var v = 0; v < vertices.length; v ++ ) {

        displacement[ v ] = new THREE.Vector3();

        color[ v ] = this._color.clone();

    }

   /* var canvas = document.createElement( 'canvas' );
    canvas.width = 16;
    canvas.height = 16;

    var context = canvas.getContext( '2d' );
    var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
    gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
    gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
    gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );

    var material = new THREE.SpriteMaterial( {
        map: new THREE.Texture( canvas ),
        blending: THREE.AdditiveBlending
    } );
    this._point = new THREE.Sprite( material );
    this._point.scale.x = this._point.scale.y =  32 ;*/
   /* var ballGeometry = new THREE.SphereGeometry(2,36,36,0,Math.PI );
    console.log(ballGeometry.vertices);
    var ballTexture = new THREE.ImageUtils.loadTexture('img/particleA.png');

    var customMaterial = new THREE.MeshBasicMaterial(
        {
            map :ballTexture,
            color : new THREE.Color(0xff0000),
            morphTargets: true
}   );
    var vertices = [];
    for(var i=0; i<ballGeometry.vertices.length; i++)
    {
        var f = 2;
        vertices.push(ballGeometry.vertices[i].clone());
        vertices[i].x *= f;
        vertices[i].y *= f;
        vertices[i].z *= f;
    }
    ballGeometry.morphTargets.push({name:'target0', vertices:vertices});
    this._point = new THREE.Mesh(ballGeometry, customMaterial);
    this.root.add(this._point);*/
    /*var ballGeometry = new THREE.SphereGeometry(1,36,36,0,Math.PI );
    var ballTexture = new THREE.ImageUtils.loadTexture('img/particleA.png');
    var customUniforms =
    {
        baseTexture: { type: "t", value: ballTexture },
        mixAmount: 	 { type: "f", value: 0.0 }
    };

    var customAttributes =
    {
        endPosition: { type: "v3", value: [] }
    };

    // set values of attributes
    var values = customAttributes.endPosition.value;
    for ( var i = 0; i < ballGeometry.vertices.length; i++ )
    {
        var vec = ballGeometry.vertices[i];
        values[i] = new THREE.Vector3( 0, 0, 0 );
    }

    // create custom material from the shader code above
    //   that is within specially labeled script tags
    var customMaterial = new THREE.ShaderMaterial(
        {
            uniforms: customUniforms,
            attributes: customAttributes,
            vertexShader:   document.getElementById( 'v2'   ).textContent,
            fragmentShader: document.getElementById( 'f2' ).textContent
        }   );

   this._point = new THREE.Mesh( ballGeometry, customMaterial );
    this._point.position.set(0, 0, 0);*/

    this.root.add(this._point);
};
ESmile.GlowPoint.prototype.changeColor = function(newColor){

    var vertices = this._point.geometry.vertices;
    var color = this._point.material.attributes.customColor.value;
    for( var v = 0; v < vertices.length; v ++ ) {

        color[ v ] = newColor.clone();

    };

    this._point.material.attributes.customColor.needsUpdate = true;

};
ESmile.GlowPoint.prototype.updateSelf= function(){

    //var time = Date.now() * 0.001;

   // var a = Math.sin(0.5 *time );
    this._statue+=0.008;
    if(this._statue>1){
        this._statue=0.008;
    }
    this._point.scale.set(this._statue, this._statue,this._statue);




    this._point.material.uniforms.amplitude.value = 0.01 * this._statue/*Math.sin( 0.5 * time )*/;
   // this._point.material.uniforms.color.value.offsetHSL( 0.0005, 0, 0 );

    var nx, ny, nz, value;

    for( var i = 0, il = this._point.material.attributes.displacement.value.length; i < il; i ++ ) {

        nx = 0.1 * ( 0.5 - Math.random() );
        ny = 0.1 * ( 0.5 - Math.random() );
        nz = 0.1 * ( 0.5 - Math.random() );

        value = this._point.material.attributes.displacement.value[ i ];

        value.x += nx;
        value.y += ny;
        value.z += nz;

    }
    this._point.material.attributes.displacement.needsUpdate = true;

   /* this._statue +=0.01;
    this._point.morphTargetInfluences[0] = this._statue ;
    if(this._statue >1){
        this._statue  =0;
    }*/


    /*this._statue +=0.008;
    this._point.material.uniforms.mixAmount.value =1- this._statue;
    if(this._statue>1){
        this._statue = 0;
    }*/
}

ESmile.GlowPoint.prototype.translate = function (x,y,z){
    if(x) this.root.translateX(x);
    if(y) this.root.translateY(y);
    if(z) this.root.translateZ(z);

}
ESmile.GlowPoint.prototype._onclick = function(event){
    console.log("GlowPoint.onclick------------------------");
}