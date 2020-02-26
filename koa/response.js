module.exports = {
  set body(data) {
    this._body = data
  },

  get body() {
    return this._body
  },

  set status(statusCode) {
    if (typeof statusCode !== 'number') throw new Error('statusCode 必须是一个数字')
    this.res.statusCode = code
  }
}
