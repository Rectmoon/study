class State {
  constructor(color) {
    this.color = color
  }
  handle(context) {
    console.log(`trun to ${this.color}`)
    context.setState(this)
  }
}

class Context {
  constructor() {
    this.state = null
  }
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
  }
}

const ctx1 = new Context()

let green = new State('green')
let red = new State('red')
let orange = new State('orange')

green.handle(ctx1)
console.log(ctx1.getState())

orange.handle(ctx1)
console.log(ctx1.getState())

red.handle(ctx1)
console.log(ctx1.getState())
