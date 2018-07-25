/**
 * E-Smile GeoJsonLoader.js
 * Copyright 2014 eHualu. All rights reserved.
 * @Author: ZhangXiang
 * @Date: 2014/12/2
 * @Version: 0.1
 */
 
 ESmile.GeoJsonLoader = function(){
     this._withCredentials = false;
     this._async = true;
 };

ESmile.GeoJsonLoader.prototype = {
    constructor: ESmile.GeoJsonLoader,

    load: function(GeoJsonID, callback, callbackProgress ){
        var url = "../source/resource/map/geojson/countries/" + GeoJsonID + ".geo.json";
        var xhr = new XMLHttpRequest();

        var length = 0;

        xhr.onreadystatechange = function () {
            if ( xhr.readyState === xhr.DONE ) {
                if ( xhr.status === 200 || xhr.status === 0 ) {
                    if ( xhr.responseText ) {
                        var geoJson = JSON.parse( xhr.responseText );
                        if ( geoJson !== undefined && geoJson.type !== 'FeatureCollection' ) {
                            console.error( 'ESmile.GeoJsonLoader: "' + url + '" format error.' );
                            return;
                        }
                        callback( geoJson );
                    } else {
                        console.error( 'ESmile.GeoJsonLoader: "' + url + '" seems to be unreachable or the file is empty.' );
                    }
                } else {
                    console.error( 'ESmile.GeoJsonLoader: Couldn\'t load "' + url + '" (' + xhr.status + ')' );
                }

            } else if ( xhr.readyState === xhr.LOADING ) {
                if ( callbackProgress ) {
                    if ( length === 0 ) {
                        length = xhr.getResponseHeader( 'Content-Length' );
                    }

                    callbackProgress( { total: length, loaded: xhr.responseText.length } );
                }

            } else if ( xhr.readyState === xhr.HEADERS_RECEIVED ) {
                if ( callbackProgress !== undefined ) {
                    length = xhr.getResponseHeader( 'Content-Length' );
                }
            }
        };

        xhr.open( 'GET', url, this._async );
        xhr.withCredentials = this._withCredentials;

        if ( this.crossOrigin !== undefined ) xhr.crossOrigin = this.crossOrigin;
        if ( this.responseType !== undefined ) xhr.responseType = this.responseType;
        xhr.addEventListener( 'error', this._onError, false );

        xhr.send( null );
    },

    setResponseType: function ( value ) {

        this.responseType = value;
        return this;

    },

    setCrossOrigin: function ( value ) {

        this.crossOrigin = value;
        return this;

    },

    _onError: function ( event ) {
        console.error(event);
    },

    setAsync: function ( async ) {
        if (async === true || async === 1 || async === '1')
            this._async = true;
        else
            this._async = false;
        return this;
    }

}
