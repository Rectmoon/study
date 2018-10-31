class FlowHelper {
  constructor() {
    this.pid = 0
    this.steps = []
  }
  init() {
    this.pid = 0
    this.doStep()
  }
  next(data) {
    if (typeof this.steps[this.pid + 1] === 'function') {
      this.pid++
      this.doStep(data)
    }
  }
  doStep(data) {
    if (typeof this.steps[this.pid] === 'function') {
      this.steps[this.pid].call(this, data)
    }
  }
  register(...args) {
    args.forEach(arg => {
      if (typeof arg === 'function') {
        this.steps.push(arg)
      }
    })
  }
}

export default FlowHelper
