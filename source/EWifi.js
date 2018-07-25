/**
 * E-Smile EWifi.js
 * Copyright 2015 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2015/1/22
 * @Version: 0.1
 */

var EWifi = EWifi || {};
EWifi.CIWifiData = [
    {name: "ciwifi-1", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-2", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-3", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-4", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-5", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-6", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-7", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-8", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-9", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-10", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-11", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-12", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-13", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-14", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-15", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-16", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-17", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-18", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-19", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}},
    {name: "ciwifi-20", ip: "27.155.210.105", position: "", status: {"loadavg": [0, 5, 5], "mem": {"MemTotal": 125340, "MemFree": 103268, "Buffers": 2172, "Cached": 6400}, "uptime": 192927, "rx": {"cur": 40, "avg": 44.3448, "max": 901515}, "tx": {"cur": 56, "avg": 60.4828, "max": 118305}, "traffic": {"rx": 228229950, "tx": 176113186}, "time": 1421824238}}
];
EWifi.TerminalType = {
    Android: 0,
    WindowsPhone: 1,
    iPhone: 2,
    PC: 3,
    Unknown: 4
};
EWifi.WebSiteType = {
    Play: 0,
    News: 1,
    Game: 2,
    Search: 3,
    Vedio: 4
};
EWifi.TerminalType = {
    Android: 0,
    WindowsPhone: 1,
    iPhone: 2,
    PC: 3,
    Unknown: 4
};
EWifi.MarkerType = {
    UserMarker: "user",
    KioskMarker: "kiosk",
    WebsiteMarker: "website"
};
EWifi.WebsiteType = ["视频", "新闻", "财经", "游戏"];

/* 
 * <class> EWifi.Marker 
 * <note> abstract class
 */
EWifi.Marker = function(template, opt_model) {
    this._domElement = template.cloneNode(true);
    this._visible = true;
    this.needUpdate = true;
    if (opt_model)
        this.setModel(opt_model);
};

EWifi.Marker.prototype = {};

EWifi.Marker.prototype.getDomElement = function() {
    return this._domElement;
};

EWifi.Marker.prototype.isVisible = function() {
    return this._visible;
};

EWifi.Marker.prototype.update = function(projector, camera, viewWidth, viewHeight, zindex) {
    var vector = projector.projectVector(this._position.clone(), camera);
    var viewPosition = {
        x: Math.round(vector.x * viewWidth / 2 + viewWidth / 2),
        y: Math.round((-vector.y * viewHeight / 2) + viewHeight / 2)
    };
    if (viewPosition.x > viewWidth
            || viewPosition.x < 0
            || viewPosition.y > viewHeight
            || viewPosition.y < 0) {
        this.setVisible(false);
        this.needUpdate = true;
        return;
    } else {
        this.setVisible(true);
    }
    this._setProjectPosition(Math.round(vector.x * viewWidth / 2 + viewWidth / 2),
            Math.round((-vector.y * viewHeight / 2) + viewHeight / 2),
            zindex);
};

EWifi.Marker.prototype.clear = function() {
    this.setVisible(true);
    this.needUpdate = true;
};

EWifi.Marker.prototype.dispose = function() {
    var parentNode = this._domElement.parentNode;
    if (parentNode)
        parentNode.removeChild(this._domElement);
    this._domElement = null;
    this._visible = false;
    this.needUpdate = false;

};

EWifi.Marker.prototype.setPosition = function(position) {
    this._position = position.clone();
    return this;
};

EWifi.Marker.prototype.setBackgroundColor = function(color) {
    this._domElement.backgroundColor = new THREE.Color(color).getStyle();
};

EWifi.Marker.prototype._setProjectPosition = function(x, y, zindex) {
    var root = this._domElement;
    root.style.left = (x + 20) + 'px';
    root.style.top = (y - 45) + 'px';
    root.style.zIndex = zindex || 1;
};

EWifi.Marker.prototype.setModel = function(model) {
    this._model = model;
};

EWifi.Marker.prototype.setVisible = function(visible) {
    if (this._visible !== visible) {
        this._visible = visible;
        if (this._domElement)
            this._domElement.style.visibility = (visible ? "visible" : "hidden");
        this.needUpdate = this._visible;
    }
};

/* 
 * <class> EWifi.UserMarker 
 * <inherit> ESmile.Marker
 */
EWifi.UserMarker = function(template, opt_model) {
    EWifi.Marker.call(this, template, opt_model);
    this._terminalType = EWifi.TerminalType.Unknown;
    //this._domImage.querySelector( '#ewifi-marker-image');
    this._domWebsite = null;// this._domElement.querySelector( '#ewifi-marker-website');
    this._domDuration = null; //this._domElement.querySelector( '#ewifi-marker-duration');
    //this._domImage.src = EWifi.ImageURL.Unknown;

};
ESmile.inherits(EWifi.UserMarker, EWifi.Marker);

EWifi.UserMarker.UserInfo = {
    TerminalType: EWifi.TerminalType.Android,
    WebSite: EWifi.TerminalType.Android
};

EWifi.UserMarker.prototype.reset = function() {
    this._domElement = template.cloneNode(true);
    this._terminalType = EWifi.TerminalType.Unknown;
    this._domImage.src = EWifi.ImageURL.Unknown;
    this._domWebsite.innerHTML = "";
    this._domDuration.innerHTML = "";
};

EWifi.UserMarker.prototype.dispose = function() {
    this._domWebsite = null;
    this._domDuration = null;
    this._domElement = null;
    EWifi.UserMarke._supperClass.dispose.call(this);
};

EWifi.UserMarker.prototype.setModel = function(model) {
    EWifi.KioskMarker._superClass.setModel.call(this, model);
};

/* 
 * <class> EWifi.KioskMarker 
 * <inherit> ESmile.Marker
 */
EWifi.KioskMarker = function(template, opt_model) {
    EWifi.Marker.call(this, template, opt_model);
    this._domWifiName = this._domElement.querySelector('#wifi-name');
    this._domUserCount = this._domElement.querySelector('#user-count');
    this._domWifiCapacity = this._domElement.querySelector('#wifi-capacity');
    this._domTerminalType = this._domElement.querySelector('#terminal-type');
    this._domElement.onclick = function(e) {
        console.log(e.target)
        this._hover = !this._hover;
        if (this._hover) {
            this.style.backgroundColor = "rgba(250,200,100, 0.2)";
        } else {
            this.style.backgroundColor = "rgba(31, 31, 31, 0.4)";
        }
    };

};
ESmile.inherits(EWifi.KioskMarker, EWifi.Marker);

EWifi.KioskMarker.prototype.setModel = function(model) {
    EWifi.KioskMarker._superClass.setModel.call(this, model);
    this._domWifiName.innerHTML = model.wifiName;
    this._domUserCount.innerHTML = model.userCount + "人";
    this._domWifiCapacity.innerHTML = model.wifiCapacity + "人";
    this._domTerminalType.innerHTML = model.terminalType || "unknown";
};

/* 
 * <class> EWifi.WebsiteMarker 
 * <inherit> ESmile.Marker
 */
EWifi.WebsiteMarker = function(template, opt_model) {
    EWifi.Marker.call(this, template, opt_model);
};
ESmile.inherits(EWifi.WebsiteMarker, EWifi.Marker);

EWifi.WebsiteMarker.prototype.setModel = function(model) {
    EWifi.KioskMarker._superClass.setModel.call(this, model);
    this._domElement.innerHTML = model.name;
};


/* 
 * <class> EWifi.MarkerManager 
 * <inherit> ESmile.Component
 */
EWifi.MarkerManager = function(options) {
    if (options)
        this._chart = options._chart || null;
    this._projector = new THREE.Projector();
    this._markers = null;
    this._markerProtos = null;
    this._viewWidth = null;
    this._viewHeight = null;
    this._camera = null;
    this._initilizeTemplate();

};
ESmile.inherits(EWifi.MarkerManager, ESmile.Component);

EWifi.MarkerManager.BASE_CSS_NAME = "ewifi-marker";

EWifi.MarkerManager.prototype._initilizeTemplate = function() {
    var _userMarkerTemplate = document.createElement("div");
    _userMarkerTemplate.innerHTML = "<table id='marker_template' class='ewifi-usermarker' style='font-size: 10pt; display: inline; left: 930px; top: 69px; z-index: 1;'><tbody><tr><td><span id='countryText' class='country' style='margin-top: -1px;'>Wifi</span></td><td class='detail' id='detailText' style='font-size: 6pt;'>user<br>30</td></tr></tbody></table>";
    _userMarkerTemplate.style.color = "white";
    _userMarkerTemplate.style.position = "absolute";
    _userMarkerTemplate.style.opacity = 0.9;
    _userMarkerTemplate.style.backgroundColor = "#191919";
    //     this._markerTemplate.style.height = "30px";
    //     this._markerTemplate.style.width = "180px";
    var _kioskMarkerTemplate = document.createElement("table");
    _kioskMarkerTemplate.className = this.getBaseCssClass() + "-kiosk";
    _kioskMarkerTemplate.innerHTML =
            "<tbody>" +
            "    <tr >" +
            "      <th>云亭：</th>" +
            "      <td id = 'wifi-name'></td>" +
            "    </tr>" +
            "    <tr>" +
            "      <th>用户：</th>" +
            "      <td id = 'user-count'></td>" +
            "    </tr>" +
            "    <tr>" +
            "        <th>容量：</th>" +
            "        <td id = 'wifi-capacity'></td>" +
            "    </tr>" +
            "    <tr>" +
            "        <th>机型：</th>" +
            "        <td id = 'terminal-type'></td>" +
            "    </tr>" +
            "    <tr id='detail-information'>" +
            "        <th>更多：</th>" +
            "        <td><a title='查看详细统计信息' href='x.html'>详细信息</a></td>" +
            "    </tr>" +
            "</tbody>";
    var _websiteMarkerTemplate = document.createElement("div");
    _websiteMarkerTemplate.innerHTML = "网站";
    _websiteMarkerTemplate.style.color = "white";
//    _websiteMarkerTemplate.style.width = "50px";
//    _websiteMarkerTemplate.style.height = "20px";
    _websiteMarkerTemplate.style.position = "absolute";
    _websiteMarkerTemplate.style.opacity = 0.9;
    _websiteMarkerTemplate.style.backgroundColor = "rgba(50,50,100, 0.7)";
    _websiteMarkerTemplate.style.textAlign = "center";
    _websiteMarkerTemplate.style.fontSize = "18pt";
    this.registerMarker(EWifi.MarkerType.UserMarker, EWifi.UserMarker, _userMarkerTemplate);
    this.registerMarker(EWifi.MarkerType.KioskMarker, EWifi.KioskMarker, _kioskMarkerTemplate);
    this.registerMarker(EWifi.MarkerType.WebsiteMarker, EWifi.WebsiteMarker, _websiteMarkerTemplate);
};

EWifi.MarkerManager.prototype.getBaseCssClass = function() {
    return EWifi.MarkerManager.BASE_CSS_NAME;
};

EWifi.MarkerManager.prototype.setViewport = function(width, height) {
    this._viewWidth = width;
    this._viewHeight = height;
};

EWifi.MarkerManager.prototype.setCamera = function(camera) {
    this._camera = camera;
};

EWifi.MarkerManager.prototype.setMarkersVisible = function(visible, opt_type) {
    if (opt_type) {
        if (this._markers[opt_type] === undefined) {
            console.warn("cann't set visibility of unknown marker type:%s", opt_type);
            return;
        }
        if (this._markers[opt_type] === null) {
            return;
        }
        this._markers[opt_type].forEach(function(marker) {
            marker.setVisible(visible);
        });
    } else {
        for (var type in this._markers) {
            if (this._markers[type])
                this._markers[type].forEach(function(marker) {
                    marker.setVisible(visible);
                });
        }
    }
};

EWifi.MarkerManager.prototype.registerMarker = function(type, constructor, template) {
    if (!this._markerProtos) {
        this._markerProtos = {};
    }
    if (!this._markers) {
        this._markers = {};
    }
    if (this._markerProtos[type]) {
        throw Error("marker of type %s has already been registered", type);
        return false;
    }
    this._markerProtos[type] = {constructor: constructor, template: template};
    this._markers[type] = [];
    return true;
};

EWifi.MarkerManager.prototype.createMarker = function(type) {
    if (!this._markerProtos || !this._markerProtos[type]) {
        throw Error("cann't create unknown marker type: " + type);
    }
    var proto = this._markerProtos[type];
    return this.addMarker(new proto.constructor(proto.template));
};

EWifi.MarkerManager.prototype.createUserMarker = function() {
    return this.createMarker(EWifi.MarkerType.UserMarker);
};

EWifi.MarkerManager.prototype.createKioskMarker = function() {
    return this.createMarker(EWifi.MarkerType.KioskMarker);
};

EWifi.MarkerManager.prototype.addMarker = function(marker) {
    if (!(marker instanceof EWifi.Marker)) {
        console.error("marker must be type of EWifi.Marker");
        return null;
    }
    ;
    for (var type in this._markers) {
        if (marker instanceof this._markerProtos[type].constructor) {
            this._markers[type].push(marker);
            this._domElement.appendChild(marker._domElement);
            return marker;
        }
    }
    console.error("add marker failed", marker);
    return null;
};

EWifi.MarkerManager.prototype.update = function() {
    for (var type in this._markers) {
        if (this._markers[type] instanceof Array) {
            this._markers[type].forEach(
                    function(marker) {
                        if (marker.needUpdate)
                            marker.update(this._projector, this._camera, this._viewWidth, this._viewHeight);
                    }, this);
        }
    }
};

EWifi.MarkerManager.prototype.dispose = function() {
    this._userMarkerTemplate = null;
    this._kioskMarkerTemplate = null;
    this._markers = null;
    this._markerProtos = null;
    this._projector = null;
    EWifi.MarkerManager._superClass.dispose.call(this);
};

/* 
 * <class> EWifi.WifiArea 
 * <inherit> ESmile.GraphicObject
 */
EWifi.WifiArea = function(options) {
    ESmile.GraphicObject.call(this);
    if (options === void 0) {
        var options = {};
    }
    this._wifiPaticleColor = options.wifiPaticleColor || new THREE.Color(Math.round(Math.random() * 0xffffff));
    this._userPaticleColor = options.userPaticlecolor || this._wifiPaticleColor;
    this._userPaticleSize = options.userPaticleSize || EWifi.WifiArea.UserPaticleSize;
    this._wifiPaticleSize = options.wifiPaticleSize || EWifi.WifiArea.WifiPaticleSize;
    this._name = options.name;
    this._density = options.density || Math.random();
    this._position = new THREE.Vector3(0, 0, 0);
    if (options.position) {
        this._position.copy(options.position);
    }
    this.root.position.copy(this._position);
    this._initilize();
};
ESmile.inherits(EWifi.WifiArea, ESmile.GraphicObject);

EWifi.WifiArea.UserPaticleSize = 10;
EWifi.WifiArea.WifiPaticleSize = 70;
EWifi.WifiArea.MaxWirelessAccessCapacity = 40;
EWifi.WifiArea.MaxTerminalAccessTime = 120 * 60;
EWifi.WifiArea.FramePlayIntervalTime = 100 * 8;
EWifi.WifiArea.MaxWirelessCoverRadius = 120;

EWifi.WifiArea.prototype._initilize = function() {
    this._createUserPaticles();
    this._createWifiPaticles();
};

EWifi.WifiArea.prototype._createMaterial = function() {
    return new THREE.ShaderMaterial({
        uniforms: {
            amplitude: {type: "f", value: 1.0},
            color: {type: "c", value: this._userPaticleColor},
            texture: {type: "t", value: THREE.ImageUtils.loadTexture("img/particle.png")}
        },
        attributes: {
            size: {type: 'f', value: []},
            customColor: {type: 'c', value: []}
        },
        vertexShader: "uniform float amplitude;" +
                "attribute float size;" +
                "attribute vec3 customColor;" +
                "varying vec3 vColor;" +
                "void main() { vColor = customColor; " +
                "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );" +
                "gl_PointSize = size; gl_Position = projectionMatrix * mvPosition; }",
        fragmentShader: "uniform vec3 color;" +
                "uniform sampler2D texture;" +
                "varying vec3 vColor;" +
                "void main() { gl_FragColor = vec4( vColor, 1 );" +
                "gl_FragColor = gl_FragColor * texture2D( texture,  gl_PointCoord); } ",
        blending: THREE.AdditiveBlending,
        depthTest: true,
        depthWrite: false,
        needsUpdate: true,
        transparent: true
    });
};

EWifi.WifiArea.prototype._getPointsInCircle = function(density, radius) {
    var r = (1 + (2 * density - 0.5)) * radius * (0.4 + 0.6 * Math.random());
    var theta = Math.random() * Math.PI * 2;
    return new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), 0);
};

EWifi.WifiArea.prototype._createUserPaticles = function() {
    var geometry = new THREE.Geometry();
    var userCount = this._density * EWifi.WifiArea.MaxWirelessAccessCapacity;
    for (var i = 0; i < userCount; i++) {
        geometry.vertices.push(this._getPointsInCircle(this._density, EWifi.WifiArea.MaxWirelessCoverRadius));
    }
    this._userPaticles = new THREE.PointCloud(geometry, this._createMaterial());
    var vertices = this._userPaticles.geometry.vertices;
    var attributes = this._userPaticles.material.attributes;
    for (var i = 0, l = vertices.length; i < l; i++) {
        attributes.size.value[ i ] = this._userPaticleSize;
        attributes.customColor.value[ i ] = this._userPaticleColor.clone();
    }

    this.root.add(this._userPaticles);

};

EWifi.WifiArea.prototype._createWifiPaticles = function() {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3());
    var wifiMaterial = this._createMaterial();
    this._wifiPaticles = new THREE.PointCloud(geometry, wifiMaterial);

    var attributes = wifiMaterial.attributes;
    attributes.size.value[0] = this._wifiPaticleSize;
    attributes.customColor.value[0] = this._wifiPaticleColor.clone();

    this.root.add(this._wifiPaticles);


};

EWifi.WifiArea.prototype.updateSelf = function() {
    this._updateUserPaticlesLife();
    this._updateUserPaticlesMarker();
};

EWifi.WifiArea.prototype._updateUserPaticlesLife = function() {

    if (this._lastUpdateTime === void 0) {
        this._lastUpdateTime = (new Date()).getTime();
    }

    var currentTime = (new Date()).getTime();
    if (currentTime - this._lastUpdateTime < EWifi.WifiArea.FramePlayIntervalTime) {
        this._userPaticles.geometry.verticesNeedUpdate = false;
        this._userPaticles.material.needsUpdate = false;
        return;
    }
    this._lastUpdateTime = currentTime;
    if (Math.random() < 0.80) {
        return;
    }
    var vertices = this._userPaticles.geometry.vertices;
    var attributes = this._userPaticles.material.attributes;
    var oldPaticleCount = 5;
    var newPaticle = 5;

    for (var i = 0; i < Math.round(Math.random() * oldPaticleCount); i++) {
        var index = Math.round(Math.random() * vertices.length);
        vertices.splice(index, 1);
        attributes.customColor.value.splice(index, 1);
    }

    for (var i = 0; i < Math.round(Math.random() * newPaticle); i++) {
        vertices.push(this._getPointsInCircle(this._density, EWifi.WifiArea.MaxWirelessCoverRadius));
        attributes.customColor.value.push(this._userPaticleColor.clone());
    }
    attributes.customColor.needsUpdate = true;
    attributes.size.needsUpdate = true;
    this._userPaticles.geometry.verticesNeedUpdate = true;
    this._userPaticles.material.needsUpdate = true;
//    console.log("geometrys-%d, customColorValues-%d",
//            this._userPaticles.geometry.vertices.length,
//            this._userPaticles.material.attributes.customColor.value.length
//            );
    this._wifiMarker.setModel({
        wifiName: this._name,
        userCount: this._userPaticles.geometry.vertices.length,
        wifiCapacity: EWifi.WifiArea.MaxWirelessAccessCapacity,
        terminalType: null
    });
};

EWifi.WifiArea.prototype._updateUserPaticlesMarker = function() {

};

EWifi.WifiArea.prototype.setPosition = function(position) {
    this._position.copy(position);
    this.root.position.copy(position);
};

EWifi.WifiArea.prototype._onclick = function(event) {

};

EWifi.WifiArea.prototype._onmouseout = function(event) {
    this.setHighlight(false);
};

EWifi.WifiArea.prototype._onmouseover = function(event) {
    this.setHighlight(true);
};

EWifi.WifiArea.prototype.setHighlight = function(isHighlight) {
    if (this._highlight === isHighlight) {
        return;
    }
    this._highlight = isHighlight;

    if (this._userPaticles) {
        var paticleSize = this._highlight ? this._userPaticleSize * 1.1 : this._userPaticleSize;
        var vertices = this._userPaticles.geometry.vertices;
        var paticleAttr = this._userPaticles.material.attributes;

        for (var i = 0; i < vertices.length; i++) {
            if (this._highlight)
                paticleAttr.customColor.value[i].copy(this._userPaticleColor.clone().addScalar(0.25));
            else
                paticleAttr.customColor.value[i].copy(this._userPaticleColor);
            paticleAttr.size[i] = paticleSize;
        }

        paticleAttr.customColor.needsUpdate = true;
        paticleAttr.size.needsUpdate = true;
    }
    if (this._wifiPaticles) {
        paticleAttr = this._wifiPaticles.material.attributes;
        paticleSize = this._highlight ? this._wifiPaticleSize * 1.1 : this._wifiPaticleSize;
        var vertices = this._wifiPaticles.geometry.vertices;

        for (var i = 0; i < vertices.length; i++) {
            if (this._highlight)
                paticleAttr.customColor.value[i].copy(this._wifiPaticleColor.clone().addScalar(0.25));
            else
                paticleAttr.customColor.value[i].copy(this._wifiPaticleColor);
            paticleAttr.size[i] = paticleSize;
        }

        paticleAttr.customColor.needsUpdate = true;
        paticleAttr.size.needsUpdate = true;
    }


};

EWifi.WifiArea.prototype.attachMarker = function(markerManager) {
    this.root.updateMatrixWorld();

    this._userPaticles.geometry.vertices.forEach(function(vertex) {
        markerManager.createMarker("user")
                .setPosition(vertex.clone().applyMatrix4(this.root.matrixWorld));
    }, this);

    this._wifiMarker = markerManager.createMarker("kiosk");
    this._wifiMarker._domWifiName.style.color = this._userPaticleColor.getStyle();
    this._wifiPaticles.geometry.vertices.forEach(function(vertex) {
        this._wifiMarker
                .setPosition(vertex.clone().applyMatrix4(this.root.matrixWorld));
    }, this);

};

/* 
 * <class> EWifi.Legend 
 * <inherit> ESmile.Component
 */
EWifi.Legend = function(options) {
    ESmile.Component.call(this);
    if (!options) {
        options = EWifi.Legend.DefaultOption;
    } else {
        this._position = options.position || EWifi.Legend.DefaultOption.position;
        this._orientation = options.orientation || EWifi.Legend.DefaultOption.orientation;
        this._labels = options.labels || EWifi.Legend.DefaultOption.labels;
        this._markerColors = options.markerColors || EWifi.Legend.DefaultOption.markerColors;
        this._markersTypes = options.markersTypes || EWifi.Legend.DefaultOption.markerTypes;
        this._backgroundColor = options.backgroundColor || EWifi.Legend.DefaultOption.backgroundColor;
        this._borderColor = options.borderColor || EWifi.Legend.DefaultOption.borderColor;
        this._borderSize = options.borderSize || EWifi.Legend.DefaultOption.borderSize;
        this._opacity = options.opacity || EWifi.Legend.DefaultOption.opacity;
        this.onselected = options.onselected || EWifi.Legend.DefaultOption.onselected;
        this._selectedState = [];
        this._labels.forEach(function( ) {
            this._selectedState.push(true);
        }, this);
        this._unhighlightColor = options.unhighlightColor || EWifi.Legend.DefaultOption.unhighlightColor;
        this._highlightColor = options.highlightColor || EWifi.Legend.DefaultOption.highlightColor;

    }
    ;
};
ESmile.inherits(EWifi.Legend, ESmile.Component);

EWifi.Legend.RectMarker = 0;
EWifi.Legend.CircleMarker = 1;
EWifi.Legend.DefaultOption = {
    position: {
        x: "left",
        y: "bottom",
        width: 30,
        height: 200
    },
    orientation: "vertical",
    labels: [],
    markerColors: [],
    markerType: EWifi.Legend.CircleMarker,
    backgroundColor: "rgba(0,0,0,0.0)",
    borderColor: "rgba(200,100,100,0.6)",
    borderSize: "2px",
    opacity: 0.9,
    highlightColor: "rgba(200,100,100,0.6)",
    unhighlightColor: 0x222222,
    onselected: function(event) {
        console.log(event.selectedIndex);
    }
};
EWifi.Legend.BASE_CSS_NAME = "ewifi-legend";

EWifi.Legend.prototype.getBaseCssClass = function() {
    return EWifi.Legend.BASE_CSS_NAME;
};

EWifi.Legend.prototype.createDom = function() {
    EWifi.Legend._superClass.createDom.call(this);
    var ul = this._domElement;
    this._itemElements = [];
    ul.style.padding = "5px";
    ul.style.backgroundColor = this._backgroundColor;
    ul.style.borderColor = this._borderColor;
    ul.style.border = this._borderColor;
    for (var i = 0; i < this._labels.length; i++) {
        var li = document.createElement("div");
        var marker = document.createElement("div");
        var text = document.createElement("div");

        li.style.height = "20px";

        li.className = ESmile.getCssName(this.getBaseCssClass(), "item");
        marker.className = ESmile.getCssName(this.getBaseCssClass(), "item-marker");
        marker.style.backgroundColor = this._markerColors[i] || Math.random() * 0xffffff;
        text.className = ESmile.getCssName(this.getBaseCssClass(), "item-label");
        text.innerHTML = this._labels[i];
        if (this._labelColors)
            text.style.color = this._labelColors[i];
        else
            text.style.color = this._markerColors[i];
        li.appendChild(marker);
        li.appendChild(text);
        ul.appendChild(li);
        this._itemElements.push(li);
        var _this = this;
        li.onclick = function(e) {
            for (var i in _this._itemElements) {
                if (_this._itemElements[i] === this) {
                    _this._selectedState[i] = !_this._selectedState[i];
                    var event = {type: "selected"};
                    event.selectedIndex = i;
                    event.selectedLabel = _this._labels[i];
                    event.domElement = _this._itemElements[i];
                    event.selectedState = _this._selectedState;
                    _this.dispatchEvent(event);
                    this.style.backgroundColor = !_this._selectedState[i] ? "white" : null;
                }
            }
        };
        li.onmouseover = function(e) {
            console.log("#" + _this._highlightColor)
            this.style.backgroundColor = _this._highlightColor;
        };
        li.onmouseout = function(e) {
            this.style.backgroundColor = null;
        };
    }
};

EWifi.Legend.prototype._initEventHandling = function() {
//    this.addEventListener("selected", this.onclick);
//    this.addEventListener("mouseover", this.onmouseover);
//    this.addEventListener("mouseout", this.onmouseout);
};

EWifi.Legend.prototype.getSelectState = function() {
    return this._selectedState;
};

EWifi.Legend.prototype.clear = function() {
    EWifi.Legend._superClass.clear(this);
};

EWifi.Legend.prototype.dispose = function() {
    EWifi.Legend._superClass.dispose.call(this);
};

/* 
 * <class> EWifi.WifiChart 
 * <inherit> ESmile.Chart
 */
EWifi.WifiChart = function(domElement, options) {
    ESmile.Chart.call(this, domElement, options);
    this._camera = new THREE.PerspectiveCamera(30, this._width / this._height, 1, 100000);
    this._camera.position.z = Math.max(
            EWifi.WifiChart.AreaRange.max.x - EWifi.WifiChart.AreaRange.min.x,
            EWifi.WifiChart.AreaRange.max.y - EWifi.WifiChart.AreaRange.min.y);
    this._camera.position.y = -this._camera.position.z;
    // this._progress = new ESmile.Progress();
    // this._components.push(this._progress);
    this._orbitControls = new THREE.OrbitControls(this._camera, this._renderer.domElement);
    var raycaster = this._eventCenter.getRaycaster();
    raycaster.linePrecision = 10;
    raycaster.params.PointCloud.threshold = 20;
    this._markerManager = new EWifi.MarkerManager(options.markerManager);
    this._markerManager.setCamera(this._camera);
    this._markerManager.setViewport(this._width, this._height);
    this._components.push(this._markerManager);

    this.addEventListener("resize", this._onresize);

};
ESmile.inherits(EWifi.WifiChart, ESmile.Chart);

EWifi.WifiChart.AreaRange = {
    min: {x: -2000, y: -1500},
    max: {x: 2000, y: 1500}
};

EWifi.WifiChart.prototype.render = function() {
    this._components.forEach(
            function(comp) {
                comp.renderBefore(this._renderer.domElement);
            },
            this);

    this._stoped = false;
    this._makeScene();
    this._makeEffect();


    var scope = this;
    function render() {
        if (scope._disposed || scope._stoped) {
            return;
        }
        scope._renderer.render(scope._scene, scope._camera);
        requestAnimationFrame(render);
        if (scope._graphic)
            scope._graphic.update();

        scope._markerManager.update();
        ;
    }
    render();
};

EWifi.WifiChart.prototype._onresize = function(e) {
    var markerManager = e.target._markerManager;
    markerManager.setViewport(e.context.width, e.context.height);
    markerManager.update();
};

EWifi.WifiChart.prototype._makeScene = function() {
    if (!this._scene) {
        this._scene = new THREE.Scene();
    }
    if (!this._graphic)
        this._graphic = new ESmile.GraphicObject();

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, -1, 1).normalize();
    this._scene.add(light);
    this._scene.add(new THREE.AmbientLight(0xaaaaaa));


    var wifiAreas = [];
    var range = EWifi.WifiChart.AreaRange;
    for (var i = 0; i < 20; i++) {
        var wifiArea = new EWifi.WifiArea({
            name: EWifi.CIWifiData[i].name,
            position: new THREE.Vector3(
                    range.min.x + Math.random() * (range.max.x - range.min.x),
                    range.min.y + Math.random() * (range.max.y - range.min.y), 0)
        });

        // wifiArea.setPosition(new THREE.Vector3((Math.random() - 0.5)*4000, (Math.random() - 0.5)*4000, 0));
        this._graphic.addChild(wifiArea);
        wifiAreas.push(wifiArea);
        wifiArea._selected = true;
        wifiArea.onclick = function(event) {
            var target = event.target;
            target._selected = !target._selected;
            target.lines.forEach(function(line) {
                line.setVisible(target._selected);
            });
        };
    }
    wifiAreas.forEach(function(object) {
        object.attachMarker(this._markerManager);
    }, this);

    this._markerManager.setMarkersVisible(false, "user");
    var helper = new THREE.GridHelper(10000, 2000);
    helper.rotation.x = Math.PI / 2;
    this._scene.add(helper);

    var websites = [];
    var path = {x: 300, y: 300};

    for (var i = 0; i < 4; i++) {
        var website = new ESmile.PolygonColumn(
                {
                    color: new THREE.Color(0xffffff * Math.random()),
                    borderColor: new THREE.Color(0xffffff * Math.random()),
                    amount: 100 * Math.random(),
                    pathData: [[[-path.x / 2, -path.y / 2], [-path.x / 2, path.y / 2], [path.x / 2, path.y / 2], [path.x / 2, -path.y / 2]]]
                });
        websites.push(website);
        this._graphic.addChild(website);
        website._name = EWifi.WebsiteType[i];
    }

    websites[0].root.translateX(EWifi.WifiChart.AreaRange.max.x + 500);
    websites[0].root.translateY(EWifi.WifiChart.AreaRange.min.y + 500);
    websites[1].root.translateY(EWifi.WifiChart.AreaRange.max.y - 500);
    websites[1].root.translateX(EWifi.WifiChart.AreaRange.max.x + 500);

    websites[2].root.translateX(EWifi.WifiChart.AreaRange.min.x - 500);
    websites[2].root.translateY(EWifi.WifiChart.AreaRange.min.y + 500);

    websites[3].root.translateX(EWifi.WifiChart.AreaRange.min.x - 500);
    websites[3].root.translateY(EWifi.WifiChart.AreaRange.max.y - 500);
    //    websites[1].root.translateX( 500);
    //    websites[2].root.translateY(500);
    //    websites[3].root.translateY(500).translateX(500);
    //    websites[0].root.translateZ(1200);
    //    websites[1].root.translateZ(1200);
    //    websites[2].root.translateZ(1200);
    //    websites[3].root.translateZ(1200);

    websites.forEach(function(web) {
        this._markerManager.createMarker("website")
                .setPosition(web.root.position)
                .setModel({name: web._name});
    }, this);

    wifiAreas.forEach(function(area) {
        area.lines = [];
        var visible = Math.random() > 0.85 ? true : false;
        websites.forEach(function(website) {
            if (!website.uploadLines)
                website.uploadLines = [];
            if (!website.downloadLines)
                website.downloadLines = [];
            var randValue = Math.random();
            var line = new ESmile.GlowCurve({
                start: area.root.position,
                end: website.root.position.clone(),
                withGlowPoint: false,
                amount: Math.floor(Math.random() * 80),
                normalizerCount: randValue,
                visible: true,
                style: "floor",
                pointCloudSize: 40 * randValue * randValue,
                pointCloudColor: website._color,
                color: website._color});
            website.addChild(line);
            line.setVisible(visible);
            line.relationWifiArea = area;
            website.uploadLines.push(line);
            area.lines.push(line);
            randValue = Math.random();
            line = new ESmile.GlowCurve({
                start: website.root.position.clone(),
                end: area.root.position,
                withGlowPoint: false,
                amount: Math.floor(Math.random() * 80),
                normalizerCount: randValue,
                visible: true,
                style: "floor",
                pointCloudSize: 40 * randValue * randValue,
                pointCloudColor: new THREE.Color(1 - website._color.r, 1 - website._color.g, 1 - website._color.b),
                color: website._color,
                reverse: true
            });
            website.addChild(line);
            website.downloadLines.push(line);
            line.setVisible(visible);
            line.relationWifiArea = area;
            website.onclick = function() {

                if (this._magicNumber === undefined) {
                    this._magicNumber = -1;
                }
                if (this._magicNumber > 3) {
                    this._magicNumber = -1;
                }
                switch (this._magicNumber) {
                    case -1:
                        this.uploadLines.forEach(function(line) {
                            line.setVisible(false);
                        }, this);
                        this.downloadLines.forEach(function(line) {
                            line.setVisible(false);
                        }, this);
                        break;
                    case 0:
                        this.downloadLines.forEach(function(line) {
                            if (line.relationWifiArea._selected)
                                line.setVisible(true);
                        }, this);
                        break;
                    case 1:
                        this.uploadLines.forEach(function(line) {
                            if (line.relationWifiArea._selected)
                                line.setVisible(true);
                        }, this);
                        break;
                    case 2:
                        this.downloadLines.forEach(function(line) {
                            line.setVisible(false);
                        }, this);
                        break;
                    case 3:
                        this.uploadLines.forEach(function(line) {
                            line.setVisible(false);
                        }, this);

                        break;
                }
                this._magicNumber++;

            };
            area.lines.push(line);
        });

    });

    this._graphicToScene(this._scene, this._graphic);
    var websiteColor = [], websiteTitle = [];
    var i = 0;
    wifiAreas.forEach(function(area) {
        websiteColor.push("#" + area._userPaticleColor.getHexString());
        websiteTitle.push(EWifi.CIWifiData[i++].name);
    });

    var legend = new EWifi.Legend({
        labels: websiteTitle,
        markerColors: websiteColor
    });

    legend.addEventListener("selected", function(e) {
        wifiAreas[e.selectedIndex].lines.forEach(function(line) {
            line.setVisible(e.selectedState[e.selectedIndex]);
            line._selected = e.selectedState[e.selectedIndex];
        });

    });
    legend.renderBefore(this._renderer.domElement);

    var legend2 = new EWifi.Legend({
        labels: ["云亭标注", "用户标注", "网站标注"],
        markerColors: ["#ffff00", "#eeeeee", "#6666ee"]
    });
    var _this = this;
    legend2.addEventListener("selected", function(e) {
        var markerTypes = ["kiosk", "user", "website"];
        console.log(e);
        _this._markerManager.setMarkersVisible(e.selectedState[e.selectedIndex], markerTypes[e.selectedIndex]);
    });

    legend2.renderBefore(this._renderer.domElement);
    legend2._domElement.style.right = "30px";
    //  legend2._domElement.style.backgroundColor = "rgba(100,100,155,0.4)";
    legend2._domElement.style.border = "1px solid #999";


};



 