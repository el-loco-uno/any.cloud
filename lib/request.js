(function(){
    'use strict';
    const EventEmitter = require('events');
    const As = require('./data.js');

    class Request extends EventEmitter{
        static valid(data){ return (data instanceof Request); }
        constructor(data){
            super()
            let input = (As.isData(data)) ? data:As.toData(data);
            this.getBody = function(){
                try {
                    if (As.isData(input.search) && !As.isEmpty(input.search)) return input.search;
                    if (As.isData(input.query) && !As.isEmpty(input.query)) return input.query;
                    if (As.isData(input.body) && !As.isEmpty(input.body)) return input.body;
                    if (As.isData(input.data) && !As.isEmpty(input.data)) return input.data;
                    if (As.isData(input.fields) && !As.isEmpty(input.fields)) return input.fields;
                    if (As.isData(input.params) && !As.isEmpty(input.params)) return input.params;
                }catch(e){
                    console.error(e);
                }
                return input;
            }
            this.input = function(){ return input; };
            this.socket = function(){
                if(As.isData(input.socket)) return input.socket;
                else if(As.isEmitter(input) && input.id) return input;
                return {id:'no-socket'};
            };
        }
        get(key){ return this.input()[key] || false; }
        socket(){ return {id:Date.now()}; }
        get socketId(){ return this.socket().id; }
        getBody(){return {};}
        get body(){ return this.getBody(); }
        get headers(){ return  this.get('headers'); }
        get url(){ return this.get('url'); }
    }

    module.exports = Request;
})();