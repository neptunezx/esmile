/**
 * E-Smile GlowCurve.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  gjj
 * @Date: 2014/11/27
 * @Version: 0.1
 */

ESmile.GlowCurve = function(options) {
    ESmile.GraphicObject.call(this);
    this._start = options.start;
    this._end = options.end;
    this._color = options.color !== undefined ? new THREE.Color(options.color) : new THREE.Color(0x4d4dff);
    this._curveLine = null;
    this._geometry = null;
    this._pointCloud = null;
    this._pointCloudColor = options.pointCloudColor !== undefined ? new THREE.Color(options.pointCloudColor) : this._color;
    this._withPointCloud = options.withPointCloud !== undefined ? options.withPointCloud : true;
    this._withGlowPoint = options.withGlowPoint !== undefined ? options.withGlowPoint : false;
    this._minHeight = 0.3;
    this._clickState = false;
    this._glowPoint = null;
    this._speed = 0.1;
    this.amount = options.amount;
    this._amountNormalizer = options.normalizerCount;
    this._unit = options.unit !== undefined ? options.unit : 10;
    this._mouseStateIn = false;
    this._pointCloudSize = options.pointCloudSize !== undefined ? options.pointCloudSize : 10;

    this.visible = options.visible || true;
    this.clickable = false;
    this.from = options.from;
    this._heightLight = false;
    this._style = options.style !== undefined ? options.style : "floor";
    this._length = null;
    this.to = options.to;
    //add by zx
    this._reverse = options.reverse || false;
    this.init();
};

ESmile.GlowCurve.prototype = Object.create(ESmile.GraphicObject.prototype);

ESmile.GlowCurve.prototype.setVisible = function(visible) {
    this.visible = visible;
    this.root.visible = visible;
    if (this._withGlowPoint) {
        this._glowPoint.setVisible(visible);
    }
};



ESmile.GlowCurve.prototype.clear = function() {
};

ESmile.GlowCurve.prototype.init = function() {
    //this.root.add(new THREE.AxisHelper(100));
    var distanceBetweenPoints = new THREE.Vector3().subVectors(this._start, this._end).length();
    //this._speed = distanceBetweenPoints/50/2;
    //	midpoint for the curve
    var mid = this._start.clone().lerp(this._end, 0.5);
    var height = 0;
    var midLength = mid.length();
    if (this._style === "sphere") {
        mid.normalize();
        mid.multiplyScalar(midLength + distanceBetweenPoints * 0.7);
        height = distanceBetweenPoints * 0.7;
    } else {
        height = distanceBetweenPoints / 3 > this._minHeight ? distanceBetweenPoints / 4 : this._minHeight;
        mid.setZ(height);

    }

    var r = height / 2 + distanceBetweenPoints * distanceBetweenPoints / (8 * height);
    var angle = 360 * Math.asin(distanceBetweenPoints / (2 * r)) / Math.PI;
    this._length = 2 * Math.PI * r * angle / 360;



    var normal = (new THREE.Vector3()).subVectors(this._start, this._end);
    normal.normalize();

    var distanceHalf = distanceBetweenPoints * 0.3;

    var startAnchor = this._start;
    var midStartAnchor = mid.clone().add(normal.clone().multiplyScalar(distanceHalf));
    var midEndAnchor = mid.clone().add(normal.clone().multiplyScalar(-distanceHalf));
    var endAnchor = this._end;

    if (this._reverse) {
        midEndAnchor.z = -midEndAnchor.z;
        midStartAnchor.z = -midStartAnchor.z;
        mid.z = -mid.z;
    }
    var splineCurveA = new THREE.CubicBezierCurve3(this._start, startAnchor, midStartAnchor, mid);
    // splineCurveA.updateArcLengths();

    var splineCurveB = new THREE.CubicBezierCurve3(mid, midEndAnchor, endAnchor, this._end);


    var vertexCountDesired = Math.floor(this._length / this._unit * this._amountNormalizer * this._amountNormalizer) /*Math.floor( distanceBetweenPoints * 0.02 + 6) * 2;*///取点数
    vertexCountDesired = constrain(vertexCountDesired, 10, 60);
    var points = splineCurveA.getPoints(vertexCountDesired);

    points = points.splice(0, points.length - 1);
    points = points.concat(splineCurveB.getPoints(vertexCountDesired));
    points = points.splice(0, points.length - 1);
    this._geometry = new THREE.Geometry();
    for (var i = 0; i < points.length; i++) {
        this._geometry.vertices.push(points[i]);
    }

    var curvedLineMaterial = new THREE.LineBasicMaterial({color: this._color, opacity: 1, linewidth: 1, depthWrite: false, blending:
                THREE.AdditiveBlending, transparent: true, depthTest: true});
    this._curveLine = new THREE.Line(this._geometry, curvedLineMaterial);

    //this._pointCloudSize = this._geometry.vertices.length/2;



    if (this._withGlowPoint) {
        this._glowPoint = new ESmile.GlowPoint({position: this._end, color: this._color, in_radius: this._amountNormalizer + 0.5, out_radius: this._amountNormalizer + 0.8});//此处需要归一化
        this.add(this._glowPoint);
    }

    this.root.add(this._curveLine);

    if (this._withPointCloud) {
        /*var val = 10000 * 0.0003;
         
         var size = (10 + Math.sqrt(val));
         size = constrain(size,0.1, 60);
         
         this._geometry.size = size;
         */



        var particlesGeo = new THREE.Geometry();
        var points = this._geometry.vertices;

        var particleCount = /*vertexCountDesired*//*Math.floor(this._amountNormalizer*100/vertexCountDesired)*//*Math.sqrt(this._length/this._unit*Math.floor(this._amountNormalizer)*50)*/Math.floor(this._length / this._unit * this._amountNormalizer / 3);

        //particleCount = constrain(particleCount,1,points.length-1);

        var particleSize = this._geometry.size;

        for (var s = 0; s < particleCount; s++) {

            var desiredIndex = s / particleCount * points.length;

            var rIndex = constrain(Math.floor(desiredIndex), 0, points.length - 1);

            var point = points[rIndex];
            var particle = point.clone();

            particle.moveIndex = rIndex;
            particle.nextIndex = rIndex + 1;
            if (particle.nextIndex >= points.length)
                particle.nextIndex = 0;
            particle.lerpN = 0;
            particle.path = points;
            particlesGeo.vertices.push(particle);
            //particle.size = particleSize;

            //particleColors.push( particleColor );
        }
        ;
        //console.log("particlesGeo.vertices.length------------------",particlesGeo.vertices.length);
        this.makeParticle(particlesGeo, this._end);
        this.root.add(this._pointCloud);
    }
    //this.add(this._curve);
};

ESmile.GlowCurve.prototype.updateSelf = function() {
    if (this._withPointCloud) {
        this._pointCloud.update();
    }
}

ESmile.GlowCurve.prototype.makeParticle = function(geometry) {

    var uniforms = {
        amplitude: {type: "f", value: 1.0},
        color: {type: "c", value: this._pointCloudColor},
        texture: {type: "t", value: 0, value: THREE.ImageUtils.loadTexture("img/particleA.png")}

    };
    var attributes = {
        size: {type: 'f', value: []},
        customColor: {type: 'c', value: []}

    };
    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        attributes: attributes,
        vertexShader: "uniform float amplitude;" +
                "attribute float size;" +
                "attribute vec3 customColor;" +
                "varying vec3 vColor;" +
                "void main() { vColor = customColor; " +
                "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );" +
                "gl_PointSize = size; gl_Position = projectionMatrix * mvPosition; }",
        fragmentShader: "uniform vec3 color;" +
                "uniform sampler2D texture;" +
                "varying vec3 vColor;" +
                "void main() { gl_FragColor = vec4( vColor, 1 );" +
                "gl_FragColor = gl_FragColor * texture2D( texture,  gl_PointCoord); } ",
        blending: THREE.AdditiveBlending,
        depthTest: true,
        depthWrite: false,
        needsUpdate: true,
        transparent: true/*,
         alphaTest: 0.1*/

    });

    this._pointCloud = new THREE.PointCloud(geometry, shaderMaterial);
    var vertices = this._pointCloud.geometry.vertices;

    var values_size = attributes.size.value;
    var values_color = attributes.customColor.value;
    for (var v = 0; v < vertices.length; v++) {
        values_size[ v ] = this._pointCloudSize;
        values_color[ v ] = this._pointCloudColor;
    }
    var speed = this._speed;
    this._pointCloud.update = function() {
        for (var i in this.geometry.vertices) {

            var particle = this.geometry.vertices[i];
            var path = particle.path;
            // var moveLength = path.length;

            particle.lerpN += speed; //运行速度
            if (particle.lerpN > 1) {
                particle.lerpN = 0.05;
                particle.moveIndex = particle.nextIndex;
                particle.nextIndex++;
                if (particle.nextIndex >= path.length) {
                    //sphere.add(makeSphere(end,new THREE.Color(0xff0000),4));加入顶点特效
                    particle.moveIndex = 0;
                    particle.nextIndex = 1;
                }
            }

            var currentPoint = path[particle.moveIndex];
            var nextPoint = path[particle.nextIndex];


            particle.copy(currentPoint);
            particle.lerp(nextPoint, particle.lerpN);
        }
        this.geometry.verticesNeedUpdate = true;
    };
};
ESmile.GlowCurve.prototype.setName = function(name) {
    this.root.name = name;
};
ESmile.GlowCurve.prototype.changeColor = function(color1, color2) {
    if (color2 === undefined) {
        color2 = color1;
    }
    this._color = new THREE.Color(color1);
    this._pointCloudColor = new THREE.Color(color2);
    this._curveLine.material.color = this._color;
    if (this._withGlowPoint)
        this._glowPoint.changeColor(this._color);
    if (this._withPointCloud) {
        var vertices = this._pointCloud.geometry.vertices;
        var values_color = this._pointCloud.material.attributes.customColor.value;
        var values_size = this._pointCloud.material.attributes.size.value
        for (var v = 0; v < vertices.length; v++) {
            values_color[ v ] = this._pointCloudColor;
        }
        this._pointCloud.material.attributes.customColor.needsUpdate = true;
        this._pointCloud.material.attributes.size.needsUpdate = true;
    }
};
ESmile.GlowCurve.prototype.setHeightLight = function(color) {
    var color, size;
    if (this._heightLight) {
        color = this._pointCloudColor.clone().addScalar(0.15);
        size = this._pointCloudSize * 1.2;

    } else {
        color = this._pointCloudColor;
        size = this._pointCloudSize;
    }
    if (this._withPointCloud) {
        var vertices = this._pointCloud.geometry.vertices;
        var values_color = this._pointCloud.material.attributes.customColor.value;
        var values_size = this._pointCloud.material.attributes.size.value;
        for (var v = 0; v < vertices.length; v++) {
            values_size[ v ] = size;
            values_color[ v ] = color;
            //values_color[ v ].setHSL( v / vertices.length, 1, 1 );
        }
        this._pointCloud.material.attributes.customColor.needsUpdate = true;
        this._pointCloud.material.attributes.size.needsUpdate = true;
    }
    if (this._withGlowPoint)
        this._glowPoint.changeColor(this._color);
    this._curveLine.material.color = color;
};

ESmile.GlowCurve.prototype.translate = function(x, y, z) {
    if (x)
        this.root.translateX(x);
    if (y)
        this.root.translateY(y);
    if (z)
        this.root.translateZ(z);
    if (this._withGlowPoint) {
        this._glowPoint.translate(x, y, z);
    }
};

ESmile.GlowCurve.prototype._onmouseover = function(event) {
    console.log("mouseover", event.target);
    this._heightLight = !this._heightLight;
    this.setHeightLight();

};
ESmile.GlowCurve.prototype._onmouseout = function(event) {
    console.log("mouseout", event.target);
    this._heightLight = !this._heightLight;
    this.setHeightLight();
};
function constrain(v, min, max) {
    if (v < min)
        v = min;
    else
    if (v > max)
        v = max;
    return v;
}