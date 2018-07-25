/**
 * E-Smile FlowMap.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  gujj
 * @Date: 2014/11/26
 * @Version: 0.1
 */

ESmile.FlowMap = function ( districtGeoJson , flowData , chartDomElement , options) {
    ESmile.GraphicObject.call(this);
    this._districtGeoJson = districtGeoJson;
    if(options.undersideColor!==undefined) var undersideColor = options.undersideColor;
    if(options.selectedColor!==undefined) var selectedColor = options.selectedColor;
    this._districtMap = new ESmile.DistrictMap(districtGeoJson,"",chartDomElement,{undersideColor:undersideColor,selectedColor:selectedColor});

    this.boundBox = this._districtMap.boundBox;


    this.centerPoint = this._districtMap.centerPoint;
    this._data = flowData;

    //this._flowData = flowData;
    var defaultSelectItem = options.defaultSelectItem!==undefined ?options.defaultSelectItem:this._data.getFirstItem();
    var defaultSelectTime = options.defaultSelectTime!==undefined ?options.defaultSelectTime:this._data.getFirstTime();

    this._flowData = this._data.getData({selectDistrict:defaultSelectItem,selectTime:defaultSelectTime});

    this._chooseFrom = defaultSelectItem;//当前选择区域对象
    this._curves = [];
    this._selectTime = defaultSelectTime;//当前选择事件
    this._statistics = this._data.getStatistics(defaultSelectTime);//数据按选择区域对象进行数量统计


    this._content = [];
    this._chartDomElement = chartDomElement;
    this._cps = [];
    this._toolTip = new ESmile.Tooltip(chartDomElement);
    this._legendStatue = options.legendStatue!==undefined?options.legendStatue:[];

    this.addChild(this._districtMap);
    this.maxEdge = Math.max(this.boundBox[2] - this.boundBox[0], this.boundBox[3] - this.boundBox[1]);
    this.initialize();


};

ESmile.FlowMap.prototype = Object.create(ESmile.GraphicObject.prototype);

/*ESmile.FlowMap.prototype.setVisible = function (visible) {
    this.visible = visible;
};*/

ESmile.FlowMap.prototype.dispose = function () {
    ESmile.GraphicObject.prototype.dispose.apply(this);
    //TODO: custom dispose
};

ESmile.FlowMap.prototype.clear = function () {
    ESmile.GraphicObject.prototype.clear.apply(this);
    //TODO: custom clear
};

ESmile.FlowMap.prototype.initialize = function (){
    var features = this._districtGeoJson.features;

    features.forEach(
        function (feature) {
            this._cps[feature.properties.name]=feature.properties.cp;
            this._cps[feature.id]=feature.properties.cp;

        },this);

    var scope = this;
    this._districtMap.forEachChild(function(child){
        child.clickable = true;
        child.addEventListener("click",
            function(e){
                e.preventDefault();
                var go = e.target;
                scope._chooseFrom = go.getId();
            });
    });

    var tooltip = this._toolTip;
    this._districtMap.onTooltip = function(district){

        if(scope._statistics[district.getId()]!==undefined){
            tooltip.show("<p style = 'line-height:150%'><strong>" + district.getId() + "</strong><br><strong>出口量："+(scope._statistics[district.getId()].o==undefined?0:scope._statistics[district.getId()].o)+"</strong><br><strong>进口量："+(scope._statistics[district.getId()].i==undefined?0:scope._statistics[district.getId()].i)+"</strong></p>", 200);


        }else{
            tooltip.show("<p style = 'line-height:150%'><strong>" + district.getId() + "</strong><br>", 200);
           }
    }

    this.drawCurves();



};

//legend使用
ESmile.FlowMap.prototype.selectStatue = function(opt,state){

    this._curves.forEach(function(curve){
        if(curve.root.name==opt){
            if(state=="off")
                curve.setVisible(false);
            else
                curve.setVisible(true);
        }
    });
    /*this._curves[this._selectTime].curves.forEach(function(curve){
        if(curve.root.name==opt){
            if(state=="off")
                curve.setVisible(false);
            else
                curve.setVisible(true);
        }
    });*/
};

ESmile.FlowMap.prototype.setLegendStatue = function(legendStatue){
   this._legendStatue = legendStatue;
};

ESmile.FlowMap.prototype._onclick = function(event){
    this.disposeCurves();
    this.updateFlowData(this._selectTime);
    this.drawCurves(/*this._legendStatue*/);

};

ESmile.FlowMap.prototype._onMouseOver = function(event){

};

ESmile.FlowMap.prototype._onmouseout = function(event){
    if (this._toolTip)
        this._toolTip.hide();
};

ESmile.FlowMap.prototype.updateFlowData = function(time){
    this.disposeCurves();
    this._selectTime = time;
    this._flowData = this._data.getData({selectDistrict:this._chooseFrom,selectTime:this._selectTime/*,selectOptions:selectOptions*/});
    this._statistics = this._data.getStatistics(time);
};

ESmile.FlowMap.prototype.drawCurves = function(/*legendStatue*/){
    var legendStatue = this._legendStatue;
    var tooltip = this._toolTip;
    for(var i in this._flowData) {
        var normalizer = new ESmile.Normalizer(this._flowData[i], "amount", "linear",
            { min: 0, max: 20  });

        this._flowData[i].forEach(function (data) {

            var start = new THREE.Vector3(this._cps[data.from][0], this._cps[data.from][1], 0);
            var end = new THREE.Vector3(this._cps[data.to][0], this._cps[data.to][1], 0);
            var options = {
                from: data.from,
                to: data.to,
                start: start,
                end: end,
                pointCloudSize:constrain(Math.sqrt(Math.floor(normalizer.normalize(data.amount)))+30,0.1,60) /*(normalizer.normalize(data.amount) < 5 ? 15 : Math.sqrt(normalizer.normalize(data.amount)) + 15)*/,
                withGlowPoint: false,
                amount: data.amount,
                normalizerCount: normalizer.normalize(data.amount),
                visible: false,
                unit: this.maxEdge / 20
            };
            var curve = new ESmile.GlowCurve(options);
            //curve.translate( -this.centerPoint.x,-this.centerPoint.y );
            this._curves.push(curve);
            curve.setVisible(false);
            if(curve.from == this._chooseFrom) {
                curve.changeColor(0x154492,0x154492);
                curve.setName("出口");
            }
            if(curve.to == this._chooseFrom) {
                curve.changeColor(0xdd380c,0xdd380c);
                curve.setName("进口");
            }
            for(var i in legendStatue){
                if(data.statue == legendStatue[i]) {
                    curve.setVisible(true);
                    break;
                }
            }

            curve.addEventListener("mouseover",
                function (e) {

                    var go = e.target;

                    if (go.amount !== 0)
                        tooltip.show("<p style = 'line-height:150%'><strong>出口：" + go.from + "</strong><br><strong>进口：" + go.to + "</strong><br>指数:" + go.amount + "</p>", 200);
                    else
                        tooltip.show("<p style = 'line-height:150%'><strong>出口：" + go.from + "</strong><br><strong>" + go.to + "</strong>", 200);
                }
            );
            curve.addEventListener("mouseout",
                function (e) {
                    tooltip.hide();
                }
            );
            this.addChild(curve);
        }, this);
    }
    /*this._curves.forEach(function(curve){
            if(curve.from == this._chooseFrom) {
                curve.changeColor(0xffffff,0x4d4dff);
                curve.setVisible(true);
                curve.setName("出口");
            }
            if(curve.to == this._chooseFrom) {
                curve.changeColor(0xffffff,0xB3EE3A);
                curve.setVisible(true);
                curve.setName("进口");
            }
        },this
    );*/



    /*this._flowData.forEach(function(data){
        if(typeof (data.amount)=="string") data.amount = parseFloat(data.amount);
        var start = new THREE.Vector3(this._cps[data.from][0],this._cps[data.from][1],0);
        var end = new THREE.Vector3(this._cps[data.to][0],this._cps[data.to][1],0);

        var options = {
            from:data.from,
            to:data.to,
            start:start,
            end:end,
            pointCloudSize:(normalizer.normalize(data.amount)<5?15:normalizer.normalize(data.amount)+15),
            withGlowPoint:false,
            amount:data.amount,
            normalizerCount:normalizer.normalize(data.amount),
            visible:false,
            unit:maxEdge/40
        };
        var curve = new ESmile.GlowCurve(options);
        //curve.translate( -this.centerPoint.x,-this.centerPoint.y );
        this._curves.push(curve);
        curve.setVisible(false);
        if(curve.from == this._chooseFrom) {
            curve.changeColor(0xffffff,0x4d4dff);
            curve.setName("出口");
        }
        if(curve.to == this._chooseFrom) {
            curve.changeColor(0xffffff,0xB3EE3A);
            curve.setName("进口");
        }
        for(var i in legendStatue){
            if(data.statue == legendStatue[i]) {
                curve.setVisible(true);
                break;
            }
        }


        curve.addEventListener("mouseover",
            function(e){

                var go = e.target;

                if (go.amount !== 0)
                    tooltip.show("<p style = 'line-height:150%'><strong>出口：" + go.from + "</strong><br><strong>进口："+go.to+"</strong><br>指数:" + go.amount + "</p>", 200);
                else
                    tooltip.show("<p style = 'line-height:150%'><strong>出口：" + go.from + "</strong><br><strong>"+go.to+"</strong>", 200);
            }
        );
        curve.addEventListener("mouseout",
            function(e){
                tooltip.hide();
            }
        );
        this.addChild(curve);

    },this);*/

   /* this._curves.forEach(function(curve){
            if(curve.from == this._chooseFrom) {
                curve.changeColor(0x4d4dff);
                curve.setVisible(true);
                curve.setName("出口");
            }
            if(curve.to == this._chooseFrom) {
                curve.changeColor(0xff0000);
                curve.setVisible(true);
                curve.setName("进口");
            }
        },this
    );*/
}
ESmile.FlowMap.prototype.disposeCurves = function(){
    if(this._curves.length>0){
        this._curves.forEach(function(curve){
            curve.dispose();
        });
    }
    this._curves=[];
}

function constrain(v, min, max){
    if( v < min )
        v = min;
    else
    if( v > max )
        v = max;
    return v;
}