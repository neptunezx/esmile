/**
 * E-Smile Data.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author:  gujj
 * @Date: 2014/11/19
 * @Version: 0.1
 */

ESmile.Data = function ( data ) {
    this.raw_data = data;
    this.data = [];
    console.log("data-------------");
    console.log(this.raw_data);
}


ESmile.Data.prototype.load = function(){

}

ESmile.Data.prototype.getData = function(){
    var height=[],value=[];
    this.raw_data.data.sort(function(a,b){
        return b.value - a.value;
    });
    console.log("data-------------");
    console.log(this.raw_data);
    var max=this.raw_data.data[0].value,min=this.raw_data.data[this.raw_data.data.length-1].value;


    for(var i in this.raw_data.data){
        value[this.raw_data.data[i].name] =this.raw_data.data[i].value;
        height[this.raw_data.data[i].name] = (value[this.raw_data.data[i].name]-min)/(max-min);

    }

    this.data.push(value);
    this.data.push(height);

    return this.data;
}

ESmile.Data.prototype.getPropertiesData = function(){

}