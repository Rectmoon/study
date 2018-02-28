
var observer={
    subscribers:[],
    addSubscriber:function(callback){
        this.subscribers[this.subscribers.length]=callback;
    },
    removeSubscriber:function(callback){
        for(var i=0;i<this.subscribers.length;i++){
            if(this.subscribers[i]===callback){
                delete (this.subscribers[i]);
            }
        }
    },
    publish:function(what){
        for(var i=0;i<this.subscribers.length;i++){
           if(typeof this.subscribers[i]==='function'){
               this.subscribers[i](what);
           }
        }
    },
    make:function(o){
        for(var key in this){
            o[key]=this[key];
            o.subscribers=[];
        }
    }
};

var blogger={
    recommend:function(id){
        var msg='dudu推荐了的帖子:'+id;
        this.publish(msg);
    }
};
var user={
    vote:function(id){
        var msg='有人投票了!ID='+id;
        this.publish(msg);
    }
};

observer.make(blogger);
observer.make(user);

var lzx={
    read:function(what){
        console.log('zly看到了如下消息:'+what);
    }
};

var zly={
    show:function(what){
        console.log('lzx看到了如下消息:'+what);
    }
}

blogger.addSubscriber(lzx.read);
blogger.addSubscriber(zly.show);
blogger.recommend(123);
blogger.removeSubscriber(zly.show);
blogger.recommend(456);

user.addSubscriber(zly.show);
user.vote(789);