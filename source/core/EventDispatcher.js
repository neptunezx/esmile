/**
 * https://github.com/mrdoob/eventdispatcher.js/
 */

THREE.EventDispatcher = function () {}

THREE.EventDispatcher.prototype = {

    constructor: THREE.EventDispatcher,

    apply: function (object) {

        object.addEventListener = THREE.EventDispatcher.prototype.addEventListener;
        object.hasEventListener = THREE.EventDispatcher.prototype.hasEventListener;
        object.removeEventListener = THREE.EventDispatcher.prototype.removeEventListener;
        object.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent;

    },

    addEventListener: function (type, listener) {

        if (this._listeners === undefined)
            this._listeners = {};

        var listeners = this._listeners;

        if (listeners[ type ] === undefined) {

            listeners[ type ] = [];

        }

        if (listeners[ type ].indexOf(listener) === -1) {

            listeners[ type ].push(listener);

        }

    },

    hasEventListener: function (type, listener) {

        if (this._listeners === undefined)
            return false;

        var listeners = this._listeners;

        if (listeners[ type ] !== undefined && listeners[ type ].indexOf(listener) !== -1) {

            return true;

        }

        return false;

    },

    removeEventListener: function (type, listener) {

        if (this._listeners === undefined)
            return;

        var listeners = this._listeners;
        var listenerArray = listeners[ type ];

        if (listenerArray !== undefined) {

            var index = listenerArray.indexOf(listener);

            if (index !== -1) {

                listenerArray.splice(index, 1);

            }

        }

    },

    dispatchEvent: function (event) {

        if (this._listeners === undefined)
            return;

        var listeners = this._listeners;
        var listenerArray = listeners[ event.type ];

        if (listenerArray !== undefined) {

            event.target = this;

            var array = [];
            var length = listenerArray.length;

            for (var i = 0; i < length; i++) {

                array[ i ] = listenerArray[ i ];

            }

            for (var i = 0; i < length; i++) {

                array[ i ].call(this, event);

            }

        }

    }

};


ESmile.EventDispatcher = function () {
    THREE.EventDispatcher.call(this);
};

ESmile.EventDispatcher.prototype = Object.create(THREE.EventDispatcher.prototype);

ESmile.EventDispatcher.prototype.apply = function (object) {
    object.addEventListener = ESmile.EventDispatcher.prototype.addEventListener;
    object.hasEventListener = ESmile.EventDispatcher.prototype.hasEventListener;
    object.removeEventListener = ESmile.EventDispatcher.prototype.removeEventListener;
    object.dispatchEvent = ESmile.EventDispatcher.prototype.dispatchEvent;
    object.removeAllEventListener = ESmile.EventDispatcher.prototype.removeAllEventListener;
    object.removeAllEventListenerByType = ESmile.EventDispatcher.prototype.removeAllEventListenerByType;
    object.addOneTimeEventListener = ESmile.EventDispatcher.prototype.addOneTimeEventListener;
    object.triggerEvent = ESmile.EventDispatcher.prototype.triggerEvent;
};

ESmile.EventDispatcher.prototype.removeAllEventListener = function () {
    if (this._listeners)
        this._listeners = undefined;
};

// 移除指定类型的所有事件监听器
ESmile.EventDispatcher.prototype.removeEventListenerByType = function (type) {
    if (this._listeners && this._listeners[type])
        this._listeners[type] = [];
};

// 添加单次触发事件监听器，执行一次后删除
ESmile.EventDispatcher.prototype.addOneTimeEventListener = function (type, listener) {
    this.addEventListener(type, listener);
    listener._justInvokeOnce = true;
};

ESmile.EventDispatcher.prototype.dispatchEvent = function (event) {
    event.target = this;
    if (this._listeners === undefined)
        return;
    var listeners = this._listeners;
    var listenerArray = listeners[ event.type ];

    if (listenerArray !== undefined) {

        var array = [];
        var length = listenerArray.length;

        var i = 0;
        for (i = 0; i < length; i++) {
            array[ i ] = listenerArray[ i ];
        }

        for (i = 0; i < length; i++) {
            array[ i ].call(this, event);
            if (array[ i ]._justInvokeOnce !== undefined) {
                listenerArray.splice(i, 1);
                delete array[ i ]._justInvokeOnce;
            }
        }
    }

};

/* dispatchEvent和triggerEvent区别，前者是广播某事件，后者是触发某事件 */
ESmile.EventDispatcher.prototype.triggerEvent = function (event) {
    if (this._listeners === undefined)
        return;

    var listeners = this._listeners;
    var listenerArray = listeners[ event.type ];
    if (listenerArray !== undefined) {
        event.target = this;

        var array = [];
        var length = listenerArray.length;

        var i = 0;
        for (i = 0; i < length; i++) {
            array[ i ] = listenerArray[ i ];
        }

        for (i = 0; i < length; i++) {
            array[ i ].call(this, event);
            if (array[ i ]._justInvokeOnce !== undefined) {
                listenerArray.splice(i, 1);
                delete array[ i ]._justInvokeOnce;
            }
        }
    }

};


