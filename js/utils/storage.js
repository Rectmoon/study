import extend from './extend'

function deserialize(val) {
  if (typeof val !== 'string') return undefined
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}

const store = {
  storage: window.localStorage,
  session: {
    storage: window.sessionStorage
  }
}
const api = {
  set(k, v) {
    if (this.disabled) return
    if (v === undefined) return this.remove(k)
    this.storage.setItem(k, JSON.stringify(v))
  },
  get(k, def) {
    if (this.disabled) return def
    let v = deserialize(this.storage.getItem(k))
    return v === undefined ? def : v
  },
  has(k) {
    return this.get(k) !== undefined
  },
  remove(k) {
    if (this.disabled) return
    this.storage.removeItem(k)
  },
  clear() {
    if (this.disabled) return
    this.storage.clear()
  },
  forEach(cb) {
    if (this.disabled) return
    for (let i = 0; i < this.storage.length; i++) {
      let k = this.storage.key(i)
      cb(k, this.get(k))
    }
  },
  getAll() {
    if (this.disabled) return null
    let res = {}
    this.forEach((k, v) => {
      res[k] = v
    })
    return res
  }
}
extend(store, api)
extend(store.session, api)

export default store
