/**
 * E-Smile Event.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/11/17
 * @Version: 0.1
 */


ESmile.Event = function (type, target, event, dragTarget) {
    this.type = type;
    this.target = target;
    this.clientX = event.clientX || event.offsetX || event.layerX;
    this.clientY = event.clientY || event.offsetY || event.layerY;
    if (dragTarget) {
        this.dragTarget = dragTarget;
    } else {
        this.dragTarget = null;
    }

    this.srcTarget = target;
    // 是否取消事件冒泡
    this.cancelBubble = false;
    // 事件处理是否取消默认处理
    this.defaultPrevented = false;
    this.cancelable = true;

    // 下列成员可能不需要
    this.intersect = null;
    // 浏览器原生事件
    this.event = event;

};

ESmile.Event.prototype = {
    constructor: ESmile.Event,
    /**
     * 停止事件继续传播处理
     @return {void}
     */
    stopPropagation: function () {
        this.cancelBubble = true;
    },
    /**
     * 阻止系统默认事件处理
     @return {void}
     */
    preventDefault: function () {
        this.defaultPrevented = true;
    }
};


