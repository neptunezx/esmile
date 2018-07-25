/**
 * E-Smile FlowMapChart.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: gujj
 * @Date: 2014/11/14
 * @Version: 0.1
 */
ESmile.FlowMapChart = function( domElement , options ){
    ESmile.Chart.call(this, domElement, options);
    this._mapType = options.mapType;
    this._flowData = new ESmile.FlowData(options.flowData);

    this._camera = new THREE.PerspectiveCamera( 30 , this._width/this._height, 1 , 1000 );

    this._sliderBar = new ESmile.SliderBar(this);
    //control
    this._control = new THREE.OrbitControls(this._camera, this._renderer.domElement);
    this._map = null;
    this._legendStatue = [];
}
ESmile.inherits(ESmile.FlowMapChart, ESmile.Chart);

ESmile.FlowMapChart.prototype._makeEffect = function () {
    if (!this._scene) {
        this._scene = new THREE.Scene();
    }
    if (!this._graphic)
        this._graphic = new ESmile.GraphicObject();
    //light
    this._light = new THREE.AmbientLight(0xaaaaaa);
    /*var light1 = new THREE.DirectionalLight( 0x363877 );
    var light2 = new THREE.DirectionalLight( 0xeeeeee );
    var light3 = new THREE.DirectionalLight( 0x444444 );
    var light4 = new THREE.DirectionalLight( 0x111111 );
    light1.position.set( -100, -100,150);
    light2.position.set(100, -100,50);
    light3.position.set(0, 100,50);*/
    //  light4.position.set( -100, -100,50);
    //this._light.add(light3).add(light1);

    //scene

    this._scene.add(this._light);
    //this._scene.add( light );
    var backgroundGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
    var backgroundMaterial = new THREE.MeshBasicMaterial( { color: new THREE.Color(0x000000), side: THREE.BackSide } );
    var background = new THREE.Mesh( backgroundGeometry, backgroundMaterial );


    // this._scene.add(title.root);
    /*var map = new ESmile.DistrictMap(this._map, this._data, this._renderer.domElement);*/
    var scope = this;
    (new ESmile.GeoJsonLoader()).load(this._mapType, function(geoJson){
        scope._districtGeoJson = geoJson;
        var titles = [],colors = [],values = [];
        titles.push("出口");
        values["出口"] = "o";
        titles.push("进口");
        values["进口"] = "i";
        colors.push(0x4d4dff);
        colors.push(0xff0000);

        var sliderBartitles = [];
        scope._flowData.getTimes().forEach(function(time){
            sliderBartitles.push(time);
        });
        /*scope._flowData.forEach(function(data){
            sliderBartitles.push(data.time);
        });*/
        /* SliderBar设置 */
        scope._sliderBar.init({titles:sliderBartitles});

        /* Legend设置 */
        scope._legend.initLegend({
            background:scope._backGroundColor,
            style:"Single",width:"100",height:"50",align:"right",
            vlign:"bottom",opacity:"0.7",flags:colors,titles:titles,values:values,
            custom:["auto","10px","10px","auto"],titleStyle:{"font-size":"15px",color:"#ffffff"}});

        scope._legend.initEvent = function(){
            for(var  v in scope._legend.lines){
                scope._legend.lines[v].onclick = null;
                scope._legend.lines[v].onclick = function(event){
                    var select = this.getAttribute("data-chart-name")
                    var color = this.getAttribute("data-chart-color");
                    var currentStatus = this.getAttribute("data-chart-select");
                    if(currentStatus == "on") {
                        this.setAttribute("data-chart-select","off");
                        map.selectStatue(select,"off");
                        this.style.color = "#eeeeee";
                        this.children[0].style.background = "#eeeeee";
                        this.children[1].style.color = "#999999";
                    }else{
                        this.setAttribute("data-chart-select","on");
                        map.selectStatue(select,"on");
                        this.style.color = "";
                        this.children[0].style.background = color;
                        this.children[1].style.color = "#ffffff";
                    }
                    scope._legendStatue = scope._legend.getSelectStatue();
                    map.setLegendStatue(scope._legendStatue);
                };
                scope._legend.lines[v].onmouseover = function(event){console.log("onmouseover")};
                scope._legend.lines[v].onmouseout = function(event){console.log("onmouseout")};
            }
        };
        scope._legend.initEvent();
        /* Legend状态提取*/
        scope._legendStatue = scope._legend.getSelectStatue();


        /* FlowMap新建*/
        var options = {
            undersideColor:0x191929,
            selectedColor:0x36648B,
            legendStatue:scope._legendStatue
        };
        var map = new ESmile.FlowMap(scope._districtGeoJson, scope._flowData , scope._domElement ,options);
        scope._map = map;
        scope._graphic = map;

        scope._graphicToScene(scope._scene, scope._graphic);
        var maxEdge = Math.max(map.boundBox[2] - map.boundBox[0], map.boundBox[3] - map.boundBox[1]);

        scope._camera.position.set(0, -maxEdge , maxEdge/(2*Math.tan(30*Math.PI/360)));
        scope._camera.lookAt(new THREE.Vector3(0,0,0));
        scope._scene.add(scope._camera);



        /* Camera位置自适应 */
        var maxEdge = Math.max(map.boundBox[2] - map.boundBox[0], map.boundBox[3] - map.boundBox[1]);
        scope._camera.position.set(map.centerPoint.x, map.centerPoint.y - maxEdge, maxEdge/(2*Math.tan(60*Math.PI/360)));
        var lookAt = new THREE.Vector3(map.centerPoint.x, map.centerPoint.y,0);
        scope._scene.add(scope._camera);
        scope._control.setTarget(lookAt);

    });




};
ESmile.FlowMapChart.prototype.updateFlowData = function (time) {
    this._legendStatue = this._legend.getSelectStatue();
    this._map.updateFlowData(time);
    this._map.drawCurves(/*this._legendStatue*/);
}

