if(!Array.prototype.forEach){
    Array.prototype.forEach=function(fn,thisObj){
        var scope=thisObj||window||global;
        for(var i=0;i<this.length;i++){
            fn.call(scope,this[i],i,this);
        }
    }
}

if(!Array.prototype.filter){
    Array.prototype.filter=function(fn,thisObj){
        var scope=thisObj||window||global,
            result=[];
        for(var i=0;i<this.length;i++){
            if(!fn.call(scope,this[i],i,this)){
                continue;
            }
            result.push(this[i]);
        }
        return result;
    }
}

function Observer(){
    this.fns=[];
}

Observer.prototype={
    subscribe:function(fn){
        this.fns.push(fn);
    },
    unsubscribe:function(fn){
        this.fns=this.fns.filter(function(el){
            if(el !== fn){
                return el;
            }
        });
    },
    update:function(o,thisObj){
        var scope=thisObj||global;
        this.fns.forEach(function(el){
            el.call(scope,o);
        });
    }
};

var o=new Observer;

var f1=function(data){
    console.log('hey lzx'+data+'are you ok?')
};

var f2=function(data){
    console.log('fine thanks.')
};

o.subscribe(f1);
o.subscribe(f2);

o.update(' like lzx ');

o.unsubscribe(f1);

o.update(' fullstacker ');