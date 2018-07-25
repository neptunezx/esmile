/**
 * E-Smile DistrictMap.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: gjj
 * @Date: 2014/11/21
 * @Version: 0.1
 */

/**
 @constructor ESmile.DistrictMap
 @param {GeoJson} districtGeoJson 标准GeoJson格式的数据
                参考:The GeoJSON Format Specification
                每个feature代表一个district
@param {Object} districtData 标准GeoJson格式的每个feature数据项对应的各区域颜色和相应信息量
         districtData = [
                            { id: id1, name: name1, color:c1, amount:a1 },
                            { id: id2, name: name2, color:c2, amount:a2 },
                            ...
                            { id: idn, name: namen, color:cn, amount:an }
                        ]
          idi是districtGeoJson.features[i].id, id和name属性至少有一个
 @param {DomElement} chartDomElement 图表对象关联div的DomElement
 */
ESmile.DistrictMap = function ( districtGeoJson, districtData, chartDomElement, options ) {
    ESmile.GraphicObject.call(this);
    this._type = "ESmile.DistrictMap";
    this._undersideColor = ESmile.Theme.PolygonColumnColor;
    this._selectedMode = ESmile.Theme.MapSelectedMode;
    this._selectedColor = ESmile.Theme.MapSelectedColor;
    if (options) {   
        if (options.undersideColor !== undefined)
            this._undersideColor = options.undersideColor ;
        if (options.selectedMode !== undefined)
            this._selectedMode = options.selectedMode ;
        if (options.selectedColor !== undefined)
            this._selectedColor = options.selectedColor;
    }
   
    this._districtGeoJson = districtGeoJson;
    this._districtData = districtData ? districtData : [];
    this._content = [];
    this._chartDomElement = chartDomElement;
    this._tooltip = null;
    this._initialize();

};

ESmile.DistrictMap.prototype = Object.create(ESmile.GraphicObject.prototype);

ESmile.DistrictMap.prototype.setVisible = function (visible) {
    this.visible = visible;
};

ESmile.DistrictMap.prototype.dispose = function () {

};

ESmile.DistrictMap.prototype.clear = function () {
};



ESmile.DistrictMap.prototype._initialize = function (){

    var features = this._districtGeoJson.features;

    // 求出地图数据点集所在的最小范围盒子
    var boundBox = [features[0].geometry.coordinates[0][0][0], features[0].geometry.coordinates[0][0][1],
        features[0].geometry.coordinates[0][0][0], features[0].geometry.coordinates[0][0][1]];

    for (var i = 0, li = features.length; i < li; i++){
        var coordinates;
        if (features[i].geometry.type === "MultiPolygon") {
            var multiCoordinates =  features[i].geometry.coordinates;

            for (var m = 0, lm = multiCoordinates.length; m < lm; m++){
                coordinates = multiCoordinates[m];

                for (var j = 0, lj = coordinates.length; j < lj; j++){
                    for (var k = 0, lk = coordinates[j].length; k < lk; k++){
                        boundBox[0] = boundBox[0] < coordinates[j][k][0] ? boundBox[0] : coordinates[j][k][0];
                        boundBox[1] = boundBox[1] < coordinates[j][k][1] ? boundBox[1] : coordinates[j][k][1];
                        boundBox[2] = boundBox[2] > coordinates[j][k][0] ? boundBox[2] : coordinates[j][k][0];
                        boundBox[3] = boundBox[3] > coordinates[j][k][1] ? boundBox[3] : coordinates[j][k][1];
                    }
                }
            }

        } else { //(features[i].geometry.type == "Polygon")
            coordinates = features[i].geometry.coordinates;

            for (j = 0, lj = coordinates.length; j < lj; j++){
                for (k = 0, lk = coordinates[j].length; k < lk; k++){

                    boundBox[0] = boundBox[0] < coordinates[j][k][0] ? boundBox[0] : coordinates[j][k][0];
                    boundBox[1] = boundBox[1] < coordinates[j][k][1] ? boundBox[1] : coordinates[j][k][1];
                    boundBox[2] = boundBox[2] > coordinates[j][k][0] ? boundBox[2] : coordinates[j][k][0];
                    boundBox[3] = boundBox[3] > coordinates[j][k][1] ? boundBox[3] : coordinates[j][k][1];
                }
            }
        }

    }
    var mapCenterPoint = { x:(boundBox[0] + boundBox[2])/ 2, y:(boundBox[1] + boundBox[3])/2 } ;
    this.boundBox = boundBox;
    this.centerPoint = mapCenterPoint;

    // 准备将districtData的amount属性值归一化，使得生成的各项子区PolygonColumn高度自适应
    var maxHeight = 0.25*Math.max(this.boundBox[2]-this.boundBox[0], this.boundBox[3]-this.boundBox[1]);
    var normalizer = new ESmile.Normalizer(this._districtData, "amount", "linear",
        { min:0, max:maxHeight  });

    function DistrictNameCompare(name1, name2){
        if (!name1 || !name2)
            return false;
        var n1 = (name1[name1.length-1] === "市") ? name1.substr(0, name1.length-1): name1 ;
        var n2 = (name2[name2.length-1] === "市") ? name2.substr(0, name2.length-1): name2 ;

        return n1 === n2;
    }

    features.forEach(
        function (feature) {
            for (var i = 0; i < this._districtData.length; i++){
                // console.log(":%s =? %s", this._districtData[i].id, feature.id);
                if (this._districtData[i].id === feature.id
                    || DistrictNameCompare (this._districtData[i].name, feature.properties.name))
                {
                    break;
                }
            }
            var options = {
                pathData:feature.geometry.coordinates,
                color: this._undersideColor,
                amount: 0,
                visible: true
            };
            
            options.pathData = feature.geometry.coordinates;
            if ( i < this._districtData.length) {
                options.color = this._districtData[i].color;
                options.amount = normalizer.normalize(this._districtData[i].amount);
                this._districtData[i].name = feature.properties.name;
                this._districtData[i].id = feature.properties.id;
               // console.log("this._districtData[i].amount:%f, options.amount:%f", this._districtData[i].amount, options.amount);
            }
            
            var polygonColumn = new ESmile.PolygonColumn(options);
          //  polygonColumn.clickable = i < this._districtData.length ? true : false;
            polygonColumn.root.name = feature.properties.name;
            polygonColumn.setId(polygonColumn.root.name);
            polygonColumn.addEventListener("click", function(e){ e.preventDefault(); });
            this.addChild(polygonColumn);

        }, this);
       

};

ESmile.DistrictMap.prototype._onclick = function (event) {
    console.log("DistrictMap._onclick");
    var go = event.srcTarget;
    if (this._selectedMode === ESmile.Config.MapSelectedMode.Multiple) {
        return;
    }

    if (go._selected === undefined) {
        go._selected = false;
    }
    go._selected = !go._selected;
    if (go._selected)
        go.setColor(event.target._selectedColor);
    else
        go.setColor(go._color);
    this._currentSelectedDistrict = event.srcTarget;
    if (this._lastSelectedDistrict !== this._currentSelectedDistrict) {
        if (this._lastSelectedDistrict !== undefined) {
            this._lastSelectedDistrict.setColor(this._lastSelectedDistrict._color);
            this._lastSelectedDistrict._selected = false;
        }
        this._lastSelectedDistrict = this._currentSelectedDistrict;
    }

    this._currentSelectedDistrict = null;

};

ESmile.DistrictMap.prototype._onmousemove = function (event) {
    console.log("DistrictMap._onmouseover");
    this.onTooltip(event.srcTarget);
};

ESmile.DistrictMap.prototype._onmouseout = function (event) {
    if (this._tooltip)
        this._tooltip.hide();
};

ESmile.DistrictMap.prototype.onTooltip = function(district){
    if(this._tooltip === null) {
        this._tooltip = new ESmile.Tooltip(this._chartDomElement);
    }
    if (district._amount !== 0)
        this._tooltip.show("<p style = 'line-height:150%'><strong>" + district.getId() + "</strong><br>指数:" + parseFloat(district._amount).toFixed(2) + "</p>", 120);
    else
        this._tooltip.show("<p style = 'line-height:150%'><strong>" + district.getId() + "</strong></p>", 120);
};
 
