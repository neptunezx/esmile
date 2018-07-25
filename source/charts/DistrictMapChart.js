/**
 * E-Smile DistrictMapChart.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: gujj
 * @Date: 2014/11/14
 * @Version: 0.1
 */

ESmile.DistrictMapChart = function (domElement, options) {
    ESmile.Chart.call(this, domElement, options);

    this._map = {};
    this._map.type = options.map.type;
    this._map.data = options.map.data;
    this._map.style = {};
    this._map.style.backgroundColor = options.map.style.backgroundColor;
    this._map.style.selectedColor = options.map.style.selectedColor;
    this._map.style.forwardColor = options.map.style.forwardColor;


    this._camera = new THREE.PerspectiveCamera(30, this._width / this._height, 0.1, 10000);
    this._control = new THREE.OrbitControls(this._camera, this._renderer.domElement);
    this._progress = new ESmile.Progress();
    this._components.push(this._progress);

};
ESmile.inherits(ESmile.DistrictMapChart, ESmile.Chart);

ESmile.DistrictMapChart.prototype._makeScene = function () {
     
    if (!this._scene) {
        this._scene = new THREE.Scene();
    }
    if (!this._graphic)
        this._graphic = new ESmile.GraphicObject();
    this._renderer.shadowMapEnabled = true;
    this._renderer.shadowMapSoft = true;
    //light
    this._light = new THREE.AmbientLight(0x999999);
    var assistantLight = new THREE.DirectionalLight(0xaaaaaf, 0.7);
    assistantLight.position.set(-100, -100, 150);
    assistantLight.castShadow = true;
    assistantLight.shadowCameraVisible = false;
    assistantLight.shadowCameraNear = 180;
    assistantLight.shadowCameraFar = 320;
    assistantLight.shadowCameraFov = 120;
    assistantLight.shadowMapWidth = 4096;
    assistantLight.shadowMapHeight = 4096;
    assistantLight.shadowDarkness = 0.3;
    assistantLight.shadowCameraLeft = 20;
    assistantLight.shadowCameraRight = 150;
    assistantLight.shadowCameraTop = 50;
    assistantLight.shadowCameraBottom = -60;
    this._light.add(assistantLight);
    this._scene.add(this._light);

    var scope = this;
    var loader = new ESmile.GeoJsonLoader();
    var loader2 = new ESmile.GeoJsonLoader();
    scope._progress.setValue({loaded:0, total:1});
    loader.load(this._map.type, function (geoJson) {
        scope._districtGeoJson = geoJson;
        scope._districtData = [];
        if (scope._map.data) {
            scope._map.data.forEach(function (value) {
                scope._districtData.push(
                        {
                            id: value.id,
                            name: value.name,
                            amount: value.amount,
                            color: value.color || ((new THREE.Color(Math.random() * 0xffffff)).getHex())
                        });
            });
        }

        var map = new ESmile.DistrictMap(scope._districtGeoJson, scope._districtData,
                scope._domElement, {
                    undersideColor: scope._map.style.forwardColor,
                    selectedColor: scope._map.style.selectedColor
                });
        scope._graphic.addChild(map);


        /* 实现双击后地图悬浮效果*/
        map.ondblclick = function (e) {
            var _this = e.target;
            _this._selected = !_this._selected;
            var maxEdge = Math.max(_this.boundBox[2] - _this.boundBox[0], _this.boundBox[3] - _this.boundBox[1]);

            if (_this._selected) {
                map.forEachChild(function (child) {
                    child.root.translateZ(maxEdge / 5);
                });
                map.updateSelf = function () {
                    //大概每秒画40帧的话，悬浮周期是3秒
                    var T = 3 * 40;
                    if (this._time === undefined || this._time >= T) {
                        this._time = 0;
                    }
                    this._time++;
                    this.forEachChild(function (child) {
                        child.root.translateZ(-maxEdge / 400 * Math.sin(2 * Math.PI / T * (this._time)));
                    }, this);
                };
            } else {
                map.forEachChild(function (child) {
                    child.root.position.z = 0.1;
                });
                map.updateSelf = null;
            }
        };

        var colors = [];
        var titles = [];
        scope._districtData.forEach(function (data) {
            if (data.name !== undefined && data.color !== undefined) {
                colors.push(data.color);
                titles.push(data.name);
            }
        });

        scope._legend.initLegend({
            background: scope._backGroundColor,
            style: "Single", width: "110", height: "auto", align: "left",
            vlign: "top", opacity: "0.7", flags: colors, titles: titles,
            custom: ["70px", "auto", "auto", "30px"]});
        scope._graphicToScene(scope._scene, scope._graphic);
        map.forEachChild(function (child) {
            child.root.translateZ(0.1);
            child._polygonColumnMesh.forEach(function (mesh) {
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            });
            child._polygonColumnBottom.forEach(function (mesh) {
                mesh.castShadow = true;
                mesh.receiveShadow = false;
            })
        });
        /* Camera位置自适应 */
        var maxEdge = Math.max(map.boundBox[2] - map.boundBox[0], map.boundBox[3] - map.boundBox[1]);
        scope._camera.position.set(map.centerPoint.x, map.centerPoint.y - maxEdge, maxEdge / (2 * Math.tan(30 * Math.PI / 360)));
        var lookAt = new THREE.Vector3(map.centerPoint.x, map.centerPoint.y, 0);
        scope._scene.add(scope._camera);
        scope._control.setTarget(lookAt);
    });
       /* 异步加载世界地图背景 */
        var backgroundMap = null;
        var scope = this;
        if (scope._map.type.match("CHN/china")) {
            backgroundMap = "asia";
        } else if (scope._map.type.match("CHN/*")) {
            backgroundMap = "CHN/china";
        } else if (scope._map.type.match("asia")) {
            backgroundMap = "CHN/world";
        } else {
            backgroundMap = "CHN/world";
        }
         
        loader2.load(backgroundMap, function (geoJson) {
            var worldMap = new ESmile.DistrictMap(geoJson, null, scope._domElement, {
                undersideColor: scope._map.style.backgroundColor,
                selectedColor: scope._map.style.selectedColor
            });
            scope._graphicToScene(scope._scene, worldMap);
            scope._graphic.addChild(worldMap);
            setTimeout(function(){
                scope._progress.setVisible(false);
            }, 200);
        }, function (content) {
            scope._progress.setValue(content);
        });
};

ESmile.DistrictMapChart.prototype.clear = function () {
    ESmile.DistrictMapChart._superClass.clear.call(this);
    this.stop();
    this._legend.dispose();
    this._renderer.clear(true, true, true);
    this._scene = null;
    this._map = null;

};

ESmile.DistrictMapChart.prototype.setOptions = function (options) {

    if (options && options.map) {
        this._map = options.map;
        this.clear();
        this.render();
    }

};