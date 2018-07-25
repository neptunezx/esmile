/**
 * E-Smile IdGenerator.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/12/11
 * @Version: 0.1
 */

ESmile.IdGenerator = {};

ESmile.IdGenerator._instance = null;

ESmile.IdGenerator.getInstance = function(){
    if (!ESmile.IdGenerator._instance) {
        ESmile.IdGenerator._instance = {
            _nextId: 0,
            getNextUniqueId: function(){
                return this._nextId++;
            }
        };
    }
    return ESmile.IdGenerator._instance;
};

