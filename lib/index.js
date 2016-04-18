(function(){
    'use strict';
    const D = require('./data.js');
    class Cloud{
        static get Request(){ return require('./request.js'); }
        static get Response(){ return require('./response.js'); }
        static get Valid(){ return D; }
        constructor(req,res){
            this.request = new Cloud.Request(req);
            this.response = new Cloud.Response(res);
        }
        get data(){
            if( D.isData(this.request.body) && !D.isEmpty(this.request.body) ){
                return this.request.body;
            }else if(D.isData(this._data)){return this._data;}
            else{ this._data = {}; }
            return this._data;
        }
        get(key){ return this.data[key]; }
        set(key,value){ this.data[key]=value; }
        both(key,func){
            this.req.on(key,func);
            this.res.on(key,func);
            return this;
        }
        once(key,func){
            this.req.once(key,func);
            return this;
        }
        on(key,func){
            this.res.on(key,func);
            return this;
        }
        get req(){
            return this.request;
        }
        get res(){
            return this.response;
        }

    }
    module.exports = Cloud;
})();