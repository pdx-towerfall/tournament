// Save items to local storage
// maybe should be its own little module (l-store, l-s)
import Emitter from 'tiny-emitter'

function get (KEY) {
  if (localStorage[KEY]) {
    return JSON.parse(localStorage[KEY])
  } else {
    return undefined
  }
}

function set (KEY, value) {
  localStorage[KEY] = JSON.stringify(value)
  return get(KEY)
}

function Store (ee, arg) {
  let KEY = this.KEY
  if (!arg) {
    return get(KEY)
  } else {
    if (typeof arg === 'function') {
      let newValue = arg(get(KEY))
      set(KEY, newValue)
    } else {
      set(KEY, arg)
    }
    ee.emit('changed', get(KEY))
    return get(KEY)
  }
}

function getStore (KEY, defaults) {
  let ee = new Emitter()
  let store = Store.bind({KEY}, ee)

  if (!get(KEY) && defaults) {
    set(KEY, defaults)
  }

  store.on = ee.on
  store.emit = ee.emit

  ee.on('changed', value => {
    store.emit('changed', value)
  })

  return store
}

export default getStore
