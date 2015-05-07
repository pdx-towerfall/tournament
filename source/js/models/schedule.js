// Save items to local storage
// Surface add, remove, update, and delete
import events from 'events'
import assign from 'object-assign'
import Store from '../lib/store.js'
import toArray from '../lib/toArray.js'
import toObject from '../lib/toObject.js'
import schedule from '../services/schedule.js'

let store = Store('towerfall-test')

function create () {
  store(state => {
    state.games = schedule(state.players)
    return state
  })
}

function update (game) {
  store(state => {
    assign(state.games[game.id], game)
    console.log(state.games[game.id])
    return state
  })
}

store.on('changed', state => {
  events.emit('render', state)
})

events.on('schedule:create', create)
events.on('schedule:update', update)
