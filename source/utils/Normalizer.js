/**
 * E-Smile Normalizer.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/12/4
 * @Version: 0.1
 */


ESmile.Normalizer = function(objectArray, attr, method, options){
    if (arguments.length < 3) {
        throw new SyntaxError("ESmile.Normalizer: normalize method is unspecified");
    }
    this._normalize = null;
    this._options = null;
    this._objectArray = objectArray;
    this._objectAttribute = attr;
    if (!this._objectAttribute ) {
        console.warn("ESmile.Normalizer: attr is undefined");
        this._normalize = null;
        return;
    }
    if (!this._objectArray || this._objectArray.length ===0){
        console.warn("ESmile.Normalizer: objectArray is undefined");
        this._normalize = null;
        return;
    }

    switch (method) {
        case "linear":
            this._linearOptionsParse(options);
            this._normalize = this._linearNormalize;
            break;

        case "logistic":
            this._logisticOptionsParse(options);
            this._normalize = this._logisticNormalize;
            break;

        case "user":
            this._options = options;
            if (options.normalize instanceof Function)
                this._normalize = options.normalize;
            else
                throw new TypeError("user defined normalize method should be specified as a Function");
            break;

    }
};

ESmile.Normalizer.prototype = {
    constructor: ESmile.Normalizer,
    normalize: function(value){
        if (this._normalize) {
            return this._normalize(value, this._options);
        }
        return value;
    },

    _linearNormalize: function(value, options){
        if (options.max === options.min) {
            if (options.max===0) {
                return 0;
            }
            return (options.newMax + options.newMin)/2;
        }

        return (value - options.min) / (options.max - options.min) * (options.newMax - options.newMin) + options.newMin;
    },

    _linearOptionsParse:  function(options){
  
        this._options =  { min:0, max:0, newMin:0, newMax:1 } ;
        if (options !== undefined 
            && options.min !== undefined 
            && options.max !== undefined) {
            this._options.newMin = options.min;
            this._options.newMax = options.max;
        }
        var objectArray = this._objectArray;
        var attr = this._objectAttribute;
        var min = objectArray[0][attr];
        var max = objectArray[0][attr];
        var stringConv = false;
        if (typeof(min)==="string"){
            min = parseFloat(min);
            max = parseFloat(min);
            stringConv = true;
        }
        if (min===undefined || max === undefined){
            throw new TypeError("objectArray item should have member:" + attr );
        }
        for (var i = 1, l = objectArray.length; i < l; i++){
            var value;
            if (!stringConv) {
                value = objectArray[i][attr];
            } else {
                value = parseFloat(objectArray[i][attr]);
            }
            if (min > value){
                min = value;
            }
            if (max < value){
                max = value;
            }
        }
        this._options.min = min;
        this._options.max = max;
       
    },

    _logisticNormalize: function(value, options){

        return (options.newMax - options.newMin) / (1 + Math.exp(-value)) + options.newMin;

    },

    _logisticOptionsParse: function(options){
        this._options = { min:0, max:1 };
        if (options) {
            if (options) {
                this._options.newMin =  options.min || this._options.newMin;
            } else {
                this._options.newMax =  options.max || this._options.newMax;
            }
        }
    }
}
