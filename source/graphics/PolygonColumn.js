/**
 * E-Smile PolygonColumn.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: gjj
 * @Date: 2014/11/21
 */

ESmile.PolygonColumn = function (options) {
    ESmile.GraphicObject.call(this);
    this._type = "ESmile.PolygonColumn";
    this._pathData = options.pathData;
    this._color = options.color !== undefined ? options.color : ESmile.Theme.PolygonColumnColor;
    this._borderColor = options.borderColor !== undefined ? options.borderColor : ESmile.Theme.PolygonColumnBorderColor;
    this._amount = options.amount || 0;
    this._lastAmount = this._amount;
    this._height = 1;
    this.visible = options.visible || true;
    this._polygonColumnMesh = [];
    this._polygonColumnBottom = [];
    this._initRoot();
    // 当前是否处于选中状态
    this._selected = false;
    this._highlight = false;
     
};

ESmile.PolygonColumn.prototype = Object.create(ESmile.GraphicObject.prototype);

ESmile.PolygonColumn.prototype.dispose = function () {
    ESmile.GraphicObject.prototype.dispose.apply(this);
};

ESmile.PolygonColumn.prototype.clear = function () {
    ESmile.GraphicObject.prototype.clear.apply(this);
};

ESmile.PolygonColumn.prototype._initRoot = function () {
    try {
        // 通过Three.js的Path类型提供的方法得到Shape对象
        var PolygonShapes = (new ESmile.Polygon(this._pathData)).toPath().toShapes();
    } catch(e) {
        console.error("ESmile.PolygonColumn._initRoot: %s", e.message);
        PolygonShapes = [];
        return;
    }
//    var vertexShader = "uniform vec3 viewVector;"+
//        "uniform float c;"+
//        "uniform float p;"+
//        "varying float intensity;"+
//        "void main()"+
//        "{" +
//        "vec3 vNormal = normalize( normalMatrix * normal );"+
//        "vec3 vNormel = normalize( normalMatrix * viewVector );"+
//        "intensity = pow( c - dot(vNormal, vNormel), p );"+
//        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );"+
//        "}";
//    var fragmentShader = "uniform vec3 glowColor;"+
//        " varying float intensity;"+
//        "void main()"+
//        "{"+
//        "vec3 glow = glowColor * intensity;"+
//        "gl_FragColor = vec4( glow, 1.0 );"+
//        "}";
//    var customMaterial = new THREE.ShaderMaterial(
//        {
//            uniforms:
//            {
//                 c :   { type: "f", value: 0.4 },
//                 p :   { type: "f", value: 0.4 },
//                glowColor: { type: "c", value: new THREE.Color(this._color) }
//               /* viewVector: { type: "v3", value: new THREE.Vector3(0,0,40) }*/
//            },
//            vertexShader:vertexShader,
//            fragmentShader:fragmentShader,
//            side: THREE.FrontSide,
//            blending: THREE.AdditiveBlending,
//            transparent: true
//        }   );
//

    PolygonShapes.forEach(function(shape){
        //利用Three.js的Shape类型提供的extrude方法将多边形Shape对象转化为指定高度的柱形几何体

        var polygonColumnMesh = new THREE.Mesh(
            shape.extrude({
                amount: this._height,
                bevelEnabled: false
            }),
           new THREE.MeshPhongMaterial({
                color: new THREE.Color(this._color),
                ambient: new THREE.Color(this._color),
                shading: THREE.SmoothShading,
                
                blending: THREE.NoBlending
           })
        );
        var polygonColumnBottom = new THREE.Mesh(
            shape.extrude({
                amount: 0, bevelEnabled: false
            }),
            new THREE.MeshPhongMaterial({
                color: new THREE.Color(this._color),
                ambient: new THREE.Color(this._color),
                shading: THREE.SmoothShading
               // depthTest: false
             
            })
        );

        var polygonColumnEdge = new THREE.Line(
            shape.makeGeometry(),
            new THREE.LineBasicMaterial({
                  color: new THREE.Color(this._borderColor),
            }, 
            THREE.LineStrip)
        );
 
//        var polygonColumnHover =  new THREE.Mesh(
//           shape.extrude({
//                amount: this._height,
//                bevelEnabled: false
//            }),
//           customMaterial.clone()
//        );
//
//        polygonColumnHover.scale.multiplyScalar(1.1);
        
        if (this._amount) {
            polygonColumnMesh.scale.z *= this._amount/this._height ;
         //   polygonColumnHover.scale.z *= this._amount/this._height;
            this._height *= this._amount;
        } else {
            polygonColumnMesh.visible = false;
          //  polygonColumnHover.visible= false;
        }
        //console.log(polygonColumnMesh.geometry.center());
        //polygonColumnBottom.geometry.center()
//        polygonColumnMesh.castShadow = true;
      polygonColumnBottom.receiveShadow = true;
//         polygonColumnMesh.castShadow = true;
//        polygonColumnMesh.receiveShadow = true;
        this.root.add(polygonColumnEdge)
                // .add(polygonColumnHover)
                 .add(polygonColumnBottom)
                 .add(polygonColumnMesh);
        this._polygonColumnMesh.push(polygonColumnMesh);
        this._polygonColumnBottom.push(polygonColumnBottom);

    }, this);

};

ESmile.PolygonColumn.prototype.setAmount = function (amount) {

    if (amount===0){
        this._polygonColumnMesh.forEach(function(mesh){
            mesh.visible = false;
        });
    } else {
        this._polygonColumnMesh.forEach(function(mesh){
            mesh.visible = true;
            mesh.scale.z *= amount/this._height;
            this._height *= amount/this._height;
        }, this);
    }
    this._lastAmount = this._amount;
    this._amount = amount;

};

ESmile.PolygonColumn.prototype.setSilent = function (isSilent) {
    if (isSilent) {
        this._polygonColumnBottom.forEach(function(mesh){
            mesh.material.ambient.setHex(ESmile.Theme.PolygonColumnColor);
            mesh.material.color.setHex(ESmile.Theme.PolygonColumnColor);
         });
        this._polygonColumnMesh.forEach(function(mesh){
            mesh.visible = false;
        }); 
    } else {
        this._polygonColumnBottom.forEach(function(mesh){
            console.log(this._color, ESmile.Theme.PolygonColumnColor)
            mesh.material.ambient.setHex(this._color);
            mesh.material.color.setHex(this._color);
         }, this);
        this._polygonColumnMesh.forEach(function(mesh){
            mesh.visible = true;
        });
    }
};

ESmile.PolygonColumn.prototype.setColor = function (color){
    this._polygonColumnMesh.forEach(function(mesh){
           mesh.material.color.set( color ); 
           mesh.material.ambient.set( color );
    }, this);

    this._polygonColumnBottom.forEach(function(mesh){
         mesh.material.color.set( color );
         mesh.material.ambient.set( color );
    }, this);
};

ESmile.PolygonColumn.prototype.setHighlight = function (isHighlight){
    if (this._highlight != isHighlight) {
         this._highlight = isHighlight;
         var emissive = isHighlight ? 0x222222 : 0;
         var SetMaterialEmissive = function(mesh){ mesh.material.emissive.set( emissive ); } ;
         this._polygonColumnMesh.forEach( SetMaterialEmissive );
         this._polygonColumnBottom.forEach( SetMaterialEmissive );
    }
};

// TODO：setTimeout手段实现颜色缓和变化，但是有屏幕闪烁效应，待解决
ESmile.PolygonColumn.prototype.setFadeColor =  function( fromColor, toColor, duration, totalFrames) {
    var scope = this;
    var callback = function (color) { 
        scope._polygonColumnMesh.forEach(function(mesh){
           mesh.material.emissive.set( color ); 
           // mesh.material.ambient.setHex( 0x222222 );
        }, scope);

        scope._polygonColumnBottom.forEach(function(mesh){
            mesh.material.emissive.set( color ); 
        }, scope);
    }
    //用一个函数来包裹setTimeout，根据帧数来确定延时
    var to = new THREE.Color(toColor);
    var from = new THREE.Color(fromColor); 
    function doTimeout(color, frame) {
        setTimeout(function() { 
            try {
                callback(color);
            } catch(e) {
                console.error(e.message);
            }
        }, (duration*1000/totalFrames)*frame);
	//总持续秒数/每秒帧数*当前帧数=延时(秒)，再乘以1000作为延时(毫秒) 
    }
    // 整个渐变过程的持续时间，默认为1秒
    var duration = duration || 1; 
    // 总帧数，默认为持续秒数*15帧，也即每秒15帧
    var totalFrames = totalFrames || duration*5;
    var r,g,b;
    var frame = 1;
    //在第0帧设置起始颜色
    doTimeout(fromColor, 0);
    //计算每次变化所需要改变的rgb值
    var fadeColor =  new THREE.Color();
    while (frame < totalFrames+1) {
        fadeColor.r =  from.r * ((totalFrames-frame)/totalFrames) 
            + to.r * (frame/totalFrames);
        fadeColor.g =  from.g * ((totalFrames-frame)/totalFrames) 
            + to.g * (frame/totalFrames);
        fadeColor.b =  from.b * ((totalFrames-frame)/totalFrames) 
            + to.b * (frame/totalFrames);
        // 调用本frame的doTimeout
        console.log(frame, fadeColor);
        doTimeout(fadeColor.getHex(), frame);
        frame++;
    }
}


ESmile.PolygonColumn.prototype._onclick = function (event) {
    console.log("ESmile.PolygonColumn._onclick()");
    this._selected = !this._selected;
 
    /* TODO: 想实现点击图形略微变大，但是图形变大后其中心点位置如何不变是个问题
     * 于是暂且使用高度变化来代替
     * function makeBig(mesh, scale) {
          var center = new THREE.Vector3();
            mesh.geometry.computeBoundingBox();
            var box = mesh.geometry.boundingBox;
            center.addVectors( box.min, box.max );
            center.multiplyScalar(0.5);
            mesh.scale.multiplyScalar(scale);
            mesh.position.sub(center.multiplyScalar(scale-1));
    }*/
    
    
    if (this._selected) {    
       this.setAmount(0);
       //makeBig(this._polygonColumnMesh[0], 1);
    } else { 
        this.setAmount(this._lastAmount);	 
       // makeBig(this._polygonColumnMesh[0], 1.05);
    }
};

ESmile.PolygonColumn.prototype._ondblclick = function (event) {
    console.log("PolygonColumn._ondblclick()");
    this._selected = !this._selected;
    if (this._selected) {    
       this.setAmount(0);
    } else { 
        this.setAmount(this._lastAmount);	 
    }
};


ESmile.PolygonColumn.prototype._onmouseover = function (event) {
    if(this.hoverable) {
       this.setHighlight(true);
    }
}

ESmile.PolygonColumn.prototype._onmouseout = function (event) {
    if(this.hoverable) {
        this.setHighlight(false);
    }
}


ESmile.Polygon = function (data) {
    this.data = data;
    this.dataFormatError = false;
    this.type = this._analysisDataType(data);
};

ESmile.Polygon.prototype.toPath = function () {
    if (!this.dataFormatError && !this.path) {
        if (this.type === "path") {
            this.path = this.data;
        } else if (this.type === "SVGPath") {
            this.SVGPath = this.data;
            this.path = this.SVGPath2Path(this.SVGPath);
        } else {
            this.geoPolygon = this.data;
            this.path = this.geoPolygon2Path(this.data);
        }
    }

    return this.path;
};

/*

 ESmile.Polygon.prototype.toSVGPath = function(){
 if(!this.dataFormatError && !this.SVGPath) {
 if (this.type === "path") {
 this.path = this.data;
 this.SVGPath = this.Path2SVGPath(this.path);
 } else if (this.type === "SVGPath") {
 this.SVGPath = this.data;
 } else {
 this.geoPolygon = this.data;
 this.SVGPath = this.GeoPolygon2SVGPath(this.data);
 }
 }
 return this.SVGPath;
 };

 ESmile.Polygon.prototype.toGeoPolygon = function(){
 if(!this.dataFormatError && !this.path){
 if (this.type === "Path") {
 this.path = this.data;
 this.geoPolygon = this.Path2GeoPolygon(this.path);
 } else if (this.type === "SVGPath") {
 this.SVGPath = this.data;
 this.geoPolygon = this.SVGPath2GeoPolygon(this.SVGPath);
 } else {
 this.geoPolygon = this.data;
 }
 }

 return this.geoPolygon;
 };
 */

ESmile.Polygon.prototype.setData = function (data) {
    this.dataFormatError = false;
    this.needUpdate = true;
    this.path = null;
    this.SVGPath = null;
    this.geoPolygon = null;
    this.data = data;
    this.type = this._analysisDataType(data);
    return !this.dataFormatError;
};

ESmile.Polygon.prototype.dispose = function () {
    this.needUpdate = true;
    this.path = null;
    this.SVGPath = null;
    this.geoPolygon = null;
    this.data = null;
    this.type = null;
    this.dataFormatError = true;
};

ESmile.Polygon.prototype._analysisDataType = function (data) {

    if (data instanceof Array) {
        return "GeoPolygon";
    } else if (data instanceof String) {
        return "SVGPath";
    } else if (data instanceof THREE.Path) {
        return "Path";
    } else {
        this.dataFormatError = true;
        console.log("ESmile.Polygon: unsupported polygon data format");
        return null;
    }
};

ESmile.Polygon.prototype.isDataFormatError = function () {
    return  this.dataFormatError;
};

ESmile.Polygon.prototype.SVGPath2Path = function (SVGPath) {
    var DEGS_TO_RADS = Math.PI / 180, UNIT_SIZE = 100;
    var DIGIT_0 = 48, DIGIT_9 = 57, COMMA = 44, SPACE = 32, PERIOD = 46, MINUS = 45;


    return function(SVGPath) {

        var path = new THREE.Shape();

        var idx = 1, len = SVGPath.length, activeCmd,
            x = 0, y = 0, nx = 0, ny = 0, firstX = null, firstY = null,
            x1 = 0, x2 = 0, y1 = 0, y2 = 0,
            rx = 0, ry = 0, xar = 0, laf = 0, sf = 0, cx, cy;

        function eatNum() {
            var sidx, c, isFloat = false, s;
            // eat delims
            while (idx < len) {
                c = SVGPath.charCodeAt(idx);
                if (c !== COMMA && c !== SPACE)
                    break;
                idx++;
            }
            if (c === MINUS)
                sidx = idx++;
            else
                sidx = idx;
            // eat number
            while (idx < len) {
                c = SVGPath.charCodeAt(idx);
                if (DIGIT_0 <= c && c <= DIGIT_9) {
                    idx++;
                    continue;
                }
                else if (c === PERIOD) {
                    idx++;
                    isFloat = true;
                    continue;
                }

                s = SVGPath.substring(sidx, idx);
                return isFloat ? parseFloat(s) : parseInt(s);
            }

            s = SVGPath.substring(sidx);
            return isFloat ? parseFloat(s) : parseInt(s);
        }

        function nextIsNum() {
            var c;
            // do permanently eat any delims...
            while (idx < len) {
                c = SVGPath.charCodeAt(idx);
                if (c !== COMMA && c !== SPACE)
                    break;
                idx++;
            }
            c = SVGPath.charCodeAt(idx);
            return (c === MINUS || (DIGIT_0 <= c && c <= DIGIT_9));
        }

        var canRepeat;
        activeCmd = SVGPath[0];
        while (idx <= len) {
            canRepeat = true;
            switch (activeCmd) {
                // moveto commands, become lineto's if repeated
                case 'M':
                    x = eatNum();
                    y = eatNum();
                    path.moveTo(x, y);
                    activeCmd = 'L';
                    firstX = x;
                    firstY = y;
                    break;
                case 'm':
                    x += eatNum();
                    y += eatNum();
                    path.moveTo(x, y);
                    activeCmd = 'l';
                    firstX = x;
                    firstY = y;
                    break;
                case 'Z':
                case 'z':
                    canRepeat = false;
                    if (x !== firstX || y !== firstY)
                        path.lineTo(firstX, firstY);
                    break;
                // - lines!
                case 'L':
                case 'H':
                case 'V':
                    nx = (activeCmd === 'V') ? x : eatNum();
                    ny = (activeCmd === 'H') ? y : eatNum();
                    path.lineTo(nx, ny);
                    x = nx;
                    y = ny;
                    break;
                case 'l':
                case 'h':
                case 'v':
                    nx = (activeCmd === 'v') ? x : (x + eatNum());
                    ny = (activeCmd === 'h') ? y : (y + eatNum());
                    path.lineTo(nx, ny);
                    x = nx;
                    y = ny;
                    break;
                // - cubic bezier
                case 'C':
                    x1 = eatNum();
                    y1 = eatNum();
                case 'S':
                    if (activeCmd === 'S') {
                        x1 = 2 * x - x2;
                        y1 = 2 * y - y2;
                    }
                    x2 = eatNum();
                    y2 = eatNum();
                    nx = eatNum();
                    ny = eatNum();
                    path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
                    x = nx;
                    y = ny;
                    break;
                case 'c':
                    x1 = x + eatNum();
                    y1 = y + eatNum();
                case 's':
                    if (activeCmd === 's') {
                        x1 = 2 * x - x2;
                        y1 = 2 * y - y2;
                    }
                    x2 = x + eatNum();
                    y2 = y + eatNum();
                    nx = x + eatNum();
                    ny = y + eatNum();
                    path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
                    x = nx;
                    y = ny;
                    break;
                // - quadratic bezier
                case 'Q':
                    x1 = eatNum();
                    y1 = eatNum();
                case 'T':
                    if (activeCmd === 'T') {
                        x1 = 2 * x - x1;
                        y1 = 2 * y - y1;
                    }
                    nx = eatNum();
                    ny = eatNum();
                    path.quadraticCurveTo(x1, y1, nx, ny);
                    x = nx;
                    y = ny;
                    break;
                case 'q':
                    x1 = x + eatNum();
                    y1 = y + eatNum();
                case 't':
                    if (activeCmd === 't') {
                        x1 = 2 * x - x1;
                        y1 = 2 * y - y1;
                    }
                    nx = x + eatNum();
                    ny = y + eatNum();
                    path.quadraticCurveTo(x1, y1, nx, ny);
                    x = nx;
                    y = ny;
                    break;
                // - elliptical arc
                case 'A':
                    rx = eatNum();
                    ry = eatNum();
                    xar = eatNum() * DEGS_TO_RADS;
                    laf = eatNum();
                    sf = eatNum();
                    nx = eatNum();
                    ny = eatNum();
                    if (rx !== ry) {
                        console.warn("Forcing elliptical arc to be a circular one :(",
                            rx, ry);
                    }
                    // SVG implementation notes does all the math for us! woo!
                    // http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
                    // step1, using x1 as x1'
                    x1 = Math.cos(xar) * (x - nx) / 2 + Math.sin(xar) * (y - ny) / 2;
                    y1 = -Math.sin(xar) * (x - nx) / 2 + Math.cos(xar) * (y - ny) / 2;
                    // step 2, using x2 as cx'
                    var norm = Math.sqrt(
                            (rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1) /
                            (rx * rx * y1 * y1 + ry * ry * x1 * x1));
                    if (laf === sf)
                        norm = -norm;
                    x2 = norm * rx * y1 / ry;
                    y2 = norm * -ry * x1 / rx;
                    // step 3
                    cx = Math.cos(xar) * x2 - Math.sin(xar) * y2 + (x + nx) / 2;
                    cy = Math.sin(xar) * x2 + Math.cos(xar) * y2 + (y + ny) / 2;

                    var u = new THREE.Vector2(1, 0),
                        v = new THREE.Vector2((x1 - x2) / rx,
                                (y1 - y2) / ry);
                    var startAng = Math.acos(u.dot(v) / u.length() / v.length());
                    if (u.x * v.y - u.y * v.x < 0)
                        startAng = -startAng;

                    // we can reuse 'v' from start angle as our 'u' for delta angle
                    u.x = (-x1 - x2) / rx;
                    u.y = (-y1 - y2) / ry;

                    var deltaAng = Math.acos(v.dot(u) / v.length() / u.length());
                    // This normalization ends up making our curves fail to triangulate...
                    if (v.x * u.y - v.y * u.x < 0)
                        deltaAng = -deltaAng;
                    if (!sf && deltaAng > 0)
                        deltaAng -= Math.PI * 2;
                    if (sf && deltaAng < 0)
                        deltaAng += Math.PI * 2;

                    path.absarc(cx, cy, rx, startAng, startAng + deltaAng, sf);
                    x = nx;
                    y = ny;
                    break;
                default:
                    throw new Error("weird path command: " + activeCmd);
            }
            // just reissue the command
            if (canRepeat && nextIsNum())
                continue;
            activeCmd = SVGPath[idx++];
        }

        return path;
    };
};

ESmile.Polygon.prototype.geoPolygon2Path = function (geoPolygon) {
    var path = new THREE.Shape();

    var Polygon2Path = function(geoPolygon, path){
        for (var i = 0, l = geoPolygon.length; i < l; i++) {
            path.moveTo(geoPolygon[i][0][0], geoPolygon[i][0][1]);

            for (var j = 1, k = geoPolygon[i].length; j < k; j++) {
                path.lineTo(geoPolygon[i][j][0], geoPolygon[i][j][1]);
            }

            //path.lineTo (geoPolygon[i][0][0].toFixed(2), geoPolygon[i][0][1].toFixed(2));
        }
    };

    if (geoPolygon[0][0][0] instanceof Array){
        //  MultiPolygon to Path
        for (var g = 0, h = geoPolygon.length; g < h; g++ ){
            Polygon2Path(geoPolygon[g], path);
        }

    } else {
        // Polygon to Path
        Polygon2Path(geoPolygon, path);
    }

    return path;
};

/*
 ESmile.Polygon.prototype.Path2SVGPath = function(Path){

 };

 ESmile.Polygon.prototype.GeoPolygon2SVGPath = function(geoPolygon){

 };

 ESmile.Polygon.prototype.Path2GeoPolygon = function(path){

 };

 ESmile.Polygon.prototype.SVGPath2GeoPolygon = function(SVGPath){

 };
 */
