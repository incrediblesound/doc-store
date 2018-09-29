const fs = require('fs');

const initialStore = '{}'

class Store {
  constructor(path, key) {
    this.path = path;
    this.key = key;
    this.store = null;
  }
  get(keyArg) {
    let key = keyArg
    if (!key && !!this.key) {
      key = this.key
    }

    if (this.store[key] !== undefined) {
      return this.store[key]
    } else {
      throw new Error('no value at key '+ key)
    }
  }
  set(keyArg, valueArg, options={}) {
    let key = keyArg
    let value = valueArg
    if (arguments.length === 1 && !!this.key) {
      key = this.key
      value = keyArg
    }

    if (options.overwrite !== false) {
      this.store[key] = value
    } else if (this.store[key] === null || this.store.key === undefined) {
      this.store[key] = value
    }

    if (options.flush !== false) {
      this.flushToDisk()
    }
  }
  flushToDisk() {
    const storeString = JSON.stringify(this.store)
    fs.writeFileSync(this.path, storeString)
  }
  initDB(){
    try {
      const rawStore = fs.readFileSync(this.path)
      const store = JSON.parse(rawStore)
      this.store = store;
    } catch (e) {
      fs.writeFileSync(this.path, initialStore)
      if (this.key) {
        this.store = { [this.key]: null }
      } else {
        this.store = {}
      }
    }
  }
}


module.exports = Store