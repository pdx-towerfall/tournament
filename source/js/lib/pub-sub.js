/**
* Create an events bus
*/
import Emitter from 'tiny-emitter'

let ee = new Emitter()

let emit = (events, debug) => {
  function check (event) {
    if (!events[event]) {
      console.error(`Event: "${event}" not found. Please check the events index.`)
      console.trace()
      return false
    }
    return true
  }

  function log (message, args) {
    if (debug) {
      console.log(message, args)
    }
  }

  let emitterProxy = {
    on () {
      let event = arguments[0]
      if (check(event)) {
        log(`Event: On "${event}" called.`, arguments)
        ee.on.apply(null, arguments)
      }
    },
    emit () {
      let event = arguments[0]
      if (check(event)) {
        log(`Event: Emit "${event}" called`, arguments)
        ee.emit.apply(null, arguments)
      }
    }
  }

  return emitterProxy
}

export default emit
