/**
 * E-Smile DistributionMapChart.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: hjd
 * @Date: 2014/12/11
 * @Version: 0.1
 */
ESmile.DistributionMapChart = function (domElement, options) {
    ESmile.Chart.call(this, domElement, options);
    this._mapType = options.mapType;
    this._mapData = options.mapData;
    this._camera = new THREE.PerspectiveCamera(30, this._width / this._height, 0.01, 1000);
    this.domElement = domElement;
    this.city = options.city;

    //control
    this._control = new THREE.OrbitControls(this._camera, this._renderer.domElement);

};
ESmile.inherits(ESmile.DistributionMapChart, ESmile.Chart);

ESmile.DistributionMapChart.prototype._makeScene = function () {
    if (!this._graphic)
        this._graphic = new ESmile.GraphicObject();
    this._light = new THREE.AmbientLight(0xaaaaaa);
    var light1 = new THREE.DirectionalLight(0x363877);
    var light3 = new THREE.DirectionalLight(0x444444);
    light1.position.set(-100, -100, 150);
    light3.position.set(20, 120, 100);
    var assistantLight = new THREE.DirectionalLight(0xccccff, 0.3);
    assistantLight.position.set(-100, -100, 150);
    assistantLight.castShadow = true;
    assistantLight.shadowCameraVisible = true;
    assistantLight.shadowCameraNear = 120;
    assistantLight.shadowCameraFar = 350;
    assistantLight.shadowCameraFov = 120;
    assistantLight.shadowMapWidth = 4096;
    assistantLight.shadowMapHeight = 4096;
    assistantLight.shadowDarkness = 0.3;
    assistantLight.shadowCameraLeft = -150;
    assistantLight.shadowCameraRight = 150;
    assistantLight.shadowCameraTop = 120;
    assistantLight.shadowCameraBottom = -100;
    this._light.add(assistantLight);
    this._light.add(light3).add(light1);
    this._scene.add(this._light);

    var scope = this;
    (new ESmile.GeoJsonLoader()).load(this._mapType, function (geoJson) {
        scope._districtGeoJson = geoJson;

        var map = new ESmile.DistributionMap(scope._districtGeoJson, scope._mapData, scope.domElement);
        scope._graphic = map;


//        var colors = [map._minColor,map._averColor,map._maxColor];
//        var titles = ["最稀颜色","平均密度","最密颜色"];
        var colors = [];
        var titles = [];
        scope._mapData.forEach(function (data) {
            if (data.region !== undefined && data.color !== undefined) {
                colors.push(data.color);
                titles.push(data.region);
            }
        });
        scope._legend.initLegend({
            background: scope._backGroundColor, fontFamily: "微软雅黑",
            style: "Single", width: "100", height: "auto", align: "left",
            vlign: "top", opacity: "0.7", flags: colors, titles: titles,
            custom: ["80px", "auto", "auto", "70px"]});

        scope._graphicToScene(scope._scene, scope._graphic);
        var maxEdge = Math.max(map.children[0].boundBox[2] - map.children[0].boundBox[0], map.children[0].boundBox[3] - map.children[0].boundBox[1]);
        scope._camera.position.set(map.children[0].centerPoint.x, map.children[0].centerPoint.y - maxEdge, maxEdge / (2 * Math.tan(30 * Math.PI / 360)));
        var lookAt = new THREE.Vector3(map.children[0].centerPoint.x, map.children[0].centerPoint.y, 0);
        scope._scene.add(scope._camera);

        scope._control.setTarget(lookAt);

    });

};
