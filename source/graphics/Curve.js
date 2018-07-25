/**
 * E-Smile Curve.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  gujj
 * @Date: 2014/11/26
 * @Version: 0.1
 */

ESmile.Curve = function ( options ) {
    ESmile.GraphicObject.call(this);
    this._start = options.start;
    this._end = options.end;
    this._color = options.color !==undefined ? options.color : new THREE.Color(0x4d4dff);
    this._geometry = null;
    this.init();
};

ESmile.Curve.prototype = Object.create(ESmile.GraphicObject.prototype);

ESmile.Curve.prototype.setVisible = function (visible) {
    this.visible = visible;
};

ESmile.Curve.prototype.dispose = function () {

};

ESmile.Curve.prototype.clear = function () {
};

ESmile.Curve.prototype.init = function () {

    var distanceBetweenPoints =new THREE.Vector3().subVectors(this._start,this._end).length();

    //	midpoint for the curve
    var mid = this._start.clone().lerp(this._end,0.5);
    //mid.normalize();
    mid.setZ(distanceBetweenPoints/3);

    var midLength = mid.length();

    var normal = (new THREE.Vector3()).subVectors(this._start,this._end);
    normal.normalize();

    var distanceHalf = distanceBetweenPoints * 0.3;

    var startAnchor = this._start;
    var midStartAnchor = mid.clone().add( normal.clone().multiplyScalar( distanceHalf ) );
    var midEndAnchor = mid.clone().add( normal.clone().multiplyScalar( -distanceHalf ) );
    var endAnchor = this._end;

    var splineCurveA = new THREE.CubicBezierCurve3( this._start, startAnchor, midStartAnchor, mid);
    // splineCurveA.updateArcLengths();

    var splineCurveB = new THREE.CubicBezierCurve3( mid, midEndAnchor, endAnchor, this._end);

    var vertexCountDesired = Math.floor( distanceBetweenPoints * 0.02 + 6 ) * 2;

    var points = splineCurveA.getPoints( vertexCountDesired );


    points = points.splice(0,points.length-1);

    points = points.concat( splineCurveB.getPoints( vertexCountDesired ) );
    this._geometry = new THREE.Geometry();
    for( var i = 0; i < points.length; i ++ ) {
        this._geometry.vertices.push( points[i] );
    }

    var curvedLineMaterial =  new THREE.LineBasicMaterial({ color: this._color, opacity: 1, linewidth: 15} );
    var curvedLine = new THREE.Line(this._geometry, curvedLineMaterial);

    function constrain(v, min, max){
        if( v < min )
            v = min;
        else
        if( v > max )
            v = max;
        return v;
    }

    this.root.add(curvedLine);
};

ESmile.Curve.prototype.getGeometry = function () {
    console.log("ESmile.Curve.getGeometry");
    return this._geometry;
}
