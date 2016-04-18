(function(){
    'use strict';
    const validator = require('validator');
    class Data{
        constructor(){}
        get v(){return validator;}
        isString(value){ return "string" === typeof value; }
        isNumber(value){ return ("number" === typeof value && value !== Infinity && value !== NaN); }
        isBool(value){return (typeof value === "boolean"); }
        isArray(value){ return Array.isArray(value); }
        isObject(value){ return (typeof value === "object" && value !== null); }
        isData(value){ return this.isObject(value) && !this.isArray(value);  }
        isJson(value){ return (this.isString(value) ? validator.isJSON(value):false); }
        isFunc(value){ return 'function' === typeof value; }
        isEmitter(value){ return (this.isData(value) && this.isFunc(value.emit) ); }
        isEmpty(value){
            if( this.isArray(value) && value.length === 0 ) return true;
            if( this.isString(value) && value.trim().length === 0 ) return true;
            if( this.isData(value) && Object.keys(value).length === 0 ) return true;
            if( this.isFunc(value) ) return true;
            if( this.isNumber(value) ) return false;
            if( this.isBool(value) ) return false;
            if( typeof value === "undefined" || value === null ) return true;
            return false;
        }
        toData(value){
            if(this.isData(value)) return value;
            if(this.isString(value) && isJson(value)){ try{ return this.toData(JSON.parse(value)); }catch(e){}}
            else return {string:value};
            if(this.isArray(value)) return {array:value};
            return {error:{message:"not-data"},value:value};
        }
    }
    module.exports = new Data;
})();