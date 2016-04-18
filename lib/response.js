(function(){
    'use strict';
    const Request = require('./request.js');
    const EventEmitter = require('events');
    const D = require('./data.js')

    class Response extends EventEmitter{
        static valid(data){ return (data instanceof Response); }
        constructor(response){
            super()
            if(typeof response === "function"){
                this.type = "callback";
                this.on(send,response);
            }else if(typeof response.send === "function"){
                this.type = "response";
                this.once('send',(data)=>{ response.send(data); });
            }else if(D.isEmitter(response)){
                this.type = "emitter";
                this.on('send',(data)=>{
                    response.emit('send',data);
                });
            }
            if(!this.type){ this.type = typeof response; }
        }
        send(data){ return this.emit('send',data); }
    }
    module.exports = Response;
})();