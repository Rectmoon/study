var form = document.getElementById('form'),
    warn = document.getElementById('warn');

Function.prototype.before=function(beforeFn){
    var _z=this;
    return function(){
        if( !beforeFn.apply(this,arguments) ) return;
        return _z.apply(this,arguments) 
    }
}

var strategies = {
    isNonEmpty:function(value,errMsg){
       return value == '' ? errMsg : void(0)
    },
    minLength:function(value,length,errMsg){
       return value.length<length ? errMsg : void(0)
    },
    isMobile:function(value,errMsg){
       return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ? errMsg : void(0)
    },
    isEmail:function(value,errMsg){
       return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ?  errMsg : void(0)
    }
}

function Validator(){
    this.rules=[];
}

Validator.prototype.add = function(dom,ruleArr){
    var _z = this;
    for(var i=0;i<ruleArr.length;i++){
        (function(rule){
            var strateArr = rule.strategy.split(':'),
                errMsg    = rule.errMsg;
            _z.rules.push(function(){
                var tempArr = strateArr.concat();
                var strategy = tempArr.shift();
                tempArr.unshift(dom.value);
                tempArr.push(errMsg);
                return strategies[strategy].apply(dom,tempArr); 
            })
        })(ruleArr[i])
    }
    return this;
}

Validator.prototype.start = function(){
    for(var i=0;i<this.rules.length;i++){
        var errMsg = this.rules[i]();
        if(errMsg){
            warn.textContent=errMsg;
            return false;
        }
    }
}

var vld = new Validator();
vld.add(form.username, [
  {
    strategy: 'isNonEmpty',
    errMsg: '账号不能为空'
  },
  {
    strategy: 'minLength:6', 
    errMsg: '账号不能小于6位'
  }
]).add(form.password, [
  {
    strategy: 'isNonEmpty',
    errMsg: '密码不能为空'
  }
]).add(form.phonenum, [
  {
    strategy: 'isNonEmpty',
    errMsg: '手机号不能为空'
  },
  {
    strategy: 'isMobile',
    errMsg: '手机号格式不正确'
  }
]).add(form.emailAddress,[
  {
    strategy: 'isNonEmpty',
    errMsg: '邮箱不能为空'
  },
  {
    strategy: 'isEmail',
    errMsg: '邮箱格式不正确'
  }
]);

var submitMsg = function(){
  var msg = {
    username: form.username.value,
    password: form.password.value,
    phonenum: form.phonenum.value,
    emailAddress:form.emailAddress.value
  }
  //ajax('...', msg);
  warn.textContent = '用户信息已成功提交至服务器';
}
submitMsg = submitMsg.before(vld.start.bind(vld));
form.addEventListener('submit',function(e){ 
   e.preventDefault();  
   submitMsg();
},false)