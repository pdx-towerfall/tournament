// Save items to local storage
// Surface add, remove, update, and delete
import muid from 'muid'
import events from 'events'
import extend from 'util-extend'
import gravatar from 'gravatar'
import Store from '../lib/store.js'
import toArray from '../lib/toArray.js'
import toObject from '../lib/toObject.js'

let store = Store('towerfall-test', {players: {}})

function add (player) {
  store(state => {
    let id = muid(12)
    let defaults = {
      id,
      skulls: 0,
      wins: 0,
      played: 0,
      gravatar: gravatar.url(player.email)
    }
    state.players[id] = extend(player, defaults)
    return state
  })
}

function remove (id) {
  store(state => {
    delete state.players[id]
    return state
  })
}

store.on('changed', state => {
  events.emit('render', state)
})

events.on('player:add', add)
events.on('player:remove', remove)
