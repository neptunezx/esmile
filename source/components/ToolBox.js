/**
 * E-Smile ToolBox.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/11/13
 * @Version: 0.1
 */

ESmile.ToolBox = function () {
    ESmile.Component.call(this);

};

ESmile.ToolBox.prototype = Object.create(ESmile.Component.prototype);

ESmile.ToolBox.prototype.setVisible = function (visible) {
    this.visible = visible;
};

ESmile.ToolBox.prototype._onclick = function (event) {
    this._backGroundColor = 0x00ff00;
};

ESmile.ToolBox.prototype._ondblclick = function (event) {
    this._backGroundColor = 0xffff00;
};

