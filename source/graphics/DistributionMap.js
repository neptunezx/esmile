/**
 * E-Smile DistributionMap.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: hjd
 * @Date: 2014/11/21
 * @Version: 0.1
 */

/**
 * @constructor ESmile.DistributionMap
 * @param {GeoJson} districtGeoJson 标准GeoJson格式的数据
 *               参考:The GeoJSON Format Specification
 *               每个feature代表一个district
 * @param {Object} distributionData 标准GeoJson格式的每个feature数据项对应的代表人口密度的立方体的信息
 * districtData = [
 * { code: code1, x: x1, y:y1,z:z1, amount:a1,color:c1 },
 * { code: code2, x: x2, y:y2,z:z2, amount:a2,color:c2},
 * ...
 * { code: code.n, x: xn, y:yn,z:zn, amount:an,color:cn }
 * ]
 * idi是districtGeoJson.features[i].id, id和name属性至少有一个
 * @param {DomElement} chartDomElement 图表对象关联div的DomElement
 */
ESmile.DistributionMap = function ( districtGeoJson,distributionData, chartDomElement ) {
    ESmile.GraphicObject.call(this);
    this._mapData = distributionData;
    this._districtGeoJson = districtGeoJson;
    this._content = [];
    this._chartDomElement = chartDomElement;
    this._mapCitiesName = [];
    this._tooltip = new ESmile.Tooltip(chartDomElement);

    /*分布数据整理*/
    this._sumHeight = 0;
    this._cubeCounter = 0;
    this._minDistribution = 0;
    this._maxDistribution = 0;
    this._sumDistribution = 0;
    this._averDistribution = 0;
    this._regionDistribution = new Array();
//    this._regionCounter = 0;
   /* this._minColor = null;
    this._maxColor = null;
    this._averColor = null;*/

    this.initialize();
};

ESmile.DistributionMap.prototype = Object.create(ESmile.GraphicObject.prototype);

ESmile.DistributionMap.prototype.setVisible = function (visible) {
    this.visible = visible;
};

ESmile.DistributionMap.prototype.dispose = function () {

};

ESmile.DistributionMap.prototype.clear = function () {
};


ESmile.DistributionMap.prototype.initialize = function (){

    /*
     * 底图加载
     */
    var districtMap = new ESmile.DistrictMap(this._districtGeoJson,[], this._chartDomElement, {undersideColor:0xacacac});
    districtMap.forEachChild(function (child) {
        child._polygonColumnMesh.forEach(function(mesh){
            mesh.castShadow = true;
            mesh.receiveShadow = false;
        })
        child._polygonColumnBottom.forEach(function(mesh){
            mesh.receiveShadow = true;
        })

    });
    var districtData = districtMap._districtGeoJson.features;
    var idList = [];
    for(var i in districtData){
        this._mapCitiesName.push(districtData[i].properties.name);
        console.log("name=%s",districtData[i].properties.name);
        idList[districtData[i].properties.name] = {"id":districtData[i].id};
    }
    this.addChild(districtMap);

//    var regions = JSON.parse( this._mapData);

    for(var j in this._mapData) {
        var regionCounter = 0;
        var regionSumDistribution = 0;
        for (var i in this._mapData[j].amounts) {
            this._cubeCounter++;
            regionCounter ++;
            regionSumDistribution += this._mapData[j].amounts[i].Distribution;
            this._sumDistribution += this._mapData[j].amounts[i].Distribution;
            if(this._minDistribution > this._mapData[j].amounts[i].Distribution)
                this._minDistribution = this._mapData[j].amounts[i].Distribution;
            if(this._maxDistribution < this._mapData[j].amounts[i].Distribution)
                this._maxDistribution = this._mapData[j].amounts[i].Distribution;
        }
        this._regionDistribution.push({regionCounter:regionCounter,regionSumDistribution:regionSumDistribution});
    }
    this._averDistribution = this._sumDistribution/this._cubeCounter;
    /*this._maxColor = new THREE.Color(this._maxDistribution/this._maxDistribution, 0, 1 - this._maxDistribution/this._maxDistribution);
    this._minColor = new THREE.Color(this._minDistribution/this._maxDistribution ,0 , 1 - this._minDistribution/this._maxDistribution);
    this._averColor = new THREE.Color(this._averDistribution/this._maxDistribution ,0 , 1 - this._averDistribution/this._maxDistribution);*/

    for(var j in this._mapData)
    {
        for( var i in this._mapData[j].amounts )
        {

            this._distributionData = {region:this._mapData[j].region,x:this._mapData[j].amounts[i].x, y:this._mapData[j].amounts[i].y,color:this._mapData[j].color,Distribution:this._mapData[j].amounts[i].Distribution };
            var cube = new ESmile.Cube(this._distributionData,districtMap.boundBox,this._maxDistribution);
            this.addChild(cube);

            var tooltip = this._tooltip;
            var scope = this;
            cube.addEventListener("mouseover",
                function(e){
                    var go = e.target;
                    if (!go.clickable)
                        return;

                    tooltip.show("<p style = 'line-height:150%'><strong>" + go.getId() + "</strong><br>每平方米:" + Math.round(go._cubeDistribution*100)/100 + "人<br>"+
                        "平均: 每平方米"+
                        Math.round(scope._regionDistribution[j].regionSumDistribution/scope._regionDistribution[j].regionCounter*100)/100+"人</p>", 150);

                }
            );
            cube.addEventListener("mouseout",
                function(e){
                    if (!e.target.clickable)
                        return;
                    tooltip.hide();
                }
            );

        }
    }

//    this._averageHeight = sumHeight/cubeCounter;
//    this.averColor = [ this._averageHeight/this.maxHeight ,0 , 1 - this._averageHeight/this.maxHeight  ];

};

ESmile.DistributionMap.prototype._onclick = function(event){

};

ESmile.DistributionMap.prototype._onmouseover = function(event){
    if(this.hoverable) {
        /*this._showAveragePlane(true);*/
    }
};

ESmile.DistributionMap.prototype._onmouseout = function(event){
    if(this.hoverable) {
        console.log("DistributionMap._onmouseout")
        /* this._showAveragePlane(false);*/
    }
};

ESmile.DistributionMap.prototype._showAveragePlane = function(show){

    if(show)
    {
        this.averColor = [ this._averageHeight/this.maxHeight ,0 , 1 - this._averageHeight/this.maxHeight  ];
        console.log("color",color);
        if (!this._averagePlane) {
            this._averagePlane = new THREE.Mesh(new THREE.PlaneGeometry(2,2,3, 3),new THREE.MeshBasicMaterial( {color:"#FFFF00", opacity:0.4, transparent:true } ));
        }
        this._averagePlane.visible = true;
        this._averagePlane.position.x = this.children[0].centerPoint.x;
        this._averagePlane.position.y = this.children[0].centerPoint.y;
        this._averagePlane.position.z = this._averageHeight;
        this.root.add(this._averagePlane);
    }
    else
    {
        if (this._averagePlane) {
            this._averagePlane.visible = false;
        }
    }

};

