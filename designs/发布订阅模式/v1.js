
var pubsub={};

(function(q){
    var topics={},
        subUid=-1;

    //发布
    q.publish=function(topic,args){

        if(!topics[topic]) return false;

        setTimeout(function(){

            var subscribers=topics[topic],
                len=subscribers?subscribers.length:0;
            
            while(len--){
                subscribers[len].func(topic,args);
            }

        }, 0);

        return true;
    };

    //订阅
    q.subscribe=function(topic,func){
        if(!topics[topic]) topics[topic]=[];

        var token=(++subUid).toString();
        console.log(token);
        topics[topic].push({
            token:token,
            func:func
        });

        return token;
    };

    //退订
    q.unsubscribe=function(token){
        for(var key in topics){
            if(topics[key]){
                for(var i=0;i<topics[key].length;i++){
                    if(topics[key][i].token===token){
                        topics[key].splice(i,1);
                        return token;
                    }
                }
            }
        }
        return false;
    }

}(pubsub))

var res=pubsub.subscribe('lzx',function(topic,data){
    console.log(topic+':'+data);
});

pubsub.publish('lzx','hello world');
pubsub.publish('lzx','l like you');

setTimeout(function(){
    pubsub.unsubscribe(res);
}, 0);

pubsub.publish('lzx','interesting');