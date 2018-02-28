const strategies={
    isNonEmpty(value,errMsg){
        return value == '' ? 
          errMsg : void 0
    },
    minLength(value,length,errMsg){
        return value.length<length ? 
          errMsg : void 0
    },
    isMobile(value,errMsg){
        return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ? 
          errMsg : void 0
    },
    isEmail(value,errMsg) {
        return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ?
          errMsg : void 0
    }
}

class Validator{
    constructor(){
        this.list=[]
    }

    add(dom,rules){
        for(let rule of rules){
            let strateArr =rule.strategy.split(':')
            let errMsg=rule.errMsg
            this.list.push(()=>{
                let strategy = strateArr.shift()
                strateArr.unshift(dom.value)
                strateArr.push(errMsg)
                return strategies[strategy].apply(dom,strateArr)
            })
        }
    }

    start(){
        for(let validatorFunc of this.list){
            let errMsg = validatorFunc()
            if(errMsg) return errMsg
        }
    }
}

