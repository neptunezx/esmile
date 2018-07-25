/**
 * E-Smile GraphicObject.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/11/19
 * @Version: 0.1
 */

ESmile.GraphicObject = function () {
    ESmile.EventDispatcher.call(this);

    this.clickable = true;
    this.dragable = true;
    this.hoverable = true;
    this.visible = true;

    this.children = [];
    this.parent = undefined;
    this.root = new THREE.Object3D();
    this.root.userData = this;
    
    this._type = "ESmile.GraphicObject";
    this._idGenerator = ESmile.IdGenerator.getInstance();
    this._id = this._idGenerator.getNextUniqueId();

};

ESmile.GraphicObject.prototype = {
    constructor: ESmile.GraphicObject,
    getChild: function(id){
        if (id == undefined || id === ""){
            return null;
        }
        var children = this.children;
        for (var i = this.children.length-1; i > 0; i--){
            if (children[i].getId()=== id){
                break;
            }
        }
        return i === -1 ? null : children[i];
         
    },
    getChildAt: function(index){
        if (index >= 0 && index < this.children.length)
            return this.children[index];
        return null;
    },
    getChildCount:function(){
        return this.children.length;
    },
    getChildIds:function(){
        var ids = [];
        for (var i = this.children.length-1; i > 0; i--){
            ids.push(this.children[i].getId());
        }
        return ids;
    },
    getId: function(){
        if (this._id === undefined || this._id ===null){
             this._id = this._idGenerator.getNextUniqueId();
        }
        return this._id;
    },
    
    setId:function(id){
        if (id == undefined || id === ""){
            throw new SyntaxError(" id of the GraphicObject must not be empty");
        }
        
        if (!this.parent)
            this._id = id;
        else {
            var childOfId = this.parent.getChild(id);
            if (childOfId === null || childOfId === this) {
                // it's okay
                this._id = id;
                return;
            }
            throw new Error("the parent already has a child with an ID that conflicts with the new ID");
        }
    },
    
    /*
     * @param {Function} callback fucntion declared as "callback(child){ //do somthing }"
     * @param {type} thisObj runtime this context
     * @returns {undefined}
     */
    forEachChild: function(callback, thisObj){
        this.children.forEach(callback, thisObj);
    },
    
   
    setVisible: function (visible) {
        this.root.visible = visible;
        this.visible = visible;
    },
    
    add: function(graph){
        console.warn("GraphicObject.add will be renamed to GraphicObject.addChild. please using addChild() instead");
        return this.addChild(graph);
    },
    
    addChild: function (graph) {
        if (this._disposed) {
            throw Error("GraphicObject already disposed");
        }
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.addChild(arguments[ i ]);
            }
            return this;
        }

        if (graph === this) {
            console.error("ESmile.GraphicObject.addChild:", object, "can't be added as a child of itself.");
            return this;
        }

        if (graph instanceof ESmile.GraphicObject) {
            if (graph.parent !== undefined) {
                graph.parent.remove(object);
            }

            graph.parent = this;
            graph.dispatchEvent({type: 'added'});
            this.children.push(graph);
            var scene = this.getScene();
            if (scene) {
                scene.add(graph.root);
            }
        } else {
            console.error("ESmile.GraphicObject.addChild:", object, "is not an instance of ESmile.GraphicObject.");
        }
        return this;
    },
    
    getScene: function(){
        var object3d = this.root;
        while ( object3d.parent !== undefined ) {
                object3d = object3d.parent;
        }
        if ( object3d !== undefined && object3d instanceof THREE.Scene )  {
                return object3d;
        }
        return null;
    },
    
    remove:function(graph){
        console.warn("GraphicObject.remove will be renamed to GraphicObject.removeChild. please using removeChild() instead");
        return removeChild(graph); 
    },
    
    removeChild: function (graph) {
        if (this._disposed) {
            throw Error("GraphicObject already disposed");
        }
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.remove(arguments[ i ]);
            }
        }

        var index = this.children.indexOf(graph);
        if (index !== -1) {
            graph.parent = undefined;
            graph.dispatchEvent({type: 'removed'});
            this.children.splice(index, 1);
            return graph;
        }
        return null;
    },
    
    removeChildAt: function(index){
         if (index >= 0 && index < this.children.length){
             return this.children.splice(index, 1)[0];
         }
         return null;   
    },
     setOptions: function (options) {
        for (var key in options){
            if (this[key] !== undefined ) {
                this[key] = options[key];
            } else {
                console.warn("unsupport option:%s", key);
            }
        }
    },
    setOption: function (option, value) {
        if (this[option] !== undefined ) {
            this[option] = value;
        } else {
            console.warn("unsupport option:%s", key);
        } 
    },
    getOptions: function (options) {
        for (var key in options){
            if (this[key] !== undefined ) {
                options[key] = this[key];
            } else {
                console.warn("unsupport option:%s", key);
            }
        }
    },
    getOption: function (option) {
        return this[option];
    },
    
    dispose: function () {
        if (this._disposed) {
            throw Error("GraphicObject already disposed");
        } else 
            this._disposed = true;
        this.removeAllEventListener();
        if (this.parent)
            this.parent.removeChild(this);
        this.root.userData = null;
        if (this.root.parent)
            this.root.parent.remove(this.root) ; 
        this.root = null;
        this.children.forEach(function(child){
            child.dispose();
        }, this);
        this.children = null;
    },
    
    clear: function () {
    },
    
    /* 子类图元若想实现动态显示则实现该方法
     updateSelf: function () {},
     */
    
    update: function () {
        if (this.updateSelf)
            this.updateSelf();

        for (var child in this.children) {
            if (this.children[child].update)
                this.children[child].update();
        }

    },
    _onclick: function (event) {
        if (this.clickable) {
            console.log("GraphicObject(%d)._onclick", this.root.id);
        }
    },
    _ondblclick: function (event) {
        if (this.clickable) {
            console.log("GraphicObject(%d)._ondblclick", this.root.id);
        }
    },
    _onmousedown: function (event) {
        if (this.clickable)
            console.log("GraphicObject(%d)._onmousedown", this.root.id);
    },
    _onmouseout: function (event) {
        if (this.clickable)
            console.log("GraphicObject(%d)._onmouseout", this.root.id);
    },
    _onmouseover: function (event) {
        if (this.hoverable)
            console.log("GraphicObject(%d)._onmouseover", this.root.id);
    },
    _onmousemove: function (event) {
        //console.log("GraphicObject(%d)._onmousemove", this.root.id);
    },
    _onmouseup: function (event) {
        console.log("GraphicObject(%d)._onmousemove", this.root.id);
    },
    _onmousewheel: function (event) {
        console.log("GraphicObject(%d)._onmousewheel", this.root.id);
    },
    _ondragstart: function (event) {
        if (this.dragable)
            console.log("GraphicObject(%d)._ondragstart", this.root.id);
    },
    _ondragend: function (event) {
        if (this.dragable)
            console.log("GraphicObject(%d)._ondragend", this.root.id);
    },
    _ondragenter: function (event) {
        console.log("GraphicObject(%d)._ondragenter", this.root.id);
    },
    _ondragover: function (event) {
        console.log("GraphicObject(%d)._ondragover", this.root.id);
    },
    _ondragleave: function (event) {
        console.log("GraphicObject(%d)._ondragleave", this.root.id);
    },
    _ondragdrop: function (event) {
        console.log("GraphicObject(%d)._ondragdrop", this.root.id);
    }


};

ESmile.GraphicObject.EventTypes = [
    "click", "dblclick", "mousedown", "mouseup",
    "mouseover", "mousemove", "mousewheel", "mouseout",
    "dragstart", "dragend", "dragover", "dragenter",
    "dragleave", "dragdrop"
];

// 给图元基类原型添加事件监听访问器属性
ESmile.GraphicObject.EventTypes.forEach(function (type) {
    Object.defineProperty(ESmile.GraphicObject.prototype, "on" + type,
        {
            set: function (value) {
                var listener = ["__on" + type];
                this.removeEventListener(type, this[listener]);
                this[listener] = value;
                this.addEventListener(type, this[listener]);
            },
            get: function () {
                console.log("defineProperty");
                return this["__on" + type];
            },
            enumerable: true
        }
    );
});

// 给图元基类原型添加事件分发器函数功能
ESmile.EventDispatcher.prototype.apply(ESmile.GraphicObject.prototype);

// 事件分发时先按顺序执行用户自定义事件处理函数集，最后执行系统默认事件处理函数
ESmile.GraphicObject.prototype.dispatchEvent = function (event) {
    ESmile.EventDispatcher.prototype.dispatchEvent.call(this, event);
    if (event.defaultPrevented) {
        event.defaultPrevented = false;
    } else {
        var defaultListener = this["_on" + event.type];
       
        if (defaultListener)
            defaultListener.call(this, event);
    }
};

// 事件分发时先按顺序执行用户自定义事件处理函数集，最后执行系统默认事件处理函数
ESmile.GraphicObject.prototype.triggerEvent = function (event) {
    ESmile.EventDispatcher.prototype.triggerEvent.call(this, event);
    if (event.defaultPrevented) {
        event.defaultPrevented = false;
    } else {
        var defaultListener = this["_on" + event.type];
        if (defaultListener)
            defaultListener.call(this, event);
    }
};


