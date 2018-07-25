/**
 * E-Smile Utils.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  Utils
 * @Date: 2014/11/19
 * @Version: 0.1
 */

function d3threeD(exports) {

    const DEGS_TO_RADS = Math.PI / 180, UNIT_SIZE = 100;

    const DIGIT_0 = 48, DIGIT_9 = 57, COMMA = 44, SPACE = 32, PERIOD = 46, MINUS = 45;

    exports.transformSVGPath =
        function transformSVGPath(pathStr) {
            var path = new THREE.Shape();

            var idx = 1, len = pathStr.length, activeCmd,
                x = 0, y = 0, nx = 0, ny = 0, firstX = null, firstY = null,
                x1 = 0, x2 = 0, y1 = 0, y2 = 0,
                rx = 0, ry = 0, xar = 0, laf = 0, sf = 0, cx, cy;

            function eatNum() {
                var sidx, c, isFloat = false, s;
                // eat delims
                while (idx < len) {
                    c = pathStr.charCodeAt(idx);
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
                    c = pathStr.charCodeAt(idx);
                    if (DIGIT_0 <= c && c <= DIGIT_9) {
                        idx++;
                        continue;
                    }
                    else if (c === PERIOD) {
                        idx++;
                        isFloat = true;
                        continue;
                    }

                    s = pathStr.substring(sidx, idx);
                    return isFloat ? parseFloat(s) : parseInt(s);
                }

                s = pathStr.substring(sidx);
                return isFloat ? parseFloat(s) : parseInt(s);
            }

            function nextIsNum() {
                var c;
                // do permanently eat any delims...
                while (idx < len) {
                    c = pathStr.charCodeAt(idx);
                    if (c !== COMMA && c !== SPACE)
                        break;
                    idx++;
                }
                c = pathStr.charCodeAt(idx);
                return (c === MINUS || (DIGIT_0 <= c && c <= DIGIT_9));
            }

            var canRepeat;
            activeCmd = pathStr[0];
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
                        x1 = eatNum(); y1 = eatNum();
                    case 'S':
                        if (activeCmd === 'S') {
                            x1 = 2 * x - x2; y1 = 2 * y - y2;
                        }
                        x2 = eatNum();
                        y2 = eatNum();
                        nx = eatNum();
                        ny = eatNum();
                        path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
                        x = nx; y = ny;
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
                        x = nx; y = ny;
                        break;
                    // - quadratic bezier
                    case 'Q':
                        x1 = eatNum(); y1 = eatNum();
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
                        x = nx; y = ny;
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
                                (rx*rx * ry*ry - rx*rx * y1*y1 - ry*ry * x1*x1) /
                                (rx*rx * y1*y1 + ry*ry * x1*x1));
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
                activeCmd = pathStr[idx++];
            }

            return path;
        }
}

function initSVGObject(arr) {
    var obj = {};

    obj.paths = arr[0];
    obj.amounts = arr[1];
    /*    [ 15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15];
    */obj.colors =  [ 0xC07000, 0xC08000, 0xC0A000,0xC0C000,0xC07000, 0xC08000, 0xC0A000,0xC0C000,0xC07000, 0xC08000, 0xC0A000,0xC0C000,0xC07000, 0xC08000, 0xC0A000,0xC0C000,0xC07000, 0xC08000, 0xC0A000,0xC0C000,0xC07000, 0xC08000, 0xC0A000,0xC0C000,0xC07000, 0xC08000, 0xC0A000,0xC0C000,0xC07000, 0xC08000, 0xC0A000,0xC0C000 ];
    obj.center = arr[2]/*{ x:100, y:40 };*/
    obj.height = arr[3];
    return obj;
};

function addGeoObject( group, svgObject ,options) {
    var i,j, len, len1;
    var path, mesh,mesh1,color, material, amount, simpleShapes, simpleShape, shape3d,shapeLine, x, toAdd, results = [];
    var thePaths = svgObject.paths;
    var theAmounts = svgObject.amounts;
    var theColors = svgObject.colors;
    var theCenter = svgObject.center;
    var theHeight = svgObject.height;
    console.log("theCenter----------");
    console.log(theCenter);
    var $d3g = {};
    d3threeD($d3g);

   /* for (i = 0; i < len; ++i) {*/
    for (var i in thePaths) {
        path = $d3g.transformSVGPath( thePaths[i] );
        color = new THREE.Color( (Math.random())* 0xffffff );
        material = new THREE.MeshPhongMaterial({
            color: color,
            ambient: 0x030303,
            specular: 0x000000, shading: THREE.FlatShading
        });

        amount = theHeight[i]*options.value_unit;/*theAmounts[i]/options.value_unit;*/
        console.log("amount--------------");
        console.log(amount);
        simpleShapes = path.toShapes(true);
        len1 = simpleShapes.length;
        for (j = 0; j < len1; ++j) {
            var graphics = new ESmile.GraphicObject();
            simpleShape = simpleShapes[j];
            shape3d = simpleShape.extrude({
                amount: amount,
                bevelEnabled: false
            });
            shapeLine = simpleShape.makeGeometry();
            mesh = new THREE.Mesh(shape3d, material);
            var curvedLineMaterial =  new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 1, linewidth: 15} );
            mesh1 = new THREE.Line(shapeLine,curvedLineMaterial);
            console.log("mesh1--------------");
            console.log(mesh1);
            //mesh1 = new THREE.
            //mesh.position.set(position,x,position.y,position.z);
            //mesh.rotation.x = -Math.PI/4;
            mesh.translateX( -theCenter.x);
            mesh.translateY( -theCenter.y);
            mesh1.translateX( -theCenter.x);
            mesh1.translateY( -theCenter.y);
            mesh1.position.z=amount;
            console.log(graphics.position);
            //mesh.scale.x=mesh.scale.y=2;
            graphics.root.add(mesh);
            graphics.root.add(mesh1);
           /* group.root.add(mesh);
            group.root.add(mesh1);*/
            group.add(graphics);
            group.root.scale.x=group.root.scale.y=options.scale;
        }
    }
};

function loadData(callback){
    /*../source/resource/mapData/rawData/geoJson/china_geo.json*/
    var xhr = new XMLHttpRequest();
    xhr.open( 'GET',"../source/resource/mapData/rawData/geoJson/china_geo.json", true );
    xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            cities = JSON.parse( xhr.responseText ).features;
           /* console.log(cities);

            console.log("读取文件存入cities");*/
            callback();
        }
    };
    xhr.send(null);
}
function test(cities){
    cities.sort(function(a,b){
        return a.geometry.value - b.geometry.value;
    });

}

function traverseHierarchy (a, b) {
    console.log(a.children);
    /*var c, d, e = a.children.length;
    for (d = 0; d < e; d++) {
        c = a.children[d];
        b(c);
        traverseHierarchy(c, b)
    }*/
}