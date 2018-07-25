/**
 * E-Smile ModelChart.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  ModelChart
 * @Date: 2015/1/23
 * @Version: 0.1
 */

ESmile.ModelChart = function( domElement , options ){
    ESmile.Chart.call(this, domElement, options);
    this._mapType = options.mapType;

    this._camera = new THREE.PerspectiveCamera( 85 , this._width/this._height, 1 , 1000000 );
    this._models = options.models;
    //control
    /*this._control = new THREE.FirstPersonControls(this._camera);
    this._control.movementSpeed = 100;
    this._control.lookSpeed = 0.1;*/
    this._control = new THREE.OrbitControls(this._camera, this._renderer.domElement);

    this._legendStatue = [];
}
ESmile.inherits(ESmile.ModelChart, ESmile.Chart);

ESmile.ModelChart.prototype._makeEffect = function () {
    if (!this._scene) {
        this._scene = new THREE.Scene();
    }
    if (!this._graphic)
        this._graphic = new ESmile.GraphicObject();
    this._camera.position.z = 9;
    this._camera.position.x = 0;
    this._camera.position.y = 0;
    this._camera.lookAt(new THREE.Vector3(0, 0, 0));
    this._light = new THREE.AmbientLight(0xaaaaaa);
    this._scene.add(this._light);
    var directionalLight = new THREE.DirectionalLight(0xaaaaaa);
    directionalLight.position.set(-200, 200, 0).normalize();
    this._scene.add(directionalLight);
    var directionalLight = new THREE.DirectionalLight(0xaaaaaa);
    directionalLight.position.set(200, 200, 0).normalize();
    this._scene.add(directionalLight);
    var directionalLight = new THREE.DirectionalLight(0xaaaaaa);
    directionalLight.position.set(0, 0, 200).normalize();
    this._scene.add(directionalLight);
    /* this._scene.add(new THREE.AxisHelper(1000));
     var helper = new THREE.GridHelper( 200, 10 );
     helper.position.y = 0;
     this._scene.add( helper );*/
    this._scene.rotateY(Math.PI / 2);

    var models=[],titles = [],colors = [];;
    for (var m in this._models) {
        var model = new ESmile.Model({model: this._models[m]});
        var scope = this;
        model._onclick = function(){
            scope._description._contentElement.innerHTML = this._text;
            scope._description._contentElement.style.visibility = "visible";
        }
        model._onmouseout = function (event){
            scope._description._contentElement.innerHTML ="<div class='textcss'><h3>云亭</h3>&nbsp;&nbsp;&nbsp;&nbsp;以“公众”为中心,涉及到市民的衣食住行，如政务信息、公共服务信息、旅游导游信息等各类信息的查询。信息亭还包含了电子商务平台功能，围绕市民的日常需求开展网上或信息亭在线订购、"
                +"在线支付等服务，市民可在信息亭上完成电费、水费、煤气费、电话费等各类费用的查询、交纳，汽车、火车、飞机票的购买等。此外信息亭还将开设可视电话业务，今后市民可在信息亭上与各类公共服务单位、商家进行可视电话沟通。其主要出发点就是让市民真正享受到信息技术给他们带来的便利。</div>";
            scope._description._contentElement.style.visibility = "hidden";
            this.root.scale.x=this.root.scale.y=this.root.scale.z=1;
        }
        model._onmouseover = function (event){
            /*scope._description._contentElement.innerHTML = this._name;
             scope._description._contentElement.style.visibility = "visible";*/
            //this.root.scale.x=this.root.scale.y=this.root.scale.z=1.1;
            console.log(this.root.children[0].material);
        }
        if(model._name=="屋顶"||model._name=="框架"){
            model.clickable = false;
            model._onclick = function(){

            }
            model._onmouseout = function (event){
            }
            model._onmouseover = function (event){
            }
        }
        models[model._name]=model;
        titles.push(model._name);
        colors.push(new THREE.Color(Math.random() * 0xffffff));

        this._graphic.addChild(model);
    }
    this._graphicToScene(this._scene, this._graphic);


    scope._legend.initLegend({
        background:scope._backGroundColor,
        style:"Single",width:"140",height:"200",align:"right",
        vlign:"bottom",opacity:"0.7",flags:colors,titles:titles,
        custom:["auto","0px","0px","auto"],titleStyle:{"font-size":"12px",color:"#000000"},flagClassName:"Yt_flag"});

    scope._legend.initEvent = function(){
        for(var  v in scope._legend.lines){
            scope._legend.lines[v].onclick = null;
            scope._legend.lines[v].onclick = function(event){
                var select = this.getAttribute("data-chart-name")
                var color = this.getAttribute("data-chart-color");
                var currentStatus = this.getAttribute("data-chart-select");
                if(currentStatus == "on") {
                    this.setAttribute("data-chart-select","off");
                    models[select].visible = false;
                    models[select].root.visible = false;
                    this.style.color = "#eeeeee";
                    this.children[0].style.background = "#eeeeee";
                    this.children[1].style.color = "#999999";
                }else{
                    this.setAttribute("data-chart-select","on");
                    models[select].visible = true;
                    models[select].root.visible = true;
                    this.style.color = "";
                    this.children[0].style.background = color;
                    this.children[1].style.color = "#000000";
                }
                console.log( models[select]);

            };
            scope._legend.lines[v].onmouseover = function(event){console.log("onmouseover")};
            scope._legend.lines[v].onmouseout = function(event){console.log("onmouseout")};
        }
    };
    scope._legend.initEvent();
}

ESmile.ModelChart.prototype._onresize = function(){
    console.log("onresize");
}
ESmile.ModelChart.prototype.reset = function () {
    console.log("reset");
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize( window.innerWidth-5, window.innerHeight-5 );
};