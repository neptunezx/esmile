/**
* E-Smile EventCenter.js
* Copyright 2014 eHualu. All rights reserved.
* @Author: ZhangXiang
* @Date: 2014/11/13
* @Version: 0.1
*/

ESmile.EventCenter = function (chart, canvasElement) {
    var _this = this;
    ESmile.EventDispatcher.call(_this);
    _this._chart = chart;
    _this._domElement = canvasElement;
    _this._raycaster = new THREE.Raycaster();
    /* 
     * linePrecision参数设置线条精度，默认为1.0，但是该默认精度下获取鼠标焦点对象
     * 不够精确，造成鼠标点击不到目标对象.因而这里提高精度
     */
    _this._raycaster.linePrecision = 0.01;
    /*
     * PointCloud.threshold参数设置点云精度阀值，但是该默认精度下获取鼠标焦点对象
     * 不够精确，造成鼠标点击不到PointCloud对象.因而这里提高精度
     */
    _this._raycaster.params.PointCloud.threshold = 0.01;
    var listeners = {
        click: function (event) {
            console.log("eventcenter.onclick");
            var event = this._fixEvent(event);
            var lastMouseOverTarget = this._lastMouseOverTarget;
           // console.log(lastMouseOverTarget);
            if ((lastMouseOverTarget && lastMouseOverTarget.clickable)
                || !lastMouseOverTarget) {
                // 判断没有发生拖拽才触发click事件
                if (this._MouseMoveTimes < 5) {
                    this._propagateEvent(ESmile.Config.EventType.Click, lastMouseOverTarget, event );
                }
            }
           // this._mousemoveHandler(event);

        },


        dblclick: function (event) {
                console.log("eventcenter.ondblclick");
                var event = this._fixEvent(event);
                var lastMouseOverTarget = this._lastMouseOverTarget;
                if ((lastMouseOverTarget && lastMouseOverTarget.clickable)
                    || !lastMouseOverTarget) {
                    // 判断没有发生拖拽才触发dblclick事件
                    if (this._MouseMoveTimes < 5) {
                        this._propagateEvent(ESmile.Config.EventType.DblClick, lastMouseOverTarget, event );
                    }
                }
        },

        mouseup: function (event) {
            var event = this._fixEvent(event);
            console.log("eventcenter.onmouseup");
            this._isMouseDown = false;
            this._domElement.style.cursor = "auto";
            this._mouseDownTarget = null;
            this._propagateEvent(ESmile.Config.EventType.MouseUp, this._lastMouseOverTarget, event );
            this._processDragDrop(event);
            this._processDragEnd(event);
        },

        mousedown: function (event) {
            var event = this._fixEvent(event);

            // 重置 clickThreshold
            this._MouseMoveTimes = 0;

            if (event.button == 2) {
                //暂时屏蔽右键点击事件
                this._mouseDownTarget = null;
                return;
            }
            console.log("eventcenter.onmousedown");
            this._lastMouseDownMoment = new Date();
            this._isMouseDown = true;
            this._mouseDownTarget = this._lastMouseOverTarget;
            this._propagateEvent(ESmile.Config.EventType.MouseDown, this._mouseDownTarget, event );
        },

        mousemove: function (event) {
            // console.log("eventcenter.onmousemove");
            var event = this._fixEvent(event);


            // 鼠标移动计数器，在阀值内才能触发内部click,dblclick,mousedown事件
            this._MouseMoveTimes++;
            this._lastX = this._mouseX;
            this._lastY = this._mouseY;
            this._mouseX = event.clientX;
            this._mouseY = event.clientY;
            var dx = this._mouseX - this._lastX;
            var dy = this._mouseY - this._lastY;

            // 可能出现dragstart事件
            this._processDragStart(event);

            var currentMouseOverTarget = null;
            var graphic = this._intersectGraphic(this._chart._graphic, event.clientX, event.clientY);
            if (graphic) {

                this._intersectObject = graphic.intersect;
                currentMouseOverTarget = graphic.graphic;
                if(this._lastMouseOverTarget !== currentMouseOverTarget ){
                    this._processOutShape(event);
                    this._processDragLeave(event);
                    this._lastMouseOverTarget = currentMouseOverTarget;
                    this._processDragEnter(event);
                    this._processDragOver(event);
                    this._processOverShape(event);
                }

            } else {
                if (!this._draggingTarget
                    || (this._lastMouseOverTarget && this._lastMouseOverTarget != this._draggingTarget)) {
                    this._processOutShape(event);
                    this._processDragLeave(event);
                }

                this._lastMouseOverTarget = null;
            }

            this._propagateEvent(ESmile.Config.EventType.MouseMove, this._lastMouseOverTarget, event );
            if (this._lastMouseOverTarget && this._lastMouseOverTarget.clickable && !this._draggingTarget){
                this._domElement.style.cursor = "pointer";
            } else if (this._draggingTarget && this._isDragging) {
                this._domElement.style.cursor = "move";
            } else {
                this._domElement.style.cursor = "auto";
            }


            /*if (this._isDragging && !this._mouseDownTarget){
                this._chart._camera.position.x += -dx*0.5;
                this._chart._camera.position.y += dy*0.5;
            }*/

        },

        mousewheel: function (event) {
            var event = this._fixEvent(event);
            console.log("eventcenter.onmousewheel");
            this._propagateEvent(ESmile.Config.EventType.MouseWheel, this._lastMouseOverTarget, event);
        },

        mouseout: function (event) {
            var event = this._fixEvent(event);
            console.log("eventcenter.onmouseout");
            this._isDragging = false;
            this._isMouseDown = false;
            this._propagateEvent(ESmile.Config.EventType.MouseOut, this._chart._graphic, event);
            
        },

        resize: function (event) {
            var event = this._fixEvent(event);
            console.log("eventcenter.onresize");
            this._propagateEvent(event);
            var size = [this._chart._domElement.offsetWidth - 5 , this._chart._domElement.offsetHeight - 5 ];
            this._chart.setSize( size[0], size[1] );
            this._chart.dispatchEvent({ type: "resize", context:{ width: size[0], height: size[1] } });
        }


    };
    /* this上下文会在浏览器回调以下事件函数时被修改为DomElement的上下文
     * 为此需要修改this引用 */
    for (var eventType in listeners){
        _this["on" + eventType] = function(instance, listener){
                return function(event) { listener.call(instance, event); };
            }(_this, listeners[eventType]);
        _this.addEventListener(eventType, _this["on" + eventType] );

    }

    this.initilize();

};

ESmile.EventCenter.prototype = {
    constructor: ESmile.EventCenter,

    initilize: function () {
        // 初始化，事件绑定，支持的所有事件都由如下原生事件计算得来
        var domElement = this._domElement;
        var env = new ESmile.Util.Environment();

        if (window.addEventListener) {
            window.addEventListener('resize', this.onresize);
            domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
            if (env.os.tablet || env.os.phone) {
                // mobile支持
                domElement.addEventListener('touchstart', this.ontouchstart);
                domElement.addEventListener('touchmove', this.ontouchstart);
                domElement.addEventListener('touchend', this.ontouchstart);
            }
            else {
                // mobile的click/move/up/down自己模拟
                domElement.addEventListener('click', this.onclick);
                domElement.addEventListener('dblclick', this.ondblclick);
                domElement.addEventListener('mousewheel', this.onmousewheel);
                domElement.addEventListener('mousemove', this.onmousemove);
                domElement.addEventListener('mousedown', this.onmousedown);
                domElement.addEventListener('mouseup', this.onmouseup);
            }
            domElement.addEventListener('DOMMouseScroll', this.onmousewheel);
            domElement.addEventListener('mouseout', this.onmouseout);
        }
        else {
            window.attachEvent('onresize', this.onresize);
            domElement.attachEvent( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
            domElement.attachEvent('onclick', this.onclick);
            domElement.attachEvent('ondblclick ', this.ondblclick);
            domElement.attachEvent('onmousewheel', this.onmousewheel);
            domElement.attachEvent('onmousemove', this.onmousemove);
            domElement.attachEvent('onmouseout', this.ononmouseout);
            domElement.attachEvent('onmousedown', this.onmousedown);
            domElement.attachEvent('onmouseup', this.ononmouseup);
        }
        // domElement.addEventListener('click', listeners['click']);
    },

    dispose: function () {
        var domElement = this._domElement;
        var listeners = this._listeners;
        var env = new ESmile.Util.Environment();
        if (window.removeEventListener) {
            window.removeEventListener('resize', this.onresize);

            if (env.os.tablet || env.os.phone) {
                // mobile支持
                domElement.removeEventListener('touchstart', this.ontouchstart);
                domElement.removeEventListener('touchmove', this.ontouchmove);
                domElement.removeEventListener('touchend', this.ontouchend);
            }
            else {
                // mobile的click自己模拟
                domElement.removeEventListener('click', this.onclick);
                domElement.removeEventListener('dblclick', this.ondblclick);
                domElement.removeEventListener('mousewheel', this.onmousewheel);
                domElement.removeEventListener('mousemove', this.onmousemove);
                domElement.removeEventListener('mousedown', this.onmousedown);
                domElement.removeEventListener('mouseup', this.onmouseup);
            }
            domElement.removeEventListener('DOMMouseScroll',this.onmousewheel);
            domElement.removeEventListener('mouseout', this.onmouseout);
        }
        else {
            window.detachEvent('onresize',  this.onresize);
            domElement.detachEvent('onclick',  this.onclick);
            domElement.detachEvent('dblclick',  this.ondblclick);
            domElement.detachEvent('onmousewheel', this.onmousewheel);
            domElement.detachEvent('onmousemove',  this.onmousemove);
            domElement.detachEvent('onmouseout',  this.onmouseout);
            domElement.detachEvent('onmousedown',  this.onmousedown);
            domElement.detachEvent('onmouseup',  this.onmouseup);
        }
        this.removeAllEventListener();
    },

    // 获取鼠标点击的离视口平面最近的图形对象
    _intersectGraphic: function (graphic, clientX, clientY) {
        if (!this._chart || !graphic)
            return null;
        var camera = this._chart._camera;
        if (!camera)
            return null;
    

        // 获取鼠标点击的图形对象集合
        var getIntersectGraphics = function (raycaster, graphic, intersectGraphics) {
            if (!graphic.visible)
                return;

            var intersects = raycaster.intersectObject(graphic.root, true);
            if (intersects.length > 0) {
                for (var i = 0;i < intersects.length; i++){
                    if (intersects[i].object.visible){
                        intersectGraphics.push({"graphic": graphic, "intersect": intersects[i]});
                        break;
                    }
                }
            }


            var children = graphic.children;
            for (var i = 0, l = children.length; i < l; i++) {
                getIntersectGraphics(raycaster, children[i], intersectGraphics);
            }

        };

        // 将以视口区域左上角为原点的坐标系转换为以视口区域中心点为原点的坐标系
        var coordX = ( clientX / this._domElement.offsetWidth ) * 2 - 1;
        var coordY = -( clientY / this._domElement.offsetHeight ) * 2 + 1;

        var intersectGraphics = [];
        var vector = new THREE.Vector3(coordX, coordY, 0.5).unproject(camera);
        this._raycaster.set(camera.position, vector.sub(camera.position).normalize());


      /*
       console.log(camera.position);
       console.log(vector.sub(camera.position).normalize());

       console.log("offset:(%d, %d) range:[%d, %d] coordinate(%f, %f)",
            clientX, clientY, this._domElement.offsetWidth , this._domElement.offsetHeight, coordX, coordY);

       var intersects = this._raycaster.intersectObject(this._chart._scene, true);

       if (intersects.length > 0) {
         console.log("intersects:%d id:%d", intersects.length, intersects[0].object.id);
         console.log(intersects[0].object);
        }*/
        //this._raycaster.linePrecision = 0.01;
        getIntersectGraphics(this._raycaster, graphic, intersectGraphics);




//        if (intersectGraphics.length) {
//            console.log("ec:coordX:%f, coordY:%f, offsetWidth:%d, offsetHeight:%d clientX:%d, clientY:%d ", coordX, coordY,
//                this._domElement.offsetWidth, this._domElement.offsetHeight, clientX, clientY);
//
//            for (var i in intersectGraphics){
//                console.log("*ID:%d Distance:%f", intersectGraphics[i].graphic.root.id, intersectGraphics[i].intersect.distance);
//            }
//            console.log(intersectGraphics);
//        } 

        switch (intersectGraphics.length) {
            case 0:
                return null;
            case 1:
                return intersectGraphics[0];
            default:
                var descSort = function (a, b) {
                    return a.intersect.distance - b.intersect.distance;
                };
                intersectGraphics.sort(descSort);
                return intersectGraphics[0];
        }

    },

    // 浏览器原生事件兼容性处理
    _fixEvent: function(event){
       /* console.log("event.layerX:%d layerY:%d", event.layerX, event.layerY);
        console.log("event.offsetX:%d offsetX:%d", event.offsetX, event.offsetY);*/
        var fixEvent = {
            event:event,
            target: event.target || event.srcElement || event.relatedTarget || event.toElement,
            clientX: event.offsetX || event.layerX,
            clientY: event.offsetY || event.layerY
        };
        return fixEvent;
    },

    // 冒泡传播事件
    _propagateEvent: function ( eventType, targetGraphicObject, fixEvent, dragTarget ) {
        if (!targetGraphicObject)
            return;
        var event = new ESmile.Event(eventType, targetGraphicObject, fixEvent, dragTarget);
        var target = targetGraphicObject;
        while (target && !event.cancelBubble) {
         //   console.log("propagating event...");
            target.dispatchEvent(event);
            target = target.parent;
        }
    },


    _processDragStart: function(event){
        var lastMouseOverTarget = this._lastMouseOverTarget;
        if (this._isMouseDown
            && this._MouseMoveTimes > 4
            && lastMouseOverTarget
            && lastMouseOverTarget.dragable
            && !this._draggingTarget
            && this._mouseDownTarget == lastMouseOverTarget) {

                // 拖拽点击生效时长阀门，某些场景需要降低拖拽敏感度
                if (lastMouseOverTarget.dragEnableTime &&
                    new Date() - this._lastMouseDownMoment < lastMouseOverTarget.dragEnableTime ) {
                    return;
                }

                this._isDragging = true;

                var draggingTarget = lastMouseOverTarget;
                this._draggingTarget = draggingTarget;

                this._domElement.style.cursor = "move";
                //_draggingTarget.visible = false;

                this._propagateEvent(ESmile.Config.EventType.DragStart, draggingTarget, event );
                return;
        }


    },

    _processDragEnd: function (event) {
        if (this._draggingTarget) {
            this._propagateEvent(ESmile.Config.EventType.DragEnd, this._draggingTarget, event );
            this._lastMouseOverTarget = null;
        }

        this._isDragging = false;
        this._draggingTarget = null;
    },

    _processDragDrop: function (event) {
        if (this._draggingTarget) {
            //this._draggingTarget.invisible = false;
            this._propagateEvent( ESmile.Config.EventType.DragDrop, this.lastMouseOverTarget, event, this._draggingTarget );
        }
    },

    _processDragEnter: function (event) {
        if (this._draggingTarget) {
            //this._draggingTarget.invisible = false;
            this._propagateEvent(ESmile.Config.EventType.DragEnter, this.lastMouseOverTarget, event,  this._draggingTarget);
        }
    },


    _processDragLeave: function (event) {
        if (this._draggingTarget) {
            //this._draggingTarget.invisible = false;
            this._propagateEvent(ESmile.Config.EventType.DragLeave, this.lastMouseOverTarget, event, this._draggingTarget );
        }
    },

    _processDragOver: function (event) {
        if (this._draggingTarget) {
            //this._draggingTarget.invisible = false;
            this._propagateEvent(ESmile.Config.EventType.DragOver, this.lastMouseOverTarget, event, this._draggingTarget );
        }
    },

    _processOverShape: function (event) {
        if(this._lastMouseOverTarget)
            this._propagateEvent(ESmile.Config.EventType.MouseOver, this._lastMouseOverTarget, event );
    },

    _processOutShape: function (event) {
        if(this._lastMouseOverTarget)
            this._propagateEvent(ESmile.Config.EventType.MouseOut, this._lastMouseOverTarget, event );
    },

    getRaycaster: function(){
        return this._raycaster;
    }
}

ESmile.EventDispatcher.prototype.apply(ESmile.EventCenter.prototype);




