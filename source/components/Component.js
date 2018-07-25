/**
 * E-Smile Component.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/11/13
 * @Version: 0.1
 */

ESmile.Component = function () {
    ESmile.EventDispatcher.call(this);
    this._inDocument = false;
    this._parentDomElement = null;
    this._domElement = null;
};
ESmile.inherits(ESmile.Component, ESmile.EventDispatcher);

ESmile.Component.BASE_CSS_NAME = ESmile.getCssName("esmile-component");

ESmile.Component.prototype._zIndex = 2;

/**
 * Gets the component's element.
 * @return {DomElement} The element for the component.
 */
ESmile.Component.prototype.getElement = function () {
    return this._domElement;
};

/**
 * Sets the component's root element to the given element.  Considered
 * protected and final.
 *
 * This should generally only be called during createDom. Setting the element
 * does not actually change which element is rendered, only the element that is
 * associated with this UI component.
 *
 * This should only be used by subclasses and its associated renderers.
 *
 * @param {DomElement} domElement Root element for the component.
 * @private
 */
ESmile.Component.prototype._setElementInternal = function (domElement) {
    this._domElement = domElement;
};

/**
 * Renders the component.  If a parent element is supplied, the component's
 * element will be appended to it.  If there is no optional parent element and
 * the element doesn't have a parentNode then it will be appended to the
 * document body.
 *
 * If this component has a parent component, and the parent component is
 * not in the document already, then this will not call {@code enterDocument}
 * on this component.
 *
 * Throws an Error if the component is already rendered.
 *
 * @param {DomElement=} opt_parentElement Optional parent element to render the
 *    component into.
 */
ESmile.Component.prototype.render = function (opt_parentElement) {
    this._render(opt_parentElement);
};


/**
 * Renders the component before another element. The other element should be in
 * the document already.
 *
 * Throws an Error if the component is already rendered.
 *
 * @param {DomElement} sibling Node to render the component before.
 */
ESmile.Component.prototype.renderBefore = function (sibling) {
    this._render(sibling.parentNode, sibling);
};

/**
 * Renders the component.  If a parent element is supplied, the component's
 * element will be appended to it.  If there is no optional parent element and
 * the element doesn't have a parentNode then it will be appended to the
 * document body.
 *
 * If this component has a parent component, and the parent component is
 * not in the document already, then this will not call {@code enterDocument}
 * on this component.
 *
 * Throws an Error if the component is already rendered.
 *
 * @param {Element=} opt_parentElement Optional parent element to render the
 *    component into.
 * @param {Node=} opt_beforeNode Node before which the component is to
 *    be rendered.  If left out the node is appended to the parent element.
 * @private
 */
ESmile.Component.prototype._render = function (opt_parentElement, opt_beforeNode) {
    if (this._inDocument) {
        throw Error("Component already rendered");
    }

    if (!this._domElement) {
        this.createDom();
    }

    if (opt_parentElement) {
        opt_parentElement.insertBefore(this._domElement, opt_beforeNode || null);
    } else {
        document.body.appendChild(this._domElement);
    }
    this._parentDomElement = this._domElement.parentNode;
    this.enterDocument();

};

/**
 * Called when the component's element is known to be in the document. Anything
 * using document.getElementById etc. should be done at this stage.
 * initilize work of event handling should also be done here. subclass 
 * maybe need private method like _initEventHandling();
 *
 * If the component contains child components, this call is propagated to its
 * children.
 * any subclass should invoke superclass enterDocument() like this:
 * ESmile.Component.superClass_.enterDocument.call(this);
 * 
 */
ESmile.Component.prototype.enterDocument = function () {
    this._inDocument = true;
    this._initEventHandling();
};

ESmile.Component.prototype._initEventHandling = function () {
};

/**
 * Called by dispose to clean up the elements and listeners created by a
 * component, or by a parent component/application who has removed the
 * component from the document but wants to reuse it later.
 *
 * If the component contains child components, this call is propagated to its
 * children.
 *
 * It should be possible for the component to be rendered again once this method
 * has been called.
 * any subclass should invoke superclass exitDocument() like this:
 * ESmile.Component.superClass_.exitDocument.call(this);
 */
ESmile.Component.prototype.exitDocument = function () {
    this.removeAllEventListener();
    this._inDocument = false;
};

/*
 * return the default z-index of the root element
 * @returns {Number}
 */
ESmile.Component.prototype.getZIndex = function () {
    return this._zIndex;
};

/*
 * return the 
 * default CSS class name
 * @returns {String}
 */
ESmile.Component.prototype.getBaseCss = function () {
    return ESmile.Component.BASE_CSS_NAME;
};

ESmile.Component.prototype.setCssClass = function () {

};

/*
 * set the component visibility attribute
 * @param {Boolean} visible 
 * @returns {undefined}
 */
ESmile.Component.prototype.setVisible = function (visible) {
    if (this._visible !== visible) {
        this._visible = visible;
        if (this._domElement)
            this._domElement.style.visibility = visible ? "visible" : "hidden";
    }
};

/*
 * @returns {Boolean} return whether the component is visible
 */
ESmile.Component.prototype.isVisible = function (visible) {
    return this._visible;
};

/*
 * @returns {Boolean} return whether the component is already be rendered in  
 * document.
 */
ESmile.Component.prototype.isInDocument = function (visible) {
    return this._inDocument;
};

/**
 * Disposes of the component.  Calls {@code exitDocument}, which is expected to
 * remove event handlers and clean up the component.  Propagates the call to
 * the component's children, if any. Removes the component's DOM from the
 * document.
 */
ESmile.Component.prototype.dispose = function () {
    if (this._inDocument) {
        this.exitDocument();
        this._parentDomElement.removeChild(this._domElement);
    }
    this._domElement = null;
    this._parentDomElement = null;
    //ESmile.Component._superClass.dispose.call(this);
};

/**
 * Creates the initial DOM representation for the component.  The default
 * implementation is to set this._domElement = div.
 * subclass should override this method to create it's own specified 
 * html content.
 */
ESmile.Component.prototype.createDom = function () {
    var div = document.createElement("div");
    div.className = this.getBaseCssClass();
    this._domElement = div;
    var cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    cssLink.href = ESmile.getCssFile(this.getBaseCssClass());
    document.head.appendChild(cssLink);
    this.setVisible(this._visible);
    this._domElement.style.zIndex = this.getZIndex();
};
 