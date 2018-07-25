/**
 * E-Smile FlowData.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  gujj
 * @Date: 2014/12/11
 * @Version: 0.1
 */

ESmile.FlowData = function(data){
    this._data = [];
    this._times = [];
    this._style = "";//multiple,single

    if(data.length==1){
        this._data = data[0].data;
        this._style = "single";
    }else{
        data.forEach(function(flowdata){

            this._times.push(flowdata.time);
            this._data[flowdata.time] = flowdata.data;
            this._style = "multiple";
        },this);
    }
}

ESmile.FlowData.prototype.getData = function(selection){
    var list = [];
    var time = selection.selectTime , district  = selection.selectDistrict /*, statue = selection.selectOptions!==undefined?selection.selectOptions:null*/;
    var iflowData = [],oflowData = [],data;
    if(this._style == "single") {
        data = this._data;
    }else {
        data = this._data[time];
    }

    for(var i in data){

        if(data[i].from==district){
           data[i].statue = "o";
           oflowData.push(data[i]);
        }
        if(data[i].to == district){
           data[i].statue = "i";
           iflowData.push(data[i]);
        }
    }
    list.push(iflowData);
    list.push(oflowData);


    return list;
}

ESmile.FlowData.prototype.getTimes = function(){
    return this._times;
}

ESmile.FlowData.prototype.getFirstTime = function(){
    if(this._style == "single"){
        return null;
    }else{
        return this._times[0];
    }
}

ESmile.FlowData.prototype.getFirstItem = function(){
    if(this._style == "single"){
        return this._data[0].from;
    }else{
        return this._data[this._times[0]][0].from;
    }

}
ESmile.FlowData.prototype.getStatistics = function(time){
    var statisticsResult = [],o = "", i = "";
    if(this._style == "single"){

    }else{
        this._data[time].forEach(function(item){
            if(statisticsResult[item.from]==undefined){
                statisticsResult[item.from]={o:0,i:0};
                statisticsResult[item.from].o = item.amount;

            }else{
                statisticsResult[item.from].o += item.amount;

            }
            if(statisticsResult[item.to]==undefined){
                statisticsResult[item.to]={o:0,i:0};
                statisticsResult[item.to].i = item.amount;
            }else{
                statisticsResult[item.to].i += item.amount;
            }
            //statisticsResult[item.from]={o:};
       });
    }
    return statisticsResult

}

